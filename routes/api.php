<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route to retry product NWPS processing
Route::middleware('auth:sanctum')->post('/retry-product-nwps', function (Request $request) {
    $productId = $request->input('product_id');
    
    if (!$productId) {
        return response()->json(['error' => 'Product ID is required'], 400);
    }
    
    $product = \App\Models\ProductBatch::find($productId);
    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }
    
    // Check if user owns this product
    if ($product->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
    
    // Dispatch the job again for any product (free or paid)
    \App\Jobs\ProcessProductNWPSJob::dispatch($productId);
    
    return response()->json(['success' => true, 'message' => 'Retry job dispatched']);
});

// Test route to verify API routes are working
Route::get('/test-watermark', function() {
    return response('API routes are working!');
});

// Route to serve watermarked images directly
Route::get('/watermarked-image/{path}', function($path) {
    Log::info('Watermark route called with path: ' . $path);
    
    $decodedPath = urldecode($path);
    Log::info('Decoded path: ' . $decodedPath);
    
    // Validate the path to prevent directory traversal
    if (str_contains($decodedPath, '..') || !str_starts_with($decodedPath, 'product-batches/')) {
        Log::info('Path validation failed');
        return response('Invalid path: ' . $decodedPath, 404);
    }
    
    try {
        $watermarkService = app(\App\Services\ImageWatermarkService::class);
        $watermarkedPath = $watermarkService->createWatermarkedImage($decodedPath);
        
        if ($watermarkedPath && Storage::disk('public')->exists($watermarkedPath)) {
            $fullPath = Storage::disk('public')->path($watermarkedPath);
            
            // Use a simple MIME type detection
            $extension = pathinfo($fullPath, PATHINFO_EXTENSION);
            $mimeType = match($extension) {
                'jpg', 'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
                default => 'image/jpeg'
            };
            
            Log::info('Serving watermarked image: ' . $watermarkedPath);
            return response()->file($fullPath, [
                'Content-Type' => $mimeType,
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        } else {
            Log::error('Watermarked image not found: ' . $watermarkedPath);
            return response('Image not found', 404);
        }
    } catch (\Exception $e) {
        Log::error('Error serving watermarked image: ' . $e->getMessage());
        return response('Error: ' . $e->getMessage(), 500);
    }
})->where('path', '.*')->name('watermarked.image');
