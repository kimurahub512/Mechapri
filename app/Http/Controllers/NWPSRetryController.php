<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductBatch;
use App\Jobs\ProcessProductNWPSJob;

class NWPSRetryController extends Controller
{
    public function retryProductNWPS(Request $request)
    {
        $productId = $request->input('product_id');
        
        if (!$productId) {
            return response()->json(['error' => 'Product ID is required'], 400);
        }
        
        $product = ProductBatch::find($productId);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        
        // Check if user owns this product
        if ($product->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        // Dispatch the job again for any product (free or paid)
        ProcessProductNWPSJob::dispatch($productId);
        
        return response()->json(['success' => true, 'message' => 'Retry job dispatched']);
    }
}
