<?php

namespace App\Http\Controllers;

use App\Models\ProductBatch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ShopNewProductsController extends Controller
{
    public function index(): Response
    {
        // Get all public product batches with files, ordered by creation date (newest first)
        $productBatches = ProductBatch::with(['files' => function($query) {
                $query->orderBy('sort_order');
            }])
            // ->where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($batch) {
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
                        'follower_count' => $batch->user->favoritedBy()->count(),
                    ],
                    'files' => $batch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'filename' => $file->filename,
                            'url' => $file->url,
                            'file_type' => $file->file_type,
                            'sort_order' => $file->sort_order,
                        ];
                    }),
                ];
            });

        return Inertia::render('ShopNewProducts', [
            'productBatches' => $productBatches,
        ]);
    }
}
