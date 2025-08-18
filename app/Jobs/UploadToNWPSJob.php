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
        $purchase = UserPurchasedProduct::find($this->purchaseId);
        if (!$purchase) {
            return;
        }

        $product = ProductBatch::with('files')->find($purchase->batch_id);
        if (!$product) {
            return;
        }

        try {
            // 1) Guest login
            $days = (int) config('nwps.guest_token_days', 30);
            $login = $nwps->guestLogin('Web', [
                'os' => php_uname('s') ?: 'PHP',
                'brand' => 'Mechapuri',
                'model' => php_uname('n') ?: 'Server',
            ], $days);

            $token = $login['token'] ?? ($login['access_token'] ?? null);
            if (!$token) {
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }

            $purchase->update([
                'nwps_token' => $token,
                'nwps_token_expires_at' => now()->addDays($days),
            ]);

            // 2) Register files by URL (preferred to avoid streaming large uploads)
            // Note: Adjust payload keys to match official NWPS spec
            $fileId = null;
            foreach ($product->files as $index => $file) {
                $data = [
                    'app_key' => config('nwps.app_key'),
                    'url' => $file->url,
                    'name' => $file->original_name ?? basename($file->file_path),
                ];
                $registered = $nwps->registerFileFromUrl($token, $data);
                $fileId = $registered['file_id'] ?? $fileId;
            }

            if (!$fileId) {
                $purchase->update(['nwps_upload_status' => 'failed']);
                return;
            }

            $purchase->update([
                'nwps_file_id' => $fileId,
                'nwps_upload_status' => 'uploaded',
            ]);

            // 3) Poll until print data ready and reservation number issued
            $reservationNo = null;
            $maxAttempts = 24; // ~2 minutes at 5s interval
            for ($i = 0; $i < $maxAttempts; $i++) {
                $info = $nwps->getFileInfo($token, $fileId);
                $status = $info['status'] ?? null;
                // Adjust fields based on official spec
                $reservationNo = $info['reservation_no'] ?? ($info['print_code'] ?? null);

                if ($reservationNo) {
                    break;
                }

                // States like "processing", "converting", etc.
                if ($status === 'failed') {
                    $purchase->update(['nwps_upload_status' => 'failed']);
                    return;
                }

                sleep(5);
            }

            if ($reservationNo) {
                $purchase->update([
                    'nwps_reservation_no' => $reservationNo,
                    'nwps_upload_status' => 'ready',
                ]);
            } else {
                // Timed out waiting for ready
                $purchase->update(['nwps_upload_status' => 'processing']);
            }
        } catch (\Throwable $e) {
            Log::error('NWPS upload failed: ' . $e->getMessage());
            $purchase->update(['nwps_upload_status' => 'failed']);
        }
    }
}


