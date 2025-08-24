<?php

namespace App\Jobs;

use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;
use App\Services\NWPSService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UploadToNWPSJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $purchaseId;

    public function __construct(int $purchaseId)
    {
        $this->purchaseId = $purchaseId;
    }

    public function handle(NWPSService $nwps): void
    {
        // Very early debug logging to see if job starts
        try {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - NWPS Job started for purchase_id: {$this->purchaseId}\n", 
                FILE_APPEND
            );
        } catch (\Exception $e) {
            // If we can't write to the log, at least try to write to a different location
            file_put_contents('/tmp/nwps_debug.log', 
                date('Y-m-d H:i:s') . " - NWPS Job started for purchase_id: {$this->purchaseId} (storage write failed)\n", 
                FILE_APPEND
            );
        }
        
        $purchase = UserPurchasedProduct::find($this->purchaseId);
        if (!$purchase) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Purchase not found: {$this->purchaseId}\n", 
                FILE_APPEND
            );
            return;
        }

        $product = ProductBatch::with('files')->find($purchase->batch_id);
        if (!$product) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product not found: {$purchase->batch_id}\n", 
                FILE_APPEND
            );
            return;
        }
        
        file_put_contents(storage_path('nwps_debug.log'), 
            date('Y-m-d H:i:s') . " - Found purchase {$purchase->id} and product {$product->id} with {$product->files->count()} files\n", 
            FILE_APPEND
        );
        
        // \Illuminate\Support\Facades\Log::info('Found product and purchase', [
        //     'product_id' => $product->id,
        //     'files_count' => $product->files->count()
        // ]);

        try {
            // 1) Guest login
            // \Illuminate\Support\Facades\Log::info('Starting NWPS guest login');
            $days = (int) config('nwps.guest_token_days', 30);
            $login = $nwps->guestLogin('Web', [
                'os' => php_uname('s') ?: 'PHP',
                'brand' => 'Mechapuri',
                'model' => php_uname('n') ?: 'Server',
            ], $days);
            
            // \Illuminate\Support\Facades\Log::info('NWPS guest login response', ['login' => $login]);

            $token = $login['token'] ?? ($login['access_token'] ?? null);
            if (!$token) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - No token received from NWPS login. Response: " . json_encode($login) . "\n", 
                    FILE_APPEND
                );
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }
            
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - NWPS login successful, token received\n", 
                FILE_APPEND
            );
            
            // \Illuminate\Support\Facades\Log::info('Token received, updating purchase', ['token' => $token]);
            $purchase->update([
                'nwps_token' => $token,
                'nwps_token_expires_at' => now()->addDays($days),
            ]);

            // 2) Register image(s) by URL (filesfromurl/image)
            // \Illuminate\Support\Facades\Log::info('Starting file registration', ['files_count' => $product->files->count()]);
            $fileId = null;
            foreach ($product->files as $index => $file) {
                // \Illuminate\Support\Facades\Log::info('Registering file', [
                //     'file_index' => $index,
                //     'file_url' => $file->url,
                //     'file_name' => $file->original_name ?? basename($file->file_path)
                // ]);
                
                $data = [
                    'file_url' => $file->url,
                    'file_name' => $file->original_name ?? basename($file->file_path),
                    'expire' => (int) config('nwps.guest_token_days', 30), // days
                    'printing_limit' => 3,
                ];
                $registered = $nwps->registerFileFromUrl($token, $data);
                // \Illuminate\Support\Facades\Log::info('File registration response', ['registered' => $registered]);
                $fileId = $registered['file_id'] ?? $fileId;
            }

            if (!$fileId) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - No file ID received from NWPS registration\n", 
                    FILE_APPEND
                );
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }
            
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - File registration successful, file_id: {$fileId}\n", 
                FILE_APPEND
            );

            $purchase->update([
                'nwps_file_id' => $fileId,
                'nwps_upload_status' => 'uploaded',
            ]);

            // 3) Poll file info until printable and reservation number is available
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Starting polling loop for file_id: {$fileId}\n", 
                FILE_APPEND
            );
            
            $reservationNo = null;
            $maxAttempts = 24; // ~2 minutes at 5s interval
            for ($i = 0; $i < $maxAttempts; $i++) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Polling attempt " . ($i + 1) . "/{$maxAttempts}\n", 
                    FILE_APPEND
                );
                
                $info = $nwps->getFileInfo($token, $fileId);
                // Spec mentions create_status becomes PRINTABLE when ready
                $createStatus = $info['create_status'] ?? $info['status'] ?? null;
                $reservationNo = $info['user_number'] ?? $info['reservation_number'] ?? $info['print_code'] ?? null; // user_number is the print number

                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Poll result: create_status={$createStatus}, user_number={$reservationNo}\n", 
                    FILE_APPEND
                );
                
                // Log the full response for debugging
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Full API response: " . json_encode($info) . "\n", 
                    FILE_APPEND
                );

                if ($createStatus === 'PRINTABLE' && $reservationNo) {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - File is ready! Breaking polling loop\n", 
                        FILE_APPEND
                    );
                    break;
                }

                if ($createStatus === 'FAILED') {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - File creation failed, stopping\n", 
                        FILE_APPEND
                    );
                    $purchase->update(['nwps_upload_status' => 'failed']);
                    return;
                }

                sleep(5);
            }

            if ($reservationNo) {
                // 4) Get QR code for convenience store login
                try {
                    $qrCodeData = $nwps->getLoginQrCode($token);
                    $qrCodeUrl = $qrCodeData['qr_code_url'] ?? null;
                    
                    $purchase->update([
                        'nwps_reservation_no' => $reservationNo,
                        'nwps_upload_status' => 'ready',
                        'nwps_qr_code_url' => $qrCodeUrl,
                    ]);
                    
                    // Temporary debug logging
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Purchase {$purchase->id} updated with reservation_no: {$reservationNo} and QR code\n", 
                        FILE_APPEND
                    );
                } catch (\Exception $e) {
                    // \Illuminate\Support\Facades\Log::error('Failed to get QR code: ' . $e->getMessage());
                    // Still update with reservation number even if QR code fails
                    $purchase->update([
                        'nwps_reservation_no' => $reservationNo,
                        'nwps_upload_status' => 'ready',
                    ]);
                    
                    // Temporary debug logging
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Purchase {$purchase->id} updated with reservation_no: {$reservationNo} (QR code failed)\n", 
                        FILE_APPEND
                    );
                }
            } else {
                // Timed out waiting for ready
                $purchase->update(['nwps_upload_status' => 'processing']);
                
                // Temporary debug logging
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Purchase {$purchase->id} timed out, status set to processing\n", 
                    FILE_APPEND
                );
            }
        } catch (\Throwable $e) {
            // \Illuminate\Support\Facades\Log::error('NWPS upload failed: ' . $e->getMessage());
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - NWPS upload failed for purchase {$purchase->id}: " . $e->getMessage() . "\n", 
                FILE_APPEND
            );
            $purchase->update(['nwps_upload_status' => 'failed']);
        }
    }
}


