<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;

class SalesHistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Get all purchases of the user's products
        $salesHistory = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->with(['productBatch.files', 'productBatch.user'])
            ->orderBy('purchase_time', 'desc')
            ->get()
            ->map(function($purchase) {
                return [
                    'id' => $purchase->id,
                    'title' => $purchase->productBatch->title,
                    'price' => (int)$purchase->price,
                    'quantity' => $purchase->cnt,
                    'total_amount' => (int)($purchase->price * $purchase->cnt),
                    'purchase_time' => $purchase->purchase_time->format('Y/m/d'),
                    'sales_deadline' => $purchase->productBatch->sales_deadline ? $purchase->productBatch->sales_deadline->format('Y/m/d') : null,
                    'image' => $purchase->productBatch->files->first() ? '/storage/' . $purchase->productBatch->files->first()->file_path : null,
                    'buyer' => [
                        'id' => $purchase->user->id,
                        'name' => $purchase->user->name,
                        'image' => $purchase->user->image,
                    ],
                ];
            });

        return Inertia::render('MyShopManagement/SalesHistory', [
            'salesHistory' => $salesHistory
        ]);
    }
}
