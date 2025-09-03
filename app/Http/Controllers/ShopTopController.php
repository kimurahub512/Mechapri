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
        // Get the authenticated user's shop
        $currentUser = Auth::user();
        
        if (!$currentUser) {
            abort(401, 'Authentication required');
        }

        $featuredUser = User::with(['productBatches' => function($query) {
                $query
                ->with(['files' => function($fileQuery) {
                    $fileQuery->orderBy('sort_order');
                }])
                ->orderBy('created_at', 'desc');
            }])
            ->find($currentUser->id);

        if (!$featuredUser) {
            abort(404, 'User not found');
        }

        $shopData = null;
        $latestProducts = [];
        $categoryProducts = [];

        if ($featuredUser) {
            // Since featuredUser is the current user, they can't favorite their own shop
            $isFavoritedByCurrentUser = false;
            
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
                'product_count' => $featuredUser->productBatches()->count(),
                'is_favorited_by_current_user' => $isFavoritedByCurrentUser,
            ];

            // Get latest products (最新の出品) - show all products to shop owner
            $latestProducts = $featuredUser->productBatches()
                ->with(['files' => function($query) {
                    $query->orderBy('sort_order');
                }])
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get()
                ->map(function($batch) {
                    return $this->formatProductBatch($batch);
                });

            // Get category-based new list products (新しいリスト) - show all products to shop owner
            $categoryProducts = [];
            $categories = $featuredUser->categories()
                ->orderBy('sort_order', 'asc')
                ->orderBy('created_at', 'desc')
                ->get();

            foreach ($categories as $category) {
                $categoryBatches = $category->productBatches()
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
        $isOwnShop = $currentUser && $currentUser->id === $featuredUser->id;
        
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
            'product_count' => $featuredUser->productBatches()->count(),
            'is_favorited_by_current_user' => $isFavoritedByCurrentUser,
        ];

        // Get latest products (最新の出品) - filter by public status for non-owners
        $latestProductsQuery = $featuredUser->productBatches()
            ->with(['files' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->orderBy('created_at', 'desc');
            
        if (!$isOwnShop) {
            $latestProductsQuery->where('is_public', true);
        }
        
        $latestProducts = $latestProductsQuery
            ->limit(20)
            ->get()
            ->map(function($batch) {
                return $this->formatProductBatch($batch);
            });

        // Get category-based new list products (新しいリスト) - filter by public status for non-owners
        $categoryProducts = [];
        $categories = $featuredUser->categories()
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($categories as $category) {
            $categoryBatchesQuery = $category->productBatches()
                ->with(['files' => function($query) {
                    $query->orderBy('sort_order');
                }])
                ->orderBy('created_at', 'desc');
                
            if (!$isOwnShop) {
                $categoryBatchesQuery->where('is_public', true);
            }
            
            $categoryBatches = $categoryBatchesQuery
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
        
        // For badges, we need to show images based on the total count
        $badgeImages = [];
        if (count($watermarkedImages) === 1) {
            // 1 image product: show the main image as badge
            $badgeImages = [$watermarkedImages[0]];
        } else if (count($watermarkedImages) === 2) {
            // 2 image product: show both images as badges
            $badgeImages = $watermarkedImages;
        } else if (count($watermarkedImages) > 2) {
            // 3+ image product: show first 3 images as badges
            $badgeImages = array_slice($watermarkedImages, 0, 3);
        }
        
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
            'badges' => array_map(function($img) { return $img['url']; }, $badgeImages),
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
