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
        
        $userId = auth()->id();
        
        // Check if user is either:
        // 1. The owner of the product (for free products or seller retry)
        // 2. A buyer of the product (for purchased products)
        $isOwner = $product->user_id === $userId;
        $isBuyer = \App\Models\UserPurchasedProduct::where('user_id', $userId)
            ->where('batch_id', $productId)
            ->exists();
        
        if (!$isOwner && !$isBuyer) {
            Log::warning('NWPS Retry: Unauthorized access', [
                'product_user_id' => $product->user_id,
                'auth_user_id' => $userId,
                'product_id' => $productId,
                'is_owner' => $isOwner,
                'is_buyer' => $isBuyer
            ]);
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        Log::info('NWPS Retry: Authorized access', [
            'product_id' => $productId,
            'user_id' => $userId,
            'is_owner' => $isOwner,
            'is_buyer' => $isBuyer
        ]);
        
        // Dispatch the job again for any product (free or paid)
        ProcessProductNWPSJob::dispatch($productId);
        
        return response()->json(['success' => true, 'message' => 'Retry job dispatched']);
    }
}
