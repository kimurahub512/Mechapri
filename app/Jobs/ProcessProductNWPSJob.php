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
        // Debug logging
        try {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product NWPS Job started for product_id: {$this->productId}\n", 
                FILE_APPEND
            );
        } catch (\Exception $e) {
            file_put_contents('/tmp/nwps_debug.log', 
                date('Y-m-d H:i:s') . " - Product NWPS Job started for product_id: {$this->productId} (storage write failed)\n", 
                FILE_APPEND
            );
        }
        
        $product = ProductBatch::with('files')->find($this->productId);
        if (!$product) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product not found: {$this->productId}\n", 
                FILE_APPEND
            );
            return;
        }

        file_put_contents(storage_path('nwps_debug.log'), 
            date('Y-m-d H:i:s') . " - Found product {$product->id} with {$product->files->count()} files (price: {$product->price})\n", 
            FILE_APPEND
        );

        try {
            // 1) Guest login
            // Expire should match sales_deadline for products
            $days = (int) config('nwps.guest_token_days', 30);
            if ($product->sales_deadline) {
                $diff = now()->diffInDays($product->sales_deadline, false);
                // Ensure at least 1 day and fallback if negative
                $days = $diff > 0 ? $diff : 1;
            }
            $login = $nwps->guestLogin('Web', [
                'os' => php_uname('s') ?: 'PHP',
                'brand' => 'Mechapuri',
                'model' => php_uname('n') ?: 'Server',
            ], $days);
          
            Log::info('Product NWPS login response: ' . json_encode($login));
            
            // Check for NWPS maintenance mode or other errors
            if (isset($login['result_code']) && $login['result_code'] === 'M001') {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - NWPS maintenance mode detected (M001) for product {$product->id}\n", 
                    FILE_APPEND
                );
                
                // Mark product as failed and schedule retry
                $product->update(['nwps_upload_status' => 'failed']);
                $this->scheduleRetry();
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
                $data = [
                    'file_url' => $file->url,
                    'file_name' => $file->original_name ?? basename($file->file_path),
                    // expire should be same as sales_deadline (in days)
                    'expire' => $days, // days
                    // For paid products, add printing_limit (3 prints)
                    // For free products, omit printing_limit (unlimited)
                    ...($product->price > 0 ? ['printing_limit' => 3] : []),
                ];
                
                try {
                    $registered = $nwps->registerFileFromUrl($token, $data);
                    Log::info('File registration response: ' . json_encode($registered));
                    $fileId = $registered['file_id'] ?? $fileId;
                } catch (\Exception $e) {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - File registration failed: " . $e->getMessage() . "\n", 
                        FILE_APPEND
                    );
                    Log::info('File registration failed: ' . $e->getMessage());
                    throw $e;
                }
            }

            if (!$fileId) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - No file ID received from NWPS registration for product\n", 
                    FILE_APPEND
                );
                Log::info('No file ID received from NWPS registration for product');
                return;
            }
            
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product file registration successful, file_id: {$fileId}\n", 
                FILE_APPEND
            );

            // 3) Get QR code for convenience store login
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Getting QR code for product login\n", 
                FILE_APPEND
            );
            
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
                    
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Product NWPS upload completed successfully\n", 
                        FILE_APPEND
                    );
                } else {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Failed to get QR code for product: " . json_encode($qrCodeData) . "\n", 
                        FILE_APPEND
                    );
                }
            } catch (\Exception $e) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Failed to get QR code for product: " . $e->getMessage() . "\n", 
                    FILE_APPEND
                );
            }
        } catch (\Throwable $e) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product NWPS upload failed: " . $e->getMessage() . "\n", 
                FILE_APPEND
            );
            
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
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Scheduling retry for product {$this->productId} (attempt {$this->attempts()}/{$this->tries})\n", 
                FILE_APPEND
            );
            
            // Schedule retry with delay
            $this->release($this->backoff);
        } else {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Max retry attempts reached for product {$this->productId}\n", 
                FILE_APPEND
            );
        }
    }
}