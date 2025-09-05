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
    public int $tries = 3; // Maximum number of attempts
    public int $backoff = 30; // Seconds to wait between retries
    public int $timeout = 300; // 5 minutes timeout for NWPS operations

    public function __construct(int $purchaseId)
    {
        $this->purchaseId = $purchaseId;
    }

    public function handle(NWPSService $nwps): void
    {
        $purchase = UserPurchasedProduct::find($this->purchaseId);
        Log::info('start upload');
        if (!$purchase) {
            return;
        }

        $product = $purchase->productBatch;
        if (!$product) {
            return;
        }

        try {
            // 1) Guest login
            $days = (int) config('nwps.guest_token_days', 30);
            
            $login = $nwps->guestLogin('web', [
                'model' => php_uname('n') ?: 'Server',
            ], $days);

            Log::info('Purchase NWPS login response: ' . json_encode($login));
          
            // Check for NWPS maintenance mode or other errors
            if (isset($login['_http_status']) && $login['_http_status'] === 503) {
                Log::info('NWPS service is in maintenance mode (503)');
                // Mark purchase as maintenance mode - don't schedule retry
                $purchase->update(['nwps_upload_status' => 'maintenance']);
                Log::info('Purchase status updated to maintenance', [
                    'purchase_id' => $purchase->id,
                    'nwps_upload_status' => $purchase->nwps_upload_status
                ]);
                return;
            }
            
            
            $token = $login['token'] ?? null;
            $userCode = $login['user_code'] ?? null;
            if (!$token) {
                return;
            }

            // 2) Register image(s) by URL (filesfromurl/image)
            $fileId = null;
            foreach ($product->files as $index => $file) {
                
                $fileUrl = $file->url;
                $fileName = $file->original_name ?? basename($file->file_path);

                
                // TEMPORARY: For testing, use a public image URL to verify NWPS API works
                // Remove this in production
                if (str_contains($fileUrl, '172.16.5.41') || str_contains($fileUrl, 'localhost')) {
                    Log::warning('Using local URL that may not be accessible to NWPS, using test image instead');
                    $fileUrl = 'https://mechapri.com/storage/nwps/qrcodes/nwps_qr_68ba5da223d5f.jpg'; // Public test image
                    $fileName = 'nwps_qr_68ba5da223d5f.jpg';
                }

                // Log::info('File URL being sent to NWPS', [
                //     'product_id' => $product->id,
                //     'file_id' => $file->id,
                //     'file_url' => $fileUrl,
                //     'file_name' => $fileName,
                //     'printing_limit' => $purchase->cnt,
                // ]);
                
                $data = [
                    'file_url' => $fileUrl,
                    'file_name' => $fileName,    
                    'expire' => $days,            
                    ...($product->price > 0 ? ['printing_limit' => $purchase->cnt * 3] : []),     
                    // 'printing_limit' => $purchase->quantity * 3, // Use purchase quantity as printing limit
                ];
                
                try {
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    $fileId = $registered['file_id'] ?? $fileId;
                    Log::info('File registration response: ' . json_encode($registered));
                } catch (\Exception $e) {
                    throw $e;
                }
            }

            if (!$fileId) {
                return;
            }

            // 3) Get QR code for convenience store login
            try {
                $qrCodeData = $nwps->getLoginQrCode($token);
                if ($qrCodeData['success'] ?? false) {
                    $qrCodeUrl = $qrCodeData['qr_code_url'] ?? null;
                    $userCode = $qrCodeData['user_code'] ?? $userCode;
                    
                    // Update purchase with NWPS data
                    $purchase->update([
                        'nwps_user_code' => $userCode,
                        'nwps_file_id' => $fileId,
                        'nwps_qr_code_url' => $qrCodeUrl,
                        'nwps_upload_status' => 'ready',
                    ]);
                    
                    Log::info('UploadToNWPSJob completed successfully', [
                        'purchase_id' => $this->purchaseId,
                        'product_id' => $product->id,
                        'file_id' => $fileId,
                        'qr_code_url' => $qrCodeUrl
                    ]);
                }
                            } catch (\Exception $e) {
                    Log::error('QR code generation failed: ' . $e->getMessage());
                    throw $e;
                }
        } catch (\Throwable $e) {
            Log::error('UploadToNWPSJob failed: ' . $e->getMessage(), [
                'purchase_id' => $this->purchaseId,
                'product_id' => $product->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Mark purchase as failed and schedule retry
            $purchase->update(['nwps_upload_status' => 'failed']);
            $this->scheduleRetry();
        }
    }

    /**
     * Schedule a retry if we haven't exceeded max attempts
     */
    private function scheduleRetry(): void
    {
        if ($this->attempts() < $this->tries) {
            // Schedule retry with delay
            $this->release($this->backoff);
        }
    }
}