<?php

namespace App\Services;

use App\Models\ProductBatch;
use App\Models\ProductBatchFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class ProductBatchFileService
{
    /**
     * Upload files for a product batch.
     */
    public function uploadFiles(ProductBatch $productBatch, array $files): array
    {
        $uploadedFiles = [];
        $userDir = "product-batches/user_{$productBatch->user_id}/batch_{$productBatch->id}";

        // Create directory if it doesn't exist
        if (!Storage::disk('public')->exists($userDir)) {
            Storage::disk('public')->makeDirectory($userDir);
        }

        foreach ($files as $index => $file) {
            if (!$file instanceof UploadedFile) {
                continue;
            }

            $uploadedFile = $this->processFile($file, $userDir, $productBatch, $index);
            if ($uploadedFile) {
                $uploadedFiles[] = $uploadedFile;
            }
        }

        return $uploadedFiles;
    }

    /**
     * Process a single file upload.
     */
    private function processFile(UploadedFile $file, string $userDir, ProductBatch $productBatch, int $sortOrder): ?ProductBatchFile
    {
        try {
            $extension = strtolower($file->getClientOriginalExtension());
            $filename = uniqid('file_') . '.' . $extension;
            $path = $userDir . '/' . $filename;

            // Validate file type
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'pdf'])) {
                Log::warning('Invalid file type uploaded: ' . $extension);
                return null;
            }

            // Process based on file type
            if (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                $this->processImage($file, $path, $extension);
            } elseif ($extension === 'pdf') {
                Storage::disk('public')->putFileAs($userDir, $file, $filename);
            }

            // Create database record
            return ProductBatchFile::create([
                'product_batch_id' => $productBatch->id,
                'filename' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'file_type' => $extension === 'pdf' ? 'pdf' : 'image',
                'file_size' => $file->getSize(),
                'sort_order' => $sortOrder,
            ]);
        } catch (\Exception $e) {
            Log::error('File processing failed: ' . $e->getMessage(), [
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'product_batch_id' => $productBatch->id,
            ]);
            return null;
        }
    }

    /**
     * Process image file with optimization.
     */
    private function processImage(UploadedFile $file, string $path, string $extension): void
    {
        try {
            $manager = new ImageManager(\Intervention\Image\Drivers\Gd\Driver::class);
            $img = $manager->read($file->getRealPath());
            
            // Get original dimensions
            $width = $img->width();
            $height = $img->height();
            
            // Only resize if image is larger than 2L size
            if ($width > 1500 || $height > 2100) {
                $img = $img->resize(1500, 2100, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize(false); // Prevent upscaling
                });
            }
            
            if ($extension === 'png') {
                Storage::disk('public')->put($path, (string) $img->toPng()); // lossless
            } else {
                $jpegData = $img->toJpeg(90); // 90% quality
                Storage::disk('public')->put($path, (string) $jpegData);
            }

            // Optimize if optimizer is available
            $fullPath = Storage::disk('public')->path($path);
            if (class_exists(\Spatie\ImageOptimizer\OptimizerChainFactory::class)) {
                $optimizerChain = \Spatie\ImageOptimizer\OptimizerChainFactory::create();
                $optimizerChain->optimize($fullPath);
            }
        } catch (\Exception $e) {
            // If image processing fails, store the original file
            Log::warning('Image processing failed, storing original file: ' . $e->getMessage());
            Storage::disk('public')->putFileAs(dirname($path), $file, basename($path));
        }
    }

    /**
     * Delete a file from storage and database.
     */
    public function deleteFile(ProductBatchFile $file): bool
    {
        try {
            // Delete from storage
            if (Storage::disk('public')->exists($file->file_path)) {
                Storage::disk('public')->delete($file->file_path);
            }

            // Delete from database
            $file->delete();

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete file: ' . $e->getMessage(), [
                'file_id' => $file->id,
                'file_path' => $file->file_path,
            ]);

            return false;
        }
    }

    /**
     * Delete all files for a product batch.
     */
    public function deleteBatchFiles(ProductBatch $productBatch): bool
    {
        try {
            $files = $productBatch->files;

            foreach ($files as $file) {
                if (Storage::disk('public')->exists($file->file_path)) {
                    Storage::disk('public')->delete($file->file_path);
                }
            }

            // Delete directory if empty
            $userDir = "product-batches/user_{$productBatch->user_id}/batch_{$productBatch->id}";
            if (Storage::disk('public')->exists($userDir)) {
                Storage::disk('public')->deleteDirectory($userDir);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete batch files: ' . $e->getMessage(), [
                'product_batch_id' => $productBatch->id,
            ]);

            return false;
        }
    }

    /**
     * Reorder files for a product batch.
     */
    public function reorderFiles(ProductBatch $productBatch, array $fileIds): bool
    {
        try {
            foreach ($fileIds as $index => $fileId) {
                ProductBatchFile::where('id', $fileId)
                    ->where('product_batch_id', $productBatch->id)
                    ->update(['sort_order' => $index]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to reorder files: ' . $e->getMessage(), [
                'product_batch_id' => $productBatch->id,
                'file_ids' => $fileIds,
            ]);

            return false;
        }
    }

    /**
     * Get storage statistics for a user.
     */
    public function getUserStorageStats(int $userId): array
    {
        $userBatches = ProductBatch::where('user_id', $userId)->with('files')->get();
        
        $totalFiles = 0;
        $totalSize = 0;
        $fileTypes = [];

        foreach ($userBatches as $batch) {
            foreach ($batch->files as $file) {
                $totalFiles++;
                $totalSize += $file->file_size;
                $fileTypes[$file->file_type] = ($fileTypes[$file->file_type] ?? 0) + 1;
            }
        }

        return [
            'total_files' => $totalFiles,
            'total_size' => $totalSize,
            'total_size_human' => $this->formatBytes($totalSize),
            'file_types' => $fileTypes,
        ];
    }

    /**
     * Format bytes to human readable format.
     */
    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
