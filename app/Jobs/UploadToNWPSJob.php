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
        // Temporarily disable logging to avoid permission issues
        // \Illuminate\Support\Facades\Log::info('NWPS Job started', [
        //     'purchase_id' => $this->purchaseId,
        //     'job_id' => $this->job->getJobId(),
        //     'queue' => $this->queue,
        //     'attempt' => $this->attempts()
        // ]);
        
        $purchase = UserPurchasedProduct::find($this->purchaseId);
        if (!$purchase) {
            // \Illuminate\Support\Facades\Log::error('Purchase not found', ['purchase_id' => $this->purchaseId]);
            return;
        }

        $product = ProductBatch::with('files')->find($purchase->batch_id);
        if (!$product) {
            // \Illuminate\Support\Facades\Log::error('Product not found', ['batch_id' => $purchase->batch_id]);
            return;
        }
        
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
                // \Illuminate\Support\Facades\Log::error('No token received from NWPS login');
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }
            
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
                // \Illuminate\Support\Facades\Log::error('No file ID received from NWPS registration');
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }

            $purchase->update([
                'nwps_file_id' => $fileId,
                'nwps_upload_status' => 'uploaded',
            ]);

            // 3) Poll file info until printable and reservation number is available
            $reservationNo = null;
            $maxAttempts = 24; // ~2 minutes at 5s interval
            for ($i = 0; $i < $maxAttempts; $i++) {
                $info = $nwps->getFileInfo($token, $fileId);
                // Spec mentions create_status becomes PRINTABLE when ready
                $createStatus = $info['create_status'] ?? null;
                $reservationNo = $info['user_number'] ?? null; // user_number is the print number

                if ($createStatus === 'PRINTABLE' && $reservationNo) {
                    break;
                }

                if ($createStatus === 'FAILED') {
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
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Failed to get QR code: ' . $e->getMessage());
                    // Still update with reservation number even if QR code fails
                    $purchase->update([
                        'nwps_reservation_no' => $reservationNo,
                        'nwps_upload_status' => 'ready',
                    ]);
                }
            } else {
                // Timed out waiting for ready
                $purchase->update(['nwps_upload_status' => 'processing']);
            }
        } catch (\Throwable $e) {
            // \Illuminate\Support\Facades\Log::error('NWPS upload failed: ' . $e->getMessage());
            $purchase->update(['nwps_upload_status' => 'failed']);
        }
    }
}


