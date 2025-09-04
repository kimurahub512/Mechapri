<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\UserPurchasedProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseHistoryController extends Controller
{
    public function index(Request $request)
    {
        $purchases = UserPurchasedProduct::with(['productBatch.files', 'productBatch.user'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('purchase_time')
            ->get()
            ->map(function ($p) use ($request) {
                // Get watermarked images for the product
                $watermarkedImages = $p->productBatch->getWatermarkedImages($request->user());
                $mainImage = $watermarkedImages[0] ?? null;
                
                return [
                    'id' => $p->id,
                    'cnt' => $p->cnt,
                    'price' => $p->price,
                    'purchase_time' => optional($p->purchase_time)->format('Y/m/d H:i'),
                    'nwps_reservation_no' => $p->nwps_reservation_no,
                    'nwps_upload_status' => $p->nwps_upload_status,
                    'nwps_qr_code_url' => $p->nwps_qr_code_url ?? $p->productBatch->nwps_qr_code_url,
                    'nwps_user_code' => $p->nwps_user_code ?? $p->productBatch->nwps_user_code,
                    'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
                    'product' => [
                        'id' => $p->productBatch->id,
                        'title' => $p->productBatch->title,
                        'sn' => $p->productBatch->sn,
                        'nwps_qr_code_url' => $p->productBatch->nwps_qr_code_url,
                        'display_mode' => $p->productBatch->display_mode,
                        'image' => $mainImage ? $mainImage['url'] : null,
                        'files' => $watermarkedImages,
                        'user' => [
                            'id' => $p->productBatch->user->id,
                            'name' => $p->productBatch->user->name,
                            'image' => $p->productBatch->user->image,
                            'title' => $p->productBatch->user->shop_title ?: $p->productBatch->user->name . "'s SHOP",
                        ],
                    ],
                ];
            });

        $focusPurchaseId = $request->query('purchase_id');
        \Illuminate\Support\Facades\Log::info('PurchaseHistory index called', [
            'purchase_id' => $focusPurchaseId,
            'purchases_count' => $purchases->count(),
            'purchase_ids' => $purchases->pluck('id')->toArray()
        ]);
        
        // Debug: Log QR code URLs for the first purchase
        if ($purchases->count() > 0) {
            $firstPurchase = $purchases->first();
            \Illuminate\Support\Facades\Log::info('First purchase QR code data', [
                'purchase_id' => $firstPurchase['id'],
                'nwps_qr_code_url' => $firstPurchase['nwps_qr_code_url'],
                'product_nwps_qr_code_url' => $firstPurchase['product']['nwps_qr_code_url'],
                'product_id' => $firstPurchase['product']['id']
            ]);
            
            // Also log the raw database values
            $rawPurchase = \App\Models\UserPurchasedProduct::with('productBatch')->find($firstPurchase['id']);
            \Illuminate\Support\Facades\Log::info('Raw database values', [
                'purchase_id' => $rawPurchase->id,
                'nwps_qr_code_url' => $rawPurchase->nwps_qr_code_url,
                'nwps_upload_status' => $rawPurchase->nwps_upload_status,
                'product_nwps_qr_code_url' => $rawPurchase->productBatch->nwps_qr_code_url,
                'product_id' => $rawPurchase->productBatch->id
            ]);
        }
        
        return Inertia::render('PurchaseHistory', [
            'purchases' => $purchases,
            'focusPurchaseId' => $focusPurchaseId,
        ]);
    }

    public function show(Request $request, int $id)
    {
        $p = UserPurchasedProduct::with(['productBatch.files', 'productBatch.user'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        // Get watermarked images for the product
        $watermarkedImages = $p->productBatch->getWatermarkedImages($request->user());
        $mainImage = $watermarkedImages[0] ?? null;

        return response()->json([
            'id' => $p->id,
            'cnt' => $p->cnt,
            'price' => $p->price,
            'purchase_time' => optional($p->purchase_time)->format('Y/m/d H:i'),
            'nwps_reservation_no' => $p->nwps_reservation_no,
            'nwps_upload_status' => $p->nwps_upload_status,
            'nwps_qr_code_url' => $p->nwps_qr_code_url ?? $p->productBatch->nwps_qr_code_url,
            'nwps_user_code' => $p->nwps_user_code ?? $p->productBatch->nwps_user_code,
            'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
            'product' => [
                'id' => $p->productBatch->id,
                'title' => $p->productBatch->title,
                'sn' => $p->productBatch->sn,
                'nwps_qr_code_url' => $p->productBatch->nwps_qr_code_url,
                'display_mode' => $p->productBatch->display_mode,
                'image' => $mainImage ? $mainImage['url'] : null,
                'files' => $watermarkedImages,
                'user' => [
                    'id' => $p->productBatch->user->id,
                    'name' => $p->productBatch->user->name,
                    'image' => $p->productBatch->user->image,
                ],
            ],
        ]);
    }
}






