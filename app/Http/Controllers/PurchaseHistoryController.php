<?php

namespace App\Http\Controllers;

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
                    'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
                    'product' => [
                        'id' => $p->productBatch->id,
                        'title' => $p->productBatch->title,
                        'image' => optional($p->productBatch->files->first())->url,
                        'user' => [
                            'id' => $p->productBatch->user->id,
                            'name' => $p->productBatch->user->name,
                            'image' => $p->productBatch->user->image,
                        ],
                    ],
                ];
            });

        return Inertia::render('PurchaseHistory', [
            'purchases' => $purchases,
            'focusPurchaseId' => $request->query('purchase_id'),
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
            'print_expires_at' => optional($p->print_expires_at)->format('Y/m/d'),
            'product' => [
                'id' => $p->productBatch->id,
                'title' => $p->productBatch->title,
                'image' => optional($p->productBatch->files->first())->url,
                'user' => [
                    'id' => $p->productBatch->user->id,
                    'name' => $p->productBatch->user->name,
                    'image' => $p->productBatch->user->image,
                ],
            ],
        ]);
    }
}





