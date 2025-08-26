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
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'cnt' => $p->cnt,
                    'price' => $p->price,
                    'purchase_time' => optional($p->purchase_time)->format('Y/m/d H:i'),
                    'nwps_reservation_no' => $p->nwps_reservation_no,
                    'nwps_upload_status' => $p->nwps_upload_status,
                    'nwps_qr_code_url' => $p->nwps_qr_code_url ?? $p->productBatch->nwps_qr_code_url,
                    'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
                    'product' => [
                        'id' => $p->productBatch->id,
                        'title' => $p->productBatch->title,
                        'sn' => $p->productBatch->sn,
                        'nwps_qr_code_url' => $p->productBatch->nwps_qr_code_url,
                        'image' => optional($p->productBatch->files->first())->url,
                        'files' => $p->productBatch->files->map(function($file) {
                            return [
                                'id' => $file->id,
                                'url' => $file->url,
                                'filename' => $file->filename,
                                'original_name' => $file->original_name,
                                'sort_order' => $file->sort_order
                            ];
                        }),
                        'user' => [
                            'id' => $p->productBatch->user->id,
                            'name' => $p->productBatch->user->name,
                            'image' => $p->productBatch->user->image,
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

        return response()->json([
            'id' => $p->id,
            'cnt' => $p->cnt,
            'price' => $p->price,
            'purchase_time' => optional($p->purchase_time)->format('Y/m/d H:i'),
            'nwps_reservation_no' => $p->nwps_reservation_no,
            'nwps_upload_status' => $p->nwps_upload_status,
            'nwps_qr_code_url' => $p->nwps_qr_code_url ?? $p->productBatch->nwps_qr_code_url,
            'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
            'product' => [
                'id' => $p->productBatch->id,
                'title' => $p->productBatch->title,
                'sn' => $p->productBatch->sn,
                'nwps_qr_code_url' => $p->productBatch->nwps_qr_code_url,
                'image' => optional($p->productBatch->files->first())->url,
                'files' => $p->productBatch->files->map(function($file) {
                    return [
                        'id' => $file->id,
                        'url' => $file->url,
                        'filename' => $file->filename,
                        'original_name' => $file->original_name,
                        'sort_order' => $file->sort_order
                    ];
                }),
                'user' => [
                    'id' => $p->productBatch->user->id,
                    'name' => $p->productBatch->user->name,
                    'image' => $p->productBatch->user->image,
                ],
            ],
        ]);
    }
}






