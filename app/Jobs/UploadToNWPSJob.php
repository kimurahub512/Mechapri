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
            
            $login = $nwps->guestLogin([
                'expire' => $days,
                'model' => php_uname('n') ?: 'Server',
            ], $days);
          
            // Check for NWPS maintenance mode or other errors
            if (isset($login['result_code']) && $login['result_code'] === 'M001') {
                // Mark purchase as failed and schedule retry
                $purchase->update(['nwps_upload_status' => 'failed']);
                $this->scheduleRetry();
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
                $data = [
                    'url' => $file->url,
                    'filename' => $file->original_name,
                    'printing_limit' => $purchase->quantity, // Use purchase quantity as printing limit
                ];
                
                try {
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    $fileId = $registered['file_id'] ?? $fileId;
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
                }
            } catch (\Exception $e) {
                // Handle QR code failure
            }
        } catch (\Throwable $e) {
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