<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ProductBatch;
use Illuminate\Support\Facades\Auth;

class ShopTopController extends Controller
{
    public function index()
    {
        // For now, let's get the first user with products as the featured shop
        // In a real app, this would be based on shop ID from URL or other logic
        $featuredUser = User::with(['productBatches' => function($query) {
                $query
                // ->where('is_public', true)
                      ->with(['files' => function($fileQuery) {
                          $fileQuery->orderBy('sort_order');
                      }])
                      ->orderBy('created_at', 'desc');
            }])
            ->whereHas('productBatches', function($query) {
                // $query->where('is_public', true);
            })
            ->first();

        if (!$featuredUser) {
            // Fallback to any user if no featured user found
            $featuredUser = User::first();
        }

        $shopData = null;
        $latestProducts = [];
        $categoryProducts = [];

        if ($featuredUser) {
            // Get current user if authenticated
            $currentUser = Auth::user();
            $isFavoritedByCurrentUser = false;
            
            if ($currentUser && $currentUser->id !== $featuredUser->id) {
                $isFavoritedByCurrentUser = $currentUser->hasFavoritedShop($featuredUser->id);
            }
            
            // Get shop information
            $shopData = [
                'id' => $featuredUser->id,
                'name' => $featuredUser->name,
                'shop_title' => $featuredUser->shop_title ?: $featuredUser->name . "'s SHOP",
                'shop_description' => $featuredUser->shop_description,
                'image' => $featuredUser->image,
                'xlink' => $featuredUser->xlink,
                'instagram' => $featuredUser->instagram,
                'youtube' => $featuredUser->youtube,
                'follower_count' => $featuredUser->favoritedBy()->count(),
                'product_count' => $featuredUser->productBatches()->where('is_public', true)->count(),
                'is_favorited_by_current_user' => $isFavoritedByCurrentUser,
            ];

            // Get latest products (最新の出品)
            $latestProducts = $featuredUser->productBatches()
                // ->where('is_public', true)
                ->with(['files' => function($query) {
                    $query->orderBy('sort_order');
                }])
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get()
                ->map(function($batch) {
                    return $this->formatProductBatch($batch);
                });

            // Get category-based new list products (新しいリスト)
            $categoryProducts = [];
            $categories = $featuredUser->categories()
                // ->where('is_public', true)
                ->orderBy('sort_order', 'asc')
                ->orderBy('created_at', 'desc')
                ->get();

            foreach ($categories as $category) {
                $categoryBatches = $category->productBatches()
                    // ->where('is_public', true)
                    ->with(['files' => function($query) {
                        $query->orderBy('sort_order');
                    }])
                    ->orderBy('created_at', 'desc')
                    ->limit(20)
                    ->get()
                    ->map(function($batch) {
                        return $this->formatProductBatch($batch);
                    });

                if ($categoryBatches->count() > 0) {
                    $categoryProducts[] = [
                        'category' => [
                            'id' => $category->id,
                            'title' => $category->title,
                            'description' => $category->description,
                        ],
                        'products' => $categoryBatches,
                    ];
                }
            }
        }

        return Inertia::render('ShopTop', [
            'shopData' => $shopData,
            'latestProducts' => $latestProducts,
            'categoryProducts' => $categoryProducts,
        ]);
    }

    public function show($userId)
    {
        // Find the specific user
        $featuredUser = User::with(['productBatches' => function($query) {
                $query
                // ->where('is_public', true)
                      ->with(['files' => function($fileQuery) {
                          $fileQuery->orderBy('sort_order');
                      }])
                      ->orderBy('created_at', 'desc');
            }])
            ->find($userId);

        if (!$featuredUser) {
            abort(404, 'User not found');
        }

        // Get current user if authenticated
        $currentUser = Auth::user();
        $isFavoritedByCurrentUser = false;
        
        if ($currentUser && $currentUser->id !== $featuredUser->id) {
            $isFavoritedByCurrentUser = $currentUser->hasFavoritedShop($featuredUser->id);
        }
        
        // Get shop information
        $shopData = [
            'id' => $featuredUser->id,
            'name' => $featuredUser->name,
            'shop_title' => $featuredUser->shop_title ?: $featuredUser->name . "'s SHOP",
            'shop_description' => $featuredUser->shop_description,
            'image' => $featuredUser->image,
            'xlink' => $featuredUser->xlink,
            'instagram' => $featuredUser->instagram,
            'youtube' => $featuredUser->youtube,
            'follower_count' => $featuredUser->favoritedBy()->count(),
            'product_count' => $featuredUser->productBatches()->where('is_public', true)->count(),
            'is_favorited_by_current_user' => $isFavoritedByCurrentUser,
        ];

        // Get latest products (最新の出品)
        $latestProducts = $featuredUser->productBatches()
            // ->where('is_public', true)
            ->with(['files' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function($batch) {
                return $this->formatProductBatch($batch);
            });

        // Get category-based new list products (新しいリスト)
        $categoryProducts = [];
        $categories = $featuredUser->categories()
            // ->where('is_public', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($categories as $category) {
            $categoryBatches = $category->productBatches()
                // ->where('is_public', true)
                ->with(['files' => function($query) {
                    $query->orderBy('sort_order');
                }])
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get()
                ->map(function($batch) {
                    return $this->formatProductBatch($batch);
                });

            if ($categoryBatches->count() > 0) {
                $categoryProducts[] = [
                    'category' => [
                        'id' => $category->id,
                        'title' => $category->title,
                        'description' => $category->description,
                    ],
                    'products' => $categoryBatches,
                ];
            }
        }

        return Inertia::render('ShopTop', [
            'shopData' => $shopData,
            'latestProducts' => $latestProducts,
            'categoryProducts' => $categoryProducts,
        ]);
    }

    private function formatProductBatch($batch)
    {
        $currentUser = Auth::user();
        $isPurchased = $currentUser ? $batch->isPurchasedBy($currentUser) : false;
        
        // Get watermarked images for unpurchased products
        $watermarkedImages = $batch->getWatermarkedImages($currentUser);
        $mainImage = $watermarkedImages[0] ?? null;
        $additionalImages = array_slice($watermarkedImages, 1, 3);
        
        // Calculate time duration from registration
        $createdAt = \Carbon\Carbon::parse($batch->created_at)->startOfDay();
        $now = \Carbon\Carbon::now()->startOfDay();
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

        return [
            'id' => $batch->id,
            'user_id' => $batch->user_id,
            'title' => $batch->title,
            'image' => $mainImage ? $mainImage['url'] : null,
            'badges' => array_map(function($img) { return $img['url']; }, $additionalImages),
            'badgeText' => $batch->image_cnt . '枚セット',
            'price' => $batch->price == 0 ? '無料' : number_format($batch->price) . '円',
            'like' => 0, // Mock data for now
            'badge1' => $badge1,
            'badge2' => $badge2,
            'display_mode' => $batch->display_mode,
            'sales_limit' => $batch->sales_limit,
            'created_at' => $batch->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
