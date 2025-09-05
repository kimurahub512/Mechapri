<?php

namespace App\Jobs;

use App\Models\ProductBatch;
use App\Services\NWPSService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessFreeProductNWPSJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $productId;
    public int $tries = 3; // Maximum number of attempts
    public int $backoff = 30; // Seconds to wait between retries
    public int $timeout = 300; // 5 minutes timeout for NWPS operations

    public function __construct(int $productId)
    {
        $this->productId = $productId;
    }

    public function handle(NWPSService $nwps): void
    {
        $product = ProductBatch::with('files')->find($this->productId);
        if (!$product) {
            return;
        }

        // Check if product is free
        if ($product->price > 0) {
            return;
        }

        try {
            // 1) Guest login
            // Expire should match sales_deadline for free products
            $days = (int) config('nwps.guest_token_days', 30);
            Log::info('Starting free product NWPS login');
            $login = $nwps->guestLogin([
                'expire' => $days,
                'model' => php_uname('n') ?: 'Server',
            ], $days);
            Log::info('Free product NWPS login response: ' . json_encode($login));
            
            // Check for NWPS maintenance mode or other errors
            if (isset($login['_http_status']) && $login['_http_status'] === 503) {
                Log::info('NWPS service is in maintenance mode (503)');
                // Mark product as maintenance mode - don't schedule retry
                $product->update(['nwps_upload_status' => 'maintenance']);
                return;
            }
            
            $token = $login['token'] ?? null;
            $userCode = $login['user_code'] ?? null;
            if (!$token) {
                return;
            }

            // 2) Register image(s) by URL (filesfromurl/image) - NO printing_limit for free products
            $fileId = null;
            foreach ($product->files as $index => $file) {
                Log::info('Starting free product NWPS file registration');
                $fileUrl = $file->url;
                $fileName = $file->original_name ?? basename($file->file_path);
                
                // TEMPORARY: For testing, use a public image URL to verify NWPS API works
                // Remove this in production
                if (str_contains($fileUrl, '172.16.5.41') || str_contains($fileUrl, 'localhost')) {
                    Log::warning('Using local URL that may not be accessible to NWPS, using test image instead');
                    $fileUrl = 'https://mechapri.com/storage/nwps/qrcodes/nwps_qr_68ba5da223d5f.jpg'; // Public test image
                    $fileName = 'nwps_qr_68ba5da223d5f.jpg';
                }
                $data = [
                    'file_url' => $fileUrl,
                    'file_name' => $fileName,
                ];
                Log::info('Free product NWPS file registration data: ' . json_encode($data));
                try {
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    Log::info('Free product NWPS file registration response: ' . json_encode($registered));
                    $fileId = $registered['file_id'] ?? $fileId;
                } catch (\Exception $e) {
                    throw $e;
                }
            }

            if (!$fileId) {
                Log::info('No file ID received from NWPS registration for free product');
                return;
            }

            // 3) Get QR code for convenience store login
            try {
                $qrCodeData = $nwps->getLoginQrCode($token);
                if ($qrCodeData['success'] ?? false) {
                    $qrCodeUrl = $qrCodeData['qr_code_url'] ?? null;
                    $userCode = $qrCodeData['user_code'] ?? $userCode;
                    
                    // Update product with NWPS data
                    $product->update([
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
            // Mark product as failed and schedule retry
            $product->update(['nwps_upload_status' => 'failed']);
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