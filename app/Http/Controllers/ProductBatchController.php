<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductBatchRequest;

use App\Models\ProductBatch;
use App\Services\ProductBatchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductBatchController extends Controller
{
    protected ProductBatchService $productBatchService;

    public function __construct(ProductBatchService $productBatchService)
    {
        $this->productBatchService = $productBatchService;
    }

    /**
     * Store a newly created product batch.
     */
    public function store(StoreProductBatchRequest $request): JsonResponse
    {
        try {
            // Debug: Log the request
            // Log::info('Product batch store request received', [
            //     'user_id' => auth()->id(),
            //     'user_authenticated' => auth()->check(),
            //     'request_method' => $request->method(),
            //     'content_type' => $request->header('Content-Type'),
            //     'has_files' => $request->hasFile('files'),
            //     'file_count' => count($request->file('files', [])),
            // ]);

            // Get files from request
            $files = $request->file('files', []);
            
            $productBatch = $this->productBatchService->create($request->validated(), auth()->user(), $files);

            return response()->json([
                'success' => true,
                'message' => '商品が正常に登録されました。',
                'data' => [
                    'id' => $productBatch->id,
                    'title' => $productBatch->title,
                    'description' => $productBatch->description,
                    'image_cnt' => $productBatch->image_cnt,
                    'price' => $productBatch->price,
                    'sales_deadline' => $productBatch->sales_deadline ? $productBatch->sales_deadline->format('Y-m-d') : null,
                    'sales_limit' => $productBatch->sales_limit,
                    'display_mode' => $productBatch->display_mode,
                    'add_category' => $productBatch->add_category,
                    'sn_print' => $productBatch->sn_print,
                    'sn_format' => $productBatch->sn_format,
                    'sn' => $productBatch->sn,
                    'is_public' => $productBatch->is_public,
                    'created_at' => $productBatch->created_at->format('Y-m-d H:i:s'),
                    'files_count' => $productBatch->files->count(),
                    'files' => $productBatch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'filename' => $file->filename,
                            'file_path' => $file->file_path,
                            'url' => $file->url,
                            'file_type' => $file->file_type,
                            'sort_order' => $file->sort_order,
                        ];
                    }),
                    'user' => [
                        'id' => $productBatch->user->id,
                        'name' => $productBatch->user->name,
                        'email' => $productBatch->user->email,
                        'profile_photo_url' => $productBatch->user->image ? $productBatch->user->image : null,
                    ]
                ]
            ], 201);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('Product batch creation failed: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'request_data' => $request->except(['password', 'files']),
                'exception' => $e
            ]);

            return response()->json([
                'success' => false,
                'message' => '商品の登録に失敗しました。しばらく時間をおいて再度お試しください。',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Display the specified product batch.
     */
    public function show(ProductBatch $productBatch): JsonResponse
    {
        // Check if user can view this product batch
        if (!$this->productBatchService->canUserViewProductBatch($productBatch, auth()->user())) {
            return response()->json([
                'success' => false,
                'message' => 'この商品にアクセスする権限がありません。'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $productBatch->load('user:id,name,email')
        ]);
    }

    /**
     * Get product batches for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['is_public', 'display_mode', 'price_min', 'price_max', 'per_page']);
        $productBatches = $this->productBatchService->getUserProductBatches(auth()->user(), $filters);

        return response()->json([
            'success' => true,
            'data' => $productBatches
        ]);
    }

    /**
     * Update the specified product batch.
     */
    public function update(Request $request, ProductBatch $productBatch): JsonResponse
    {
        // Debug: Log that we reached the controller
        // Log::info('ProductBatchController::update method called', [
        //     'product_batch_id' => $productBatch->id,
        //     'user_id' => auth()->id(),
        //     'request_method' => $request->method(),
        //     'request_url' => $request->url(),
        // ]);

        // Check if user owns this product batch
        if (!$this->productBatchService->canUserEditProductBatch($productBatch, auth()->user())) {
            // Log::warning('User does not have permission to edit product batch', [
            //     'product_batch_id' => $productBatch->id,
            //     'user_id' => auth()->id(),
            //     'product_batch_user_id' => $productBatch->user_id,
            // ]);
            return response()->json([
                'success' => false,
                'message' => 'この商品を編集する権限がありません。'
            ], 403);
        }

        // Debug: Log the incoming request data
        // Log::info('Update request data:', $request->all());
        
        try {
            // Validate the request
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'image_cnt' => 'required|integer|min:1|max:10',
                'sales_deadline' => 'nullable|date|after:today',
                'sales_limit' => 'nullable|integer|min:1',
                'price' => 'required|numeric|min:0|max:999999.99',
                'display_mode' => 'required|in:normal,gacha,blur,password,cushion',
                'add_category' => 'required|in:0,1',
                'sn_print' => 'required|in:0,1',
                'sn_format' => 'required_if:sn_print,1|in:number,random',
                'is_public' => 'required|in:0,1',
                'password' => 'required_if:display_mode,password|nullable|string|min:6|max:50',
                'files' => 'nullable|array|max:10',
                'files.*' => 'file|mimes:jpg,jpeg,png,pdf|max:25600',
                'existing_files' => 'nullable|array',
                'existing_files.*' => 'integer|exists:product_batch_files,id',
                'category_ids' => 'nullable|array',
                'category_ids.*' => 'integer|exists:user_categories,id',
            ]);
            
            // Log::info('Validation passed', $validated);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', [
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ]);
            throw $e;
        }
        
        // Calculate total image count (existing + new files)
        $existingFileCount = count($request->input('existing_files', []));
        $newFileCount = $request->hasFile('files') ? count($request->file('files')) : 0;
        $totalImageCount = $existingFileCount + $newFileCount;
        
        // Update the product batch
        $productBatch->update([
            'title' => $request->title,
            'description' => $request->description,
            'image_cnt' => $totalImageCount,
            'sales_deadline' => $request->sales_deadline,
            'sales_limit' => $request->sales_limit,
            'price' => $request->price,
            'display_mode' => $request->display_mode,
            'add_category' => $request->add_category == '1',
            'sn_print' => $request->sn_print == '1',
            'sn_format' => $request->sn_format,
            'is_public' => $request->is_public == '1',
            'password' => $request->password,
        ]);
        
        // Handle file management
        $fileService = app(\App\Services\ProductBatchFileService::class);
        
        // Get existing file IDs that should be kept
        $existingFileIds = $request->input('existing_files', []);
        
        // Delete files that are no longer in the list
        $currentFileIds = $productBatch->files->pluck('id')->toArray();
        $filesToDelete = array_diff($currentFileIds, $existingFileIds);
        
        foreach ($filesToDelete as $fileId) {
            $fileService->deleteFile($fileId);
        }
        
        // Handle new file uploads if any are provided
        if ($request->hasFile('files')) {
            $fileService->uploadFiles($request->file('files'), $productBatch->id);
        }
        
        // Handle category updates
        if ($request->add_category == '1' && !empty($request->category_ids)) {
            $productBatch->categories()->sync($request->category_ids);
        } else {
            // If add_category is false or no categories selected, detach all
            $productBatch->categories()->detach();
        }
        
        return response()->json([
            'success' => true,
            'message' => '商品が更新されました。'
        ]);
    }

    /**
     * Remove the specified product batch.
     */
    public function destroy(ProductBatch $productBatch): JsonResponse
    {
        // Check if user owns this product batch
        if (!$this->productBatchService->canUserDeleteProductBatch($productBatch, auth()->user())) {
            return response()->json([
                'success' => false,
                'message' => 'この商品を削除する権限がありません。'
            ], 403);
        }

        try {
            $success = $this->productBatchService->deleteProductBatch($productBatch);

            if ($success) {
                return response()->json([
                    'success' => true,
                    'message' => '商品が正常に削除されました。'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => '商品の削除に失敗しました。'
                ], 500);
            }

        } catch (\Exception $e) {
            Log::error('Product batch deletion failed: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'product_batch_id' => $productBatch->id,
                'exception' => $e
            ]);

            return response()->json([
                'success' => false,
                'message' => '商品の削除に失敗しました。しばらく時間をおいて再度お試しください。',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
