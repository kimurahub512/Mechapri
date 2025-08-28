<?php

namespace App\Http\Controllers;

use App\Models\UserCategory;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShopNewCategoryController extends Controller
{
    public function show($categoryId): Response
    {
        // Get the category and its product batches
        $category = UserCategory::with(['productBatches' => function($query) {
                $query->where('is_public', true)
                ->with(['files' => function($subQuery) {
                    $subQuery->orderBy('sort_order');
                }]);
            }])
            ->findOrFail($categoryId);
        // Format the product batches
        $currentUser = auth()->user();
        $productBatches = $category->productBatches->map(function($batch) use ($currentUser) {
            // Calculate time duration from registration
            $createdAt = Carbon::parse($batch->created_at)->startOfDay();
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

            // Get watermarked images for unpurchased products
            $watermarkedImages = $batch->getWatermarkedImages($currentUser);

            return [
                'id' => $batch->id,
                'title' => $batch->title,
                'description' => $batch->description,
                'price' => $batch->price,
                'image_cnt' => $batch->image_cnt,
                'display_mode' => $batch->display_mode,
                'sales_deadline' => $batch->sales_deadline ? $batch->sales_deadline->format('Y-m-d') : null,
                'sales_limit' => $batch->sales_limit,
                'created_at' => $batch->created_at->format('Y-m-d H:i:s'),
                'badge1' => $badge1,
                'badge2' => $badge2,
                'user' => [
                    'id' => $batch->user->id,
                    'name' => $batch->user->name,
                    'image' => $batch->user->image,
                    'shop_title' => $batch->user->shop_title,
                ],
                'files' => $watermarkedImages,
            ];
        });
        return Inertia::render('ShopNewCategory', [
            'productBatches' => $productBatches,
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'description' => $category->description,
                'user' => [
                    'id' => $category->user->id,
                    'name' => $category->user->name,
                    'image' => $category->user->image,
                    'shop_title' => $category->user->shop_title,
                    'follower_count' => $category->user->favoritedBy()->count(),
                ],
            ],
        ]);
    }
}
