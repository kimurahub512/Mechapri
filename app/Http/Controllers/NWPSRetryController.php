<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductBatch;
use App\Jobs\ProcessProductNWPSJob;
use Illuminate\Support\Facades\Log;

class NWPSRetryController extends Controller
{
    public function retryProductNWPS(Request $request)
    {
        // Debug logging
        Log::info('NWPS Retry Request', [
            'user_id' => auth()->id(),
            'product_id' => $request->input('product_id'),
            'request_data' => $request->all()
        ]);
        
        $productId = $request->input('product_id');
        
        if (!$productId) {
            Log::warning('NWPS Retry: No product ID provided');
            return response()->json(['error' => 'Product ID is required'], 400);
        }
        
        $product = ProductBatch::find($productId);
        if (!$product) {
            Log::warning('NWPS Retry: Product not found', ['product_id' => $productId]);
            return response()->json(['error' => 'Product not found'], 404);
        }
        
        // Check if product is already in maintenance mode
        if ($product->nwps_upload_status === 'maintenance') {
            Log::info('NWPS Retry: Product is in maintenance mode', ['product_id' => $productId]);
            return response()->json(['error' => '印刷サーバーがメンテナンス中です。しばらく時間をおいてからお試しください。'], 503);
        }
        
        $userId = auth()->id();
        
        // Check if user is either:
        // 1. The owner of the product (for free products or seller retry)
        // 2. A buyer of the product (for purchased products)
        // 3. Anyone for free products (free products can be retried by anyone)
        $isOwner = $product->user_id === $userId;
        $isBuyer = \App\Models\UserPurchasedProduct::where('user_id', $userId)
            ->where('batch_id', $productId)
            ->exists();
        $isFreeProduct = $product->price == 0;
        
        if (!$isOwner && !$isBuyer && !$isFreeProduct) {
            Log::warning('NWPS Retry: Unauthorized access', [
                'product_user_id' => $product->user_id,
                'auth_user_id' => $userId,
                'product_id' => $productId,
                'is_owner' => $isOwner,
                'is_buyer' => $isBuyer,
                'is_free_product' => $isFreeProduct
            ]);
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        Log::info('NWPS Retry: Authorized access', [
            'product_id' => $productId,
            'user_id' => $userId,
            'is_owner' => $isOwner,
            'is_buyer' => $isBuyer,
            'is_free_product' => $isFreeProduct
        ]);
        
        // Dispatch the appropriate job based on user relationship and product type
        if ($isBuyer && !$isFreeProduct) {
            // For buyers of paid products, dispatch UploadToNWPSJob which updates UserPurchasedProduct
            $purchase = \App\Models\UserPurchasedProduct::where('user_id', $userId)
                ->where('batch_id', $productId)
                ->first();
            
            if ($purchase) {
                \App\Jobs\UploadToNWPSJob::dispatch($purchase->id);
                Log::info('NWPS Retry: Dispatched UploadToNWPSJob for purchase', ['purchase_id' => $purchase->id]);
            } else {
                Log::warning('NWPS Retry: Purchase record not found for buyer', ['user_id' => $userId, 'product_id' => $productId]);
                return response()->json(['error' => 'Purchase record not found'], 404);
            }
        } else {
            // For owners or free products (anyone can retry free products), dispatch ProcessProductNWPSJob which updates ProductBatch
            \App\Jobs\ProcessProductNWPSJob::dispatch($productId);
            Log::info('NWPS Retry: Dispatched ProcessProductNWPSJob for product', [
                'product_id' => $productId,
                'reason' => $isFreeProduct ? 'free_product' : 'owner'
            ]);
        }
        
        return response()->json(['success' => true, 'message' => 'Retry job dispatched']);
    }
}
