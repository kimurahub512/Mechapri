<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;

class HomeLoginController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get favorite shops' new products (latest 5 products from shops user follows)
        $favoriteShopsNewProducts = collect();
        if ($user->favoriteShops()->count() > 0) {
            $favoriteShopsNewProducts = ProductBatch::whereIn('user_id', $user->favoriteShops()->pluck('favorite_user_id'))
                ->with(['user', 'files'])
                ->where('is_public', true)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function($product) use ($user) {
                    return [
                        'id' => $product->id,
                        'title' => $product->title,
                        'price' => $product->price,
                        'image_cnt' => $product->image_cnt,
                        'favorite_count' => $product->favorite_count,
                        'is_favorited' => $product->isFavoritedBy(Auth::user()),
                        'user' => [
                            'id' => $product->user->id,
                            'name' => $product->user->name,
                            'image' => $product->user->image,
                        ],
                        'files' => $product->getWatermarkedImages($user),
                    ];
                });
        }

        // Get user's purchase history (latest 5 purchases)
        $purchaseHistory = UserPurchasedProduct::where('user_id', $user->id)
            ->with(['productBatch.user', 'productBatch.files'])
            ->orderBy('purchase_time', 'desc')
            ->limit(5)
            ->get()
            ->map(function($purchase) {
                $product = $purchase->productBatch;
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'price' => $purchase->price,
                    'quantity' => $purchase->cnt,
                    'total_price' => $purchase->price * $purchase->cnt,
                    'purchase_time' => $purchase->purchase_time->format('Y/m/d'),
                    'image_cnt' => $product->image_cnt,
                    'user' => [
                        'id' => $product->user->id,
                        'name' => $product->user->name,
                        'image' => $product->user->image,
                    ],
                    'files' => $product->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'file_path' => $file->file_path,
                            'url' => $file->url,
                        ];
                    }),
                ];
            });

        // Get recommended products (latest public products, excluding user's own and already purchased)
        $purchasedProductIds = $user->purchases()->pluck('batch_id')->toArray();
        $recommendedProducts = ProductBatch::where('is_public', true)
            ->where('user_id', '!=', $user->id)
            ->whereNotIn('id', $purchasedProductIds)
            ->with(['user', 'files'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function($product) use ($user) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'price' => $product->price,
                    'image_cnt' => $product->image_cnt,
                    'favorite_count' => $product->favorite_count,
                    'is_favorited' => $product->isFavoritedBy(Auth::user()),
                    'user' => [
                        'id' => $product->user->id,
                        'name' => $product->user->name,
                        'image' => $product->user->image,
                    ],
                    'files' => $product->getWatermarkedImages($user),
                ];
            });

        return Inertia::render('HomeLogin', [
            'favoriteShopsNewProducts' => $favoriteShopsNewProducts,
            'purchaseHistory' => $purchaseHistory,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }
}
