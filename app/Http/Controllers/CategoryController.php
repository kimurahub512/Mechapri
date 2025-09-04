<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserCategory;

class CategoryController extends Controller
{
    /**
     * Display the user's categories.
     */
    public function index(): Response
    {
        Log::info('CategoryController::index method called');
        $user = Auth::user();
        Log::info('CategoryController::index - User authenticated: ' . ($user ? 'Yes' : 'No') . ', User ID: ' . ($user ? $user->id : 'N/A'));
        
        // Get user's categories with product batch count
        $categories = $user->categories()
            ->withCount('productBatches')
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Initialize sort_order for categories that don't have it set
        $categories->each(function($category, $index) {
            if ($category->sort_order === 0 && $index === 0) {
                // This is likely an existing category without sort_order
                $category->update(['sort_order' => $index + 1]);
            }
        });

        $categories = $categories->map(function($category) {
                return [
                    'id' => $category->id,
                    'title' => $category->title,
                    'description' => $category->description,
                    'is_public' => $category->is_public,
                    'batch_cnt' => $category->batch_cnt,
                    'created_at' => $category->created_at->format('Y-m-d H:i:s'),
                ];
            });

        // Get total number of product batches for the user by counting from product_batches table
        $totalBatches = \App\Models\ProductBatch::where('user_id', $user->id)->count();
        
        // Debug logging
        Log::info('CategoryController::index - User ID: ' . $user->id . ', Total Batches: ' . $totalBatches);
        Log::info('CategoryController::index - Direct query result:', \App\Models\ProductBatch::where('user_id', $user->id)->get()->toArray());

        return Inertia::render('MyShopManagement/Category', [
            'categories' => $categories,
            'totalBatches' => $totalBatches,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        $user = Auth::user();
        
        // Get all user's product batches for selection (no filtering needed since batches can belong to multiple categories)
        $productBatches = $user->productBatches()
            ->with('files')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($batch) {
                return [
                    'id' => $batch->id,
                    'title' => $batch->title,
                    'description' => $batch->description,
                    'display_mode' => $batch->display_mode,
                    'files' => $batch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'url' => $file->url,
                        ];
                    }),
                ];
            });

        return Inertia::render('MyShopManagement/CategoryEdit', [
            'editMode' => false,
            'productBatches' => $productBatches,
        ]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(UserCategory $category): Response
    {
        // Check if user owns this category
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $user = Auth::user();
        
        // Get all user's product batches for selection (batches can belong to multiple categories)
        $productBatches = $user->productBatches()
            ->with('files')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($batch) {
                return [
                    'id' => $batch->id,
                    'title' => $batch->title,
                    'display_mode' => $batch->display_mode,
                    'files' => $batch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'url' => $file->url,
                        ];
                    }),
                ];
            });

        // Get category's current product batches
        $categoryProductBatches = $category->productBatches()
            ->where('user_id', $user->id)
            ->with('files')
            ->get()
            ->map(function($batch) {
                return [
                    'id' => $batch->id,
                    'title' => $batch->title,
                    'display_mode' => $batch->display_mode,
                    'files' => $batch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'url' => $file->url,
                        ];
                    }),
                ];
            });

        return Inertia::render('MyShopManagement/CategoryEdit', [
            'editMode' => true,
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'description' => $category->description,
                'is_public' => $category->is_public,
                'product_batches' => $categoryProductBatches,
            ],
            'productBatches' => $productBatches,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_public' => 'boolean',
            'product_batch_ids' => 'array',
            'product_batch_ids.*' => 'exists:productbatches,id',
        ]);

        $user = Auth::user();
        
        $category = $user->categories()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_public' => $validated['is_public'] ?? true,
            'batch_cnt' => count($validated['product_batch_ids'] ?? []),
        ]);

        // Attach product batches to category if provided
        if (!empty($validated['product_batch_ids'])) {
            $category->productBatches()->attach($validated['product_batch_ids']);
        }

        return redirect()->route('myshop.category')->with('success', 'カテゴリが作成されました。');
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, UserCategory $category)
    {
        // Check if user owns this category
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_public' => 'boolean',
            'product_batch_ids' => 'array',
            'product_batch_ids.*' => 'exists:productbatches,id',
        ]);

        $category->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_public' => $validated['is_public'],
            'batch_cnt' => count($validated['product_batch_ids'] ?? []),
        ]);

        // Update product batches relationship
        if (!empty($validated['product_batch_ids'])) {
            // Sync will handle both attaching and detaching
            $category->productBatches()->sync($validated['product_batch_ids']);
        } else {
            // If no product batches selected, detach all
            $category->productBatches()->detach();
        }

        return redirect()->route('shop.newcategory', ['categoryId' => $category->id])->with('success', 'カテゴリが更新されました。');
    }

    /**
     * Delete the specified category.
     */
    public function destroy(UserCategory $category)
    {
        // Check if user owns this category
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        // Get product count before deletion
        $productCount = $category->productBatches()->count();
        
        // Detach all products from this category
        $category->productBatches()->detach();
        
        // Delete the category
        $category->delete();

        if ($productCount > 0) {
            return redirect()->route('myshop.category')->with('success', "カテゴリが削除されました。{$productCount}個の商品がカテゴリから外されました。");
        }

        return redirect()->route('myshop.category')->with('success', 'カテゴリが削除されました。');
    }

    /**
     * Toggle the public status of a category.
     */
    public function togglePublic(UserCategory $category)
    {
        // Check if user owns this category
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $category->update([
            'is_public' => !$category->is_public
        ]);

        return response()->json([
            'success' => true,
            'message' => $category->is_public ? 'カテゴリが公開されました。' : 'カテゴリが非公開になりました。',
            'is_public' => $category->is_public
        ]);
    }

    /**
     * Reorder categories.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'categories' => 'required|array',
            'categories.*.id' => 'required|exists:user_categories,id',
            'categories.*.sort_order' => 'required|integer|min:0',
        ]);

        $user = Auth::user();

        foreach ($validated['categories'] as $categoryData) {
            $category = $user->categories()->find($categoryData['id']);
            if ($category) {
                $category->update(['sort_order' => $categoryData['sort_order']]);
            }
        }

        return redirect()->route('myshop.category')->with('success', 'カテゴリの順序が更新されました。');
    }
}
