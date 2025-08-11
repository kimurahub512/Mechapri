<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProductBatch;

class MyContentsController extends Controller
{
    /**
     * Display the user's product batches.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Get user's product batches with files
        $productBatches = $user->productBatches()
            ->with(['files' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->orderBy('created_at', 'desc')
            ->get();
            
        // Debug: Log the raw data
        Log::info('Raw product batches:', $productBatches->toArray());
        
        $productBatches = $productBatches->map(function($batch) {
                return [
                    'id' => $batch->id,
                    'title' => $batch->title,
                    'description' => $batch->description,
                    'price' => $batch->price,
                    'image_cnt' => $batch->image_cnt,
                    'is_public' => $batch->is_public,
                    'display_mode' => $batch->display_mode,
                    'sales_deadline' => $batch->sales_deadline ? $batch->sales_deadline->format('Y-m-d') : null,
                    'sales_limit' => $batch->sales_limit,
                    'sn' => $batch->sn,
                    'created_at' => $batch->created_at->format('Y-m-d H:i:s'),
                    'files' => $batch->files->map(function($file) {
                        // Debug: Log file information
                        Log::info('File info:', [
                            'id' => $file->id,
                            'filename' => $file->filename,
                            'file_path' => $file->file_path,
                            'url' => $file->url,
                        ]);
                        
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

        return Inertia::render('MyShopManagement/MyContents', [
            'productBatches' => $productBatches,
        ]);
    }



    /**
     * Delete a product batch.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $productBatch = $user->productBatches()->findOrFail($id);
        
        // Delete the product batch (this will cascade delete files due to foreign key constraints)
        $productBatch->delete();
        
        // Redirect back to the contents page with a success message
        return redirect()->route('myshop.contents')->with('success', '商品が削除されました。');
    }

    /**
     * Show the edit form for a product batch.
     */
    public function edit($id)
    {
        $user = Auth::user();
        $productBatch = $user->productBatches()
            ->with(['files' => function($query) {
                $query->orderBy('sort_order');
            }, 'categories'])
            ->findOrFail($id);
        
        $formattedBatch = [
            'id' => $productBatch->id,
            'title' => $productBatch->title,
            'description' => $productBatch->description,
            'price' => $productBatch->price,
            'image_cnt' => $productBatch->image_cnt,
            'is_public' => $productBatch->is_public,
            'display_mode' => $productBatch->display_mode,
            'sales_deadline' => $productBatch->sales_deadline ? $productBatch->sales_deadline->format('Y-m-d') : null,
            'sales_limit' => $productBatch->sales_limit,
            'sn' => $productBatch->sn,
            'add_category' => $productBatch->add_category,
            'sn_print' => $productBatch->sn_print,
            'sn_format' => $productBatch->sn_format,
            'password' => $productBatch->password,
            'categories' => $productBatch->categories->map(function($category) {
                return [
                    'id' => $category->id,
                    'title' => $category->title,
                ];
            }),
            'created_at' => $productBatch->created_at->format('Y-m-d H:i:s'),
            'files' => $productBatch->files->map(function($file) {
                return [
                    'id' => $file->id,
                    'filename' => $file->filename,
                    'url' => $file->url,
                    'file_type' => $file->file_type,
                    'sort_order' => $file->sort_order,
                ];
            }),
        ];

        return Inertia::render('MyShopManagement/RegisterProduct', [
            'editMode' => true,
            'productBatch' => $formattedBatch,
        ]);
    }

    /**
     * Toggle the public status of a product batch.
     */
    public function togglePublic($id)
    {
        $user = Auth::user();
        $productBatch = $user->productBatches()->findOrFail($id);
        
        $productBatch->update([
            'is_public' => !$productBatch->is_public
        ]);
        
        return response()->json([
            'success' => true,
            'message' => $productBatch->is_public ? '商品が公開されました。' : '商品が非公開になりました。',
            'is_public' => $productBatch->is_public
        ]);
    }
}
