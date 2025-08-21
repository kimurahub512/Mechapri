<?php

namespace App\Services;

use App\Models\ProductBatch;
use App\Models\User;
use App\Services\ProductBatchFileService;
use App\Services\NotificationService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class ProductBatchService
{
    protected ProductBatchFileService $fileService;

    public function __construct(ProductBatchFileService $fileService)
    {
        $this->fileService = $fileService;
    }

    /**
     * Create a new product batch.
     */
    public function create(array $data, User $user, array $files = []): ProductBatch
    {
        return DB::transaction(function () use ($data, $user, $files) {
            // Validate business rules
            $this->validateBusinessRules($data);

            // Generate serial number based on format
            $sn = $this->generateSerialNumber($data['sn_format'] ?? 'number');
            
            // Create the product batch
            $productBatch = ProductBatch::create([
                'user_id' => $user->id,
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'image_cnt' => $data['image_cnt'],
                'sales_deadline' => $data['sales_deadline'] ?? null,
                'sales_limit' => $data['sales_limit'] ?? null,
                'price' => $data['price'],
                'display_mode' => $data['display_mode'],
                'add_category' => $data['add_category'],
                'sn_print' => $data['sn_print'],
                'sn_format' => $data['sn_format'] ?? 'number',
                'sn' => $sn,
                'is_public' => $data['is_public'],
                'password' => isset($data['password']) ? Hash::make($data['password']) : null,
            ]);

            // Upload files if provided
            if (!empty($files)) {
                $uploadedFiles = $this->fileService->uploadFiles($productBatch, $files);
                
                // Update image count based on actual uploaded files
                $actualImageCount = count($uploadedFiles);
                $productBatch->update(['image_cnt' => $actualImageCount]);
            }

            // Handle category assignment if add_category is true
            $categoriesAssigned = 0;
            if ($data['add_category'] && !empty($data['category_ids'])) {
                $categoryIds = is_string($data['category_ids']) ? json_decode($data['category_ids'], true) : $data['category_ids'];
                if (is_array($categoryIds)) {
                    $productBatch->categories()->attach($categoryIds);
                    $categoriesAssigned = count($categoryIds);
                }
            }

            // Log the creation
            \Illuminate\Support\Facades\Log::info('Product batch created', [
                'user_id' => $user->id,
                'product_batch_id' => $productBatch->id,
                'title' => $productBatch->title,
                'price' => $productBatch->price,
                'is_public' => $productBatch->is_public,
                'files_uploaded' => count($files),
                'categories_assigned' => $categoriesAssigned,
            ]);

            // Create new item notifications for followers if product is public
            if ($productBatch->is_public) {
                try {
                    NotificationService::createNewItemNotification($user, $productBatch);
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Failed to create new item notification: ' . $e->getMessage());
                }
            }

            return $productBatch->load(['files', 'categories']);
        });
    }

    /**
     * Validate business rules for product batch creation.
     */
    private function validateBusinessRules(array $data): void
    {
        // Check if user has permission to create paid products
        if ($data['price'] > 0) {
            // TODO: Add premium user validation if needed
            // For now, all authenticated users can create paid products
        }

        // Validate password is provided when display_mode is password
        if ($data['display_mode'] === 'password' && empty($data['password'])) {
            throw new \InvalidArgumentException('パスワード設定を選択した場合、パスワードを入力してください。');
        }

        // Validate sn_format is provided when sn_print is true
        if ($data['sn_print'] && empty($data['sn_format'])) {
            throw new \InvalidArgumentException('シリアル番号印字を選択した場合、印字形式を選択してください。');
        }

        // Validate sales deadline is in the future
        if (!empty($data['sales_deadline'])) {
            $deadline = \Carbon\Carbon::parse($data['sales_deadline']);
            if ($deadline->isPast()) {
                throw new \InvalidArgumentException('販売期限は今日以降の日付を選択してください。');
            }
        }

        // Validate sales limit is positive if provided
        if (!empty($data['sales_limit']) && $data['sales_limit'] <= 0) {
            throw new \InvalidArgumentException('販売数は1以上を入力してください。');
        }
    }

    /**
     * Get product batches for a user with optional filters.
     */
    public function getUserProductBatches(User $user, array $filters = []): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $query = $user->productBatches();

        // Apply filters
        if (isset($filters['is_public'])) {
            $query->where('is_public', $filters['is_public']);
        }

        if (isset($filters['display_mode'])) {
            $query->where('display_mode', $filters['display_mode']);
        }

        if (isset($filters['price_min'])) {
            $query->where('price', '>=', $filters['price_min']);
        }

        if (isset($filters['price_max'])) {
            $query->where('price', '<=', $filters['price_max']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 10);
    }

    /**
     * Check if a user can view a product batch.
     */
    public function canUserViewProductBatch(ProductBatch $productBatch, User $user): bool
    {
        // Public products can be viewed by anyone
        if ($productBatch->is_public) {
            return true;
        }

        // Private products can only be viewed by the owner
        return $productBatch->user_id === $user->id;
    }

    /**
     * Check if a user can edit a product batch.
     */
    public function canUserEditProductBatch(ProductBatch $productBatch, User $user): bool
    {
        return $productBatch->user_id === $user->id;
    }

    /**
     * Check if a user can delete a product batch.
     */
    public function canUserDeleteProductBatch(ProductBatch $productBatch, User $user): bool
    {
        return $productBatch->user_id === $user->id;
    }

    /**
     * Delete a product batch and all its files.
     */
    public function deleteProductBatch(ProductBatch $productBatch): bool
    {
        return DB::transaction(function () use ($productBatch) {
            try {
                // Delete all files first
                $this->fileService->deleteBatchFiles($productBatch);
                
                // Delete the product batch
                $productBatch->delete();
                
                \Illuminate\Support\Facades\Log::info('Product batch deleted', [
                    'product_batch_id' => $productBatch->id,
                    'user_id' => $productBatch->user_id,
                ]);
                
                return true;
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Failed to delete product batch: ' . $e->getMessage(), [
                    'product_batch_id' => $productBatch->id,
                    'exception' => $e,
                ]);
                
                return false;
            }
        });
    }

    /**
     * Generate a serial number based on the format.
     */
    private function generateSerialNumber(string $format): string
    {
        if ($format === 'random') {
            // Generate 6-character random alphanumeric string
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            $sn = '';
            for ($i = 0; $i < 6; $i++) {
                $sn .= $characters[rand(0, strlen($characters) - 1)];
            }
            return $sn;
        } else {
            // Generate sequential number based on total product batches
            $count = ProductBatch::count();
            return str_pad($count + 1, 6, '0', STR_PAD_LEFT);
        }
    }
}
