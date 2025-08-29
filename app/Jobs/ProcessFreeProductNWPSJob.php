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

    public function __construct(int $productId)
    {
        $this->productId = $productId;
    }

    public function handle(NWPSService $nwps): void
    {
        // Debug logging
        try {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Free Product NWPS Job started for product_id: {$this->productId}\n", 
                FILE_APPEND
            );
        } catch (\Exception $e) {
            file_put_contents('/tmp/nwps_debug.log', 
                date('Y-m-d H:i:s') . " - Free Product NWPS Job started for product_id: {$this->productId} (storage write failed)\n", 
                FILE_APPEND
            );
        }
        
        $product = ProductBatch::with('files')->find($this->productId);
        if (!$product) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Free product not found: {$this->productId}\n", 
                FILE_APPEND
            );
            return;
        }

        // Check if product is free
        if ($product->price > 0) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Product is not free (price: {$product->price}), skipping NWPS processing\n", 
                FILE_APPEND
            );
            return;
        }
        
        file_put_contents(storage_path('nwps_debug.log'), 
            date('Y-m-d H:i:s') . " - Found free product {$product->id} with {$product->files->count()} files\n", 
            FILE_APPEND
        );

        try {
            // 1) Guest login
            // Expire should match sales_deadline for free products
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

            $token = $login['token'] ?? ($login['access_token'] ?? null);
            $userCode = $login['user_code'] ?? null;
            if (!$token) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - No token received from NWPS login for free product. Response: " . json_encode($login) . "\n", 
                    FILE_APPEND
                );
                return;
            }
            
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Free product NWPS login successful, token received\n", 
                FILE_APPEND
            );

            // 2) Register image(s) by URL (filesfromurl/image) - NO printing_limit for free products
            $fileId = null;
            foreach ($product->files as $index => $file) {
                $data = [
                    'file_url' => $file->url,
                    'file_name' => $file->original_name ?? basename($file->file_path),
                    // expire should be same as sales_deadline (in days)
                    'expire' => $days, // days
                    // Note: printing_limit is omitted for free products
                ];
                $registered = $nwps->registerFileFromUrl($token, $data);
                $fileId = $registered['file_id'] ?? $fileId;
            }

            if (!$fileId) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - No file ID received from NWPS registration for free product\n", 
                    FILE_APPEND
                );
                return;
            }
            
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Free product file registration successful, file_id: {$fileId}\n", 
                FILE_APPEND
            );

            // 3) Get QR code for convenience store login
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Getting QR code for free product login\n", 
                FILE_APPEND
            );
            
            try {
                $qrCodeData = $nwps->getLoginQrCode($token);
                
                if ($qrCodeData['success'] ?? false) {
                    $qrCodeUrl = $qrCodeData['qr_code_url'];
                    
                    // Store the QR code URL and token in the product batch for free products
                    $product->update([
                        'nwps_token' => $token,
                        'nwps_user_code' => $userCode,
                        // Align token expiration with sales_deadline when provided
                        'nwps_token_expires_at' => $product->sales_deadline ? \Carbon\Carbon::parse($product->sales_deadline)->endOfDay() : now()->addDays($days),
                        'nwps_file_id' => $fileId,
                        'nwps_qr_code_url' => $qrCodeUrl,
                    ]);
                    
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Free product {$product->id} updated with QR code\n", 
                        FILE_APPEND
                    );
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - QR Code URL: " . ($qrCodeUrl ?? 'NULL') . "\n", 
                        FILE_APPEND
                    );
                } else {
                    file_put_contents(storage_path('nwps_debug.log'), 
                        date('Y-m-d H:i:s') . " - Failed to get QR code for free product: " . json_encode($qrCodeData) . "\n", 
                        FILE_APPEND
                    );
                }
            } catch (\Exception $e) {
                file_put_contents(storage_path('nwps_debug.log'), 
                    date('Y-m-d H:i:s') . " - Failed to get QR code for free product: " . $e->getMessage() . "\n", 
                    FILE_APPEND
                );
            }
        } catch (\Throwable $e) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - Free product NWPS upload failed: " . $e->getMessage() . "\n", 
                FILE_APPEND
            );
        }
    }
}
