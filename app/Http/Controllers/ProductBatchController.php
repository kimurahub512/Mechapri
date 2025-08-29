<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductBatchRequest;

use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;
use App\Services\ProductBatchService;
use App\Services\NWPSService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProductBatchController extends Controller
{
    protected ProductBatchService $productBatchService;
    protected NWPSService $nwpsService;

    public function __construct(ProductBatchService $productBatchService, NWPSService $nwpsService)
    {
        $this->productBatchService = $productBatchService;
        $this->nwpsService = $nwpsService;
    }

    /**
     * Get printed count from NWPS for a product
     */
    private function getPrintedCount($product, $purchase = null)
    {
        try {
            // For purchased products, use the purchase record's NWPS data
            if ($purchase && $purchase->nwps_token && $purchase->nwps_file_id) {
                $fileInfo = $this->nwpsService->getFileInfo($purchase->nwps_token, $purchase->nwps_file_id);
                if (isset($fileInfo['status']['printed_count'])) {
                    return (int)$fileInfo['status']['printed_count'];
                }
            }
            
            // For free products, use the product's NWPS data
            if ($product->nwps_token && $product->nwps_file_id) {
                $fileInfo = $this->nwpsService->getFileInfo($product->nwps_token, $product->nwps_file_id);
                if (isset($fileInfo['status']['printed_count'])) {
                    return (int)$fileInfo['status']['printed_count'];
                }
            }
            
            return 0;
        } catch (\Exception $e) {
            Log::error('Failed to fetch printed count from NWPS', [
                'product_id' => $product->id,
                'purchase_id' => $purchase ? $purchase->id : null,
                'error' => $e->getMessage()
            ]);
            return 0;
        }
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

            // If this is a free product, trigger NWPS processing immediately
            if ($productBatch->price == 0) {
                \App\Jobs\ProcessFreeProductNWPSJob::dispatch($productBatch->id);
            }

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
            \Illuminate\Support\Facades\Log::error('Product batch creation failed: ' . $e->getMessage(), [
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
            \Illuminate\Support\Facades\Log::error('Validation failed', [
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
            'password' => $request->password ? Hash::make($request->password) : $productBatch->password,
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
            \Illuminate\Support\Facades\Log::error('Product batch deletion failed: ' . $e->getMessage(), [
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

    /**
     * Show the purchased product page.
     */
    public function showPurchased(Request $request, $id)
    {
        // Get the last segment of the path as the product ID
        $segments = explode('/', trim($request->path(), '/'));
        $productId = end($segments);

        \Illuminate\Support\Facades\Log::info('Showing purchased product', [
            'segments' => $segments,
            'product_id' => $productId,
            'user_id' => $request->route('user_id'),
            'url' => $request->url(),
            'full_url' => $request->fullUrl(),
            'path' => $request->path(),
            'auth_user_id' => auth()->id()
        ]);

        // Find the product
        $product = ProductBatch::with(['user', 'files' => function($query) {
            $query->orderBy('sort_order');
        }])->findOrFail($productId);

        // If this is a direct route (no user_id) and the product isn't owned by the current user,
        // redirect to the user-scoped route
        $userId = $request->route('user_id');
        if (!$userId && $product->user_id !== auth()->id()) {
            return redirect()->route('user.product.purchased', [
                'user_id' => $product->user_id,
                'id' => $product->id
            ]);
        }

        // Check if the product is free or purchased by the user
        $isFree = $product->price == 0;
        $isPurchased = $product->isPurchasedBy(auth()->user());

        if (!$isFree && !$isPurchased) {
            // If we're on a user-scoped route, redirect to user-scoped unpurchased
            $userId = $request->route('user_id');
            if ($userId) {
                return redirect()->route('user.product.unpurchased', [
                    'user_id' => $userId,
                    'id' => $product->id
                ]);
            }
            // Otherwise, redirect to direct unpurchased
            return redirect()->route('product.unpurchased', ['id' => $product->id]);
        }

        // Get the purchase record for this user and product to include NWPS data
        $purchase = UserPurchasedProduct::where('user_id', auth()->id())
            ->where('batch_id', $product->id)
            ->first();

        // Get printed count from NWPS
        $printedCount = $this->getPrintedCount($product, $purchase);

        return Inertia::render('PurchasedProduct', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'sales_deadline' => $product->sales_deadline ? $product->sales_deadline->format('Y/m/d') : null,
                'description' => $product->description,
                'price' => $product->price,
                'display_mode' => $product->display_mode,
                'image' => $product->getWatermarkedImageUrl(auth()->user()),
                'images' => collect($product->getWatermarkedImages(auth()->user()))->pluck('url'),
                'user' => [
                    'id' => $product->user->id,
                    'name' => $product->user->name,
                    'image' => $product->user->image,
                    'description' => $product->user->shop_description,
                    'is_followed_by_current_user' => auth()->user()->hasFavoritedShop($product->user->id),
                ],
                'created_at' => $product->created_at,
                'is_favorited' => $product->isFavoritedBy(auth()->user()),
                'favorite_count' => $product->favorite_count,
                'print_deadline' => now()->addDays(30)->format('Y/m/d'),
                // NWPS data - prioritize purchase record over product batch for free products
                'nwps_qr_code_url' => $purchase ? $purchase->nwps_qr_code_url : $product->nwps_qr_code_url,
                'nwps_user_code' => $purchase ? $purchase->nwps_user_code : $product->nwps_user_code,
                'nwps_upload_status' => $purchase ? $purchase->nwps_upload_status : null,
                'top_buyers' => UserPurchasedProduct::getTopBuyersForProduct($product->id)->map(function($purchase) {
                    return [
                        'user' => [
                            'id' => $purchase->user->id,
                            'name' => $purchase->user->name,
                            'image' => $purchase->user->image,
                        ],
                        'total_quantity' => $purchase->total_quantity,
                    ];
                }),
            ]
        ]);
    }

    /**
     * Show the unpurchased product page.
     */
    public function showUnpurchased(Request $request, $id)
    {
        // Get the last segment of the path as the product ID
        $segments = explode('/', trim($request->path(), '/'));
        $productId = end($segments);

        \Illuminate\Support\Facades\Log::info('Showing unpurchased product', [
            'segments' => $segments,
            'product_id' => $productId,
            'user_id' => $request->route('user_id'),
            'url' => $request->url(),
            'full_url' => $request->fullUrl(),
            'path' => $request->path(),
            'auth_user_id' => auth()->id()
        ]);

        // Find the product
        $product = ProductBatch::with(['user', 'files' => function($query) {
            $query->orderBy('sort_order');
        }])->findOrFail($productId);

        // If this is a direct route (no user_id) and the product isn't owned by the current user,
        // redirect to the user-scoped route
        $userId = $request->route('user_id');
        if (!$userId && $product->user_id !== auth()->id()) {
            return redirect()->route('user.product.unpurchased', [
                'user_id' => $product->user_id,
                'id' => $product->id
            ]);
        }

        // Check if the product is free or purchased by the user
        $isFree = $product->price == 0;
        $isPurchased = $product->isPurchasedBy(auth()->user());

        if ($isFree || $isPurchased) {
            // If we're on a user-scoped route, redirect to user-scoped purchased
            $userId = $request->route('user_id');
            if ($userId) {
                return redirect()->route('user.product.purchased', [
                    'user_id' => $userId,
                    'id' => $product->id
                ]);
            }
            // Otherwise, redirect to direct purchased
            return redirect()->route('product.purchased', ['id' => $product->id]);
        }

        // Get printed count from NWPS for unpurchased products
        $printedCount = $this->getPrintedCount($product);

        return Inertia::render('UnpurchasedProduct', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'sales_deadline' => $product->sales_deadline ? $product->sales_deadline->format('Y/m/d') : null,
                'price' => $product->price,
                'display_mode' => $product->display_mode,
                'image' => $product->getWatermarkedImageUrl(auth()->user()),
                'images' => collect($product->getWatermarkedImages(auth()->user()))->pluck('url'),
                'user' => [
                    'id' => $product->user->id,
                    'name' => $product->user->name,
                    'image' => $product->user->image,
                    'description' => $product->user->shop_description,
                    'is_followed_by_current_user' => auth()->user()->hasFavoritedShop($product->user->id),
                ],
                'created_at' => $product->created_at,
                'is_favorited' => $product->isFavoritedBy(auth()->user()),
                'favorite_count' => $product->favorite_count,
                'print_deadline' => now()->addDays(30)->format('Y/m/d'),
                'printed_count' => $printedCount,
                'top_buyers' => UserPurchasedProduct::getTopBuyersForProduct($product->id)->map(function($purchase) {
                    return [
                        'user' => [
                            'id' => $purchase->user->id,
                            'name' => $purchase->user->name,
                            'image' => $purchase->user->image,
                        ],
                        'total_quantity' => $purchase->total_quantity,
                    ];
                }),
            ]
        ]);
    }

    /**
     * Show the purchased product expand page.
     */
    public function showPurchasedExpand(Request $request, $id)
    {
        // Get the last segment of the path as the product ID
        $segments = explode('/', trim($request->path(), '/'));
        $productId = end($segments);

        \Illuminate\Support\Facades\Log::info('Showing purchased product expand', [
            'segments' => $segments,
            'product_id' => $productId,
            'user_id' => $request->route('user_id'),
            'url' => $request->url(),
            'full_url' => $request->fullUrl(),
            'path' => $request->path(),
            'auth_user_id' => auth()->id()
        ]);

        // Find the product
        $product = ProductBatch::with(['user', 'files' => function($query) {
            $query->orderBy('sort_order');
        }])->findOrFail($productId);

        // If this is a direct route (no user_id) and the product isn't owned by the current user,
        // redirect to the user-scoped route
        $userId = $request->route('user_id');
        if (!$userId && $product->user_id !== auth()->id()) {
            return redirect()->route('user.product.purchased.expand', [
                'user_id' => $product->user_id,
                'id' => $product->id
            ]);
        }

        // Check if the product is free or purchased by the user
        $isFree = $product->price == 0;
        $isPurchased = $product->isPurchasedBy(auth()->user());

        if (!$isFree && !$isPurchased) {
            // If we're on a user-scoped route, redirect to user-scoped unpurchased
            $userId = $request->route('user_id');
            if ($userId) {
                return redirect()->route('user.product.unpurchased.expand', [
                    'user_id' => $userId,
                    'id' => $product->id
                ]);
            }
            // Otherwise, redirect to direct unpurchased
            return redirect()->route('product.unpurchased.expand', ['id' => $product->id]);
        }

        // Get the purchase record for this user and product to include NWPS data
        $purchase = UserPurchasedProduct::where('user_id', auth()->id())
            ->where('batch_id', $product->id)
            ->first();

        // Get printed count from NWPS
        $printedCount = $this->getPrintedCount($product, $purchase);

        return Inertia::render('PurchasedProductExpand', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'price' => $product->price,
                'display_mode' => $product->display_mode,
                'image' => $product->getWatermarkedImageUrl(auth()->user()),
                'images' => collect($product->getWatermarkedImages(auth()->user()))->pluck('url'),
                'user' => [
                    'id' => $product->user->id,
                    'name' => $product->user->name,
                    'image' => $product->user->image,
                    'description' => $product->user->shop_description,
                    'is_followed_by_current_user' => auth()->user()->hasFavoritedShop($product->user->id),
                ],
                'created_at' => $product->created_at,
                'is_favorited' => $product->isFavoritedBy(auth()->user()),
                'favorite_count' => $product->favorite_count,
                'print_deadline' => now()->addDays(30)->format('Y/m/d'),
                // NWPS data - prioritize purchase record over product batch for free products
                'nwps_qr_code_url' => $purchase ? $purchase->nwps_qr_code_url : $product->nwps_qr_code_url,
                'nwps_user_code' => $purchase ? $purchase->nwps_user_code : $product->nwps_user_code,
                'nwps_upload_status' => $purchase ? $purchase->nwps_upload_status : null,
                'top_buyers' => UserPurchasedProduct::getTopBuyersForProduct($product->id)->map(function($purchase) {
                    return [
                        'user' => [
                            'id' => $purchase->user->id,
                            'name' => $purchase->user->name,
                            'image' => $purchase->user->image,
                        ],
                        'total_quantity' => $purchase->total_quantity,
                    ];
                }),
            ]
        ]);
    }

    /**
     * Show the unpurchased product expand page.
     */
    public function showUnpurchasedExpand(Request $request, $id)
    {
        // Get the last segment of the path as the product ID
        $segments = explode('/', trim($request->path(), '/'));
        $productId = end($segments);

        \Illuminate\Support\Facades\Log::info('Showing unpurchased product expand', [
            'segments' => $segments,
            'product_id' => $productId,
            'user_id' => $request->route('user_id'),
            'url' => $request->url(),
            'full_url' => $request->fullUrl(),
            'path' => $request->path(),
            'auth_user_id' => auth()->id()
        ]);

        // Find the product
        $product = ProductBatch::with(['user', 'files' => function($query) {
            $query->orderBy('sort_order');
        }])->findOrFail($productId);

        // If this is a direct route (no user_id) and the product isn't owned by the current user,
        // redirect to the user-scoped route
        $userId = $request->route('user_id');
        if (!$userId && $product->user_id !== auth()->id()) {
            return redirect()->route('user.product.unpurchased.expand', [
                'user_id' => $product->user_id,
                'id' => $product->id
            ]);
        }

        // Check if the product is free or purchased by the user
        $isFree = $product->price == 0;
        $isPurchased = $product->isPurchasedBy(auth()->user());

        if ($isFree || $isPurchased) {
            // If we're on a user-scoped route, redirect to user-scoped purchased
            $userId = $request->route('user_id');
            if ($userId) {
                return redirect()->route('user.product.purchased.expand', [
                    'user_id' => $userId,
                    'id' => $product->id
                ]);
            }
            // Otherwise, redirect to direct purchased
            return redirect()->route('product.purchased.expand', ['id' => $product->id]);
        }

        // Get printed count from NWPS for unpurchased products
        $printedCount = $this->getPrintedCount($product);

        return Inertia::render('UnpurchasedProductExpand', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'price' => $product->price,
                'sales_limit' => $product->sales_limit,
                'sales_deadline' => $product->sales_deadline ? $product->sales_deadline->format('Y/m/d') : null,
                'display_mode' => $product->display_mode,
                'image' => $product->getWatermarkedImageUrl(auth()->user()),
                'images' => collect($product->getWatermarkedImages(auth()->user()))->pluck('url'),
                'user' => [
                    'id' => $product->user->id,
                    'name' => $product->user->name,
                    'image' => $product->user->image,
                    'description' => $product->user->shop_description,
                    'is_followed_by_current_user' => auth()->user()->hasFavoritedShop($product->user->id),
                ],
                'created_at' => $product->created_at,
                'is_favorited' => $product->isFavoritedBy(auth()->user()),
                'favorite_count' => $product->favorite_count,
                'print_deadline' => now()->addDays(30)->format('Y/m/d'),
                'printed_count' => $printedCount,
                'top_buyers' => UserPurchasedProduct::getTopBuyersForProduct($product->id)->map(function($purchase) {
                    return [
                        'user' => [
                            'id' => $purchase->user->id,
                            'name' => $purchase->user->name,
                            'image' => $purchase->user->image,
                        ],
                        'total_quantity' => $purchase->total_quantity,
                    ];
                }),
            ]
        ]);
    }
}
