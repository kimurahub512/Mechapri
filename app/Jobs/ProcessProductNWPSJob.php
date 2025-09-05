<?php

namespace App\Jobs;

use App\Models\ProductBatch;
use App\Services\NWPSService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessProductNWPSJob implements ShouldQueue
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
        // Debug logging disabled for production
       
        Log::info('Product NWPS Job started for product_id: ' . $this->productId);
        $product = ProductBatch::with('files')->find($this->productId);
        if (!$product) {
            Log::info('Product not found: ' . $this->productId);
            return;
        }

        try {
            // 1) Guest login
            // Expire should match sales_deadline for products
            $days = (int) config('nwps.guest_token_days', 30);

            $login = $nwps->guestLogin('Web', [
                'os' => php_uname('s') ?: 'PHP',
                'brand' => 'Mechapuri',
                'model' => php_uname('n') ?: 'Server',
            ], $days);
          
            Log::info('Product NWPS login response: ' . json_encode($login));
            
            // Check for NWPS maintenance mode or other errors
            if (isset($login['_http_status']) && $login['_http_status'] === 503) {
                Log::info('NWPS service is in maintenance mode (503)');
                // Mark product as maintenance mode - don't schedule retry
                $product->update(['nwps_upload_status' => 'maintenance']);
                return;
            }
            
            
            $token = $login['token'] ?? ($login['access_token'] ?? null);
            $userCode = $login['user_code'] ?? null;
            if (!$token) {
                Log::info('Product NWPS login failed: ' . json_encode($login));
                
                // Mark product as failed and schedule retry
                $product->update(['nwps_upload_status' => 'failed']);
                $this->scheduleRetry();
                return;
            }

            // 2) Register image(s) by URL (filesfromurl/image)
            Log::info('Starting file registration for product ' . $product->id);
            $fileId = null;
            foreach ($product->files as $index => $file) {
                // For development/testing, use a public test image URL
                // In production, this should be a publicly accessible URL (S3, CDN, etc.)
                $fileUrl = $file->url;
                $fileName = $file->original_name ?? basename($file->file_path);
                
                // TEMPORARY: For testing, use a public image URL to verify NWPS API works
                // Remove this in production
                if (str_contains($fileUrl, '172.16.5.41') || str_contains($fileUrl, 'localhost')) {
                    Log::warning('Using local URL that may not be accessible to NWPS, using test image instead');
                    $fileUrl = 'https://mechapri.com/storage/nwps/qrcodes/nwps_qr_68ba5da223d5f.jpg'; // Public test image
                    $fileName = 'nwps_qr_68ba5da223d5f.jpg';
                }
                
                // Log the file URL being sent to NWPS
                Log::info('File URL being sent to NWPS', [
                    'product_id' => $product->id,
                    'file_id' => $file->id,
                    'file_url' => $fileUrl,
                    'file_name' => $fileName,
                ]);
                
                $data = [
                    'file_url' => $fileUrl,
                    'file_name' => $fileName,
                    // expire should be same as sales_deadline (in days)
                    'expire' => $days, // days
                    // For paid products, add printing_limit (3 prints)
                    // For free products, omit printing_limit (unlimited)
                ];
                
                try {
                    Log::info('startingh');
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    Log::info('File registration response: ' . json_encode($registered));
                    $fileId = $registered['file_id'] ?? $fileId;
                } catch (\Exception $e) {      
                    Log::info('File registration failed: ' . $e->getMessage());
                    throw $e;
                }
            }

            if (!$fileId) {
  
                Log::info('No file ID received from NWPS registration for product');
                return;
            }
            
            Log::info('Product file registration successful, file_id: ' . $fileId);

            
            try {
                $qrCodeData = $nwps->getLoginQrCode($token);
                Log::info('QR code data: ' . json_encode($qrCodeData));
                if ($qrCodeData['success'] ?? false) {
                    $qrCodeUrl = $qrCodeData['qr_code_url'];
                    
                    // Update the product with NWPS data
                    $product->update([
                        'nwps_token' => $token,
                        'nwps_user_code' => $userCode,
                        'nwps_token_expires_at' => now()->addDays($days),
                        'nwps_file_id' => $fileId,
                        'nwps_qr_code_url' => $qrCodeUrl,
                        'nwps_upload_status' => 'ready',
                    ]);
 
                } else {

                }
            } catch (\Exception $e) {

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
            // file_put_contents(storage_path('nwps_debug.log'), 
            //     date('Y-m-d H:i:s') . " - Scheduling retry for product {$this->productId} (attempt {$this->attempts()}/{$this->tries})\n", 
            //     FILE_APPEND
            // );
            
            // Schedule retry with delay
            $this->release($this->backoff);
        } else {
            // file_put_contents(storage_path('nwps_debug.log'), 
            //     date('Y-m-d H:i:s') . " - Max retry attempts reached for product {$this->productId}\n", 
            //     FILE_APPEND
            // );
        }
    }
}