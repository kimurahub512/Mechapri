<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;
use Carbon\Carbon;

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
                    // Get watermarked images for the product
                    $watermarkedImages = $product->getWatermarkedImages($user);
                    
                    // Calculate time duration from registration
                    $createdAt = Carbon::parse($product->created_at)->startOfDay();
                    $now = Carbon::now()->startOfDay();
                    $totalDays = $createdAt->diffInDays($now);

                    // Format the time duration
                    $badge1 = '';
                    $badge2 = '以内';

                    if ($totalDays >= 365) {
                        $badge1 = (int)($totalDays / 365) . '年';
                    } elseif ($totalDays >= 30) {
                        $badge1 = (int)($totalDays / 30) . 'ヶ月';
                    } else {
                        $badge1 = $totalDays . '日';
                    }
                    
                    // Prepare badges array for the product card
                    $badges = [];
                    if ($watermarkedImages && count($watermarkedImages) > 0) {
                        if (count($watermarkedImages) === 1) {
                            // 1 image product: show 1 badge (the same image)
                            $badges = [$watermarkedImages[0]['url']];
                        } else if (count($watermarkedImages) === 2) {
                            // 2 image product: show 2 badges (both images)
                            $badges = array_map(function($file) { return $file['url']; }, $watermarkedImages);
                        } else if (count($watermarkedImages) > 2) {
                            // More than 2 images: show up to 3 badges (first 3 images)
                            $badges = array_map(function($file) { return $file['url']; }, array_slice($watermarkedImages, 0, 3));
                        }
                    }
                    
                    return [
                        'id' => $product->id,
                        'title' => $product->title,
                        'price' => $product->price == 0 ? '無料' : $product->price . '円',
                        'image_cnt' => $product->image_cnt,
                        'favorite_count' => $product->favorite_count,
                        'is_favorited' => $product->isFavoritedBy(Auth::user()),
                        'display_mode' => $product->display_mode,
                        'badge1' => $badge1,
                        'badge2' => $badge2,
                        'like' => $product->favorite_count,
                        // ProductCard expected properties
                        'image' => $watermarkedImages && count($watermarkedImages) > 0 ? $watermarkedImages[0]['url'] : null,
                        'badges' => $badges,
                        'badgeText' => $product->image_cnt . '枚セット',
                        'user' => [
                            'id' => $product->user->id,
                            'name' => $product->user->name,
                            'image' => $product->user->image,
                            'shop_title' => $product->user->shop_title ?: $product->user->name . "'s SHOP",
                        ],
                        'files' => $watermarkedImages,
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
                // Get watermarked images for the product
                $watermarkedImages = $product->getWatermarkedImages($user);
                
                // Calculate time duration from registration
                $createdAt = Carbon::parse($product->created_at)->startOfDay();
                $now = Carbon::now()->startOfDay();
                $totalDays = $createdAt->diffInDays($now);

                // Format the time duration
                $badge1 = '';
                $badge2 = '以内';

                if ($totalDays >= 365) {
                    $badge1 = (int)($totalDays / 365) . '年';
                } elseif ($totalDays >= 30) {
                    $badge1 = (int)($totalDays / 30) . 'ヶ月';
                } else {
                    $badge1 = $totalDays . '日';
                }
                
                // Prepare badges array for the product card
                $badges = [];
                if ($watermarkedImages && count($watermarkedImages) > 0) {
                    if (count($watermarkedImages) === 1) {
                        // 1 image product: show 1 badge (the same image)
                        $badges = [$watermarkedImages[0]['url']];
                    } else if (count($watermarkedImages) === 2) {
                        // 2 image product: show 2 badges (both images)
                        $badges = array_map(function($file) { return $file['url']; }, $watermarkedImages);
                    } else if (count($watermarkedImages) > 2) {
                        // More than 2 images: show up to 3 badges (first 3 images)
                        $badges = array_map(function($file) { return $file['url']; }, array_slice($watermarkedImages, 0, 3));
                    }
                }
                
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'price' => $product->price == 0 ? '無料' : $product->price . '円',
                    'image_cnt' => $product->image_cnt,
                    'favorite_count' => $product->favorite_count,
                    'is_favorited' => $product->isFavoritedBy(Auth::user()),
                    'display_mode' => $product->display_mode,
                    'badge1' => $badge1,
                    'badge2' => $badge2,
                    'like' => $product->favorite_count,
                    // ProductCard expected properties
                    'image' => $watermarkedImages && count($watermarkedImages) > 0 ? $watermarkedImages[0]['url'] : null,
                    'badges' => $badges,
                    'badgeText' => $product->image_cnt . '枚セット',
                    'user' => [
                        'id' => $product->user->id,
                        'name' => $product->user->name,
                        'image' => $product->user->image,
                        'shop_title' => $product->user->shop_title ?: $product->user->name . "'s SHOP",
                    ],
                    'files' => $watermarkedImages,
                ];
            });

        return Inertia::render('HomeLogin', [
            'favoriteShopsNewProducts' => $favoriteShopsNewProducts,
            'purchaseHistory' => $purchaseHistory,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }
}
