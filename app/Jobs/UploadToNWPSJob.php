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
            $userCode = $login['user_code'] ?? null;
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
                'nwps_user_code' => $userCode,
                'nwps_token_expires_at' => now()->addDays($days),
            ]);

            // 2) Register image(s) by URL (filesfromurl/image)
            // \Illuminate\Support\Facades\Log::info('Starting file registration', ['files_count' => $product->files->count()]);
            $fileId = null;
            
            // Handle gacha products - randomly select one image
            if ($product->display_mode === 'gacha') {
                $files = $product->files->shuffle();
                $selectedFile = $files->first();
                
                if ($selectedFile) {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Gacha product: randomly selected file {$selectedFile->id}\n", 
                        FILE_APPEND
                    );
                    
                    $data = [
                        'file_url' => $selectedFile->url,
                        'file_name' => $selectedFile->original_name ?? basename($selectedFile->file_path),
                        'expire' => (int) config('nwps.guest_token_days', 30), // days
                    ];
                    
                    // Only add printing_limit for paid products (free products don't have this limit)
                    if ($product->price > 0) {
                        $data['printing_limit'] = 3;
                    }
                    
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    $fileId = $registered['file_id'] ?? null;
                    
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Gacha file registration response: " . json_encode($registered) . "\n", 
                        FILE_APPEND
                    );
                }
            } else {
                // Regular products - upload all images
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
                    ];
                    
                    // Only add printing_limit for paid products (free products don't have this limit)
                    if ($product->price > 0) {
                        $data['printing_limit'] = 3;
                    }
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    // \Illuminate\Support\Facades\Log::info('File registration response', ['registered' => $registered]);
                    $fileId = $registered['file_id'] ?? $fileId;
                }
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

            // 3) Get QR code for convenience store login
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Getting QR code for login\n", 
                FILE_APPEND
            );
            
            try {
                $qrCodeData = $nwps->getLoginQrCode($token);
                
                if ($qrCodeData['success'] ?? false) {
                    $qrCodeUrl = $qrCodeData['qr_code_url'];
                    
                    $purchase->update([
                        'nwps_upload_status' => 'ready',
                        'nwps_qr_code_url' => $qrCodeUrl,
                    ]);
                    
                    // Temporary debug logging
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Purchase {$purchase->id} updated with QR code\n", 
                        FILE_APPEND
                    );
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - QR Code URL: " . ($qrCodeUrl ?? 'NULL') . "\n", 
                        FILE_APPEND
                    );
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Full QR Code Data: " . json_encode($qrCodeData) . "\n", 
                        FILE_APPEND
                    );
                } else {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Failed to get QR code: " . json_encode($qrCodeData) . "\n", 
                        FILE_APPEND
                    );
                    $purchase->update(['nwps_upload_status' => 'failed']);
                }
            } catch (\Exception $e) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Failed to get QR code: " . $e->getMessage() . "\n", 
                    FILE_APPEND
                );
                $purchase->update(['nwps_upload_status' => 'failed']);
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


