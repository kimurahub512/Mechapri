<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageWatermarkService
{
    /**
     * Create a watermarked image file and return the path
     */
    public function createWatermarkedImage($imagePath, $watermarkText = 'Mechari')
    {
        try {
            // Check if original image exists
            if (!Storage::disk('public')->exists($imagePath)) {
                Log::error('Original image not found: ' . $imagePath);
                return null;
            }

            // Generate watermarked file path
            $pathInfo = pathinfo($imagePath);
            $watermarkedPath = $pathInfo['dirname'] . '/watermarked_' . $pathInfo['basename'];

            // Check if watermarked version already exists
            if (Storage::disk('public')->exists($watermarkedPath)) {
                return $watermarkedPath;
            }

            // Get the full path to the original image and normalize it
            $originalFullPath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, Storage::disk('public')->path($imagePath));
            
            // Check if file is readable
            if (!is_readable($originalFullPath)) {
                Log::error('Original image file is not readable: ' . $originalFullPath);
                return null;
            }
            
            // Check file size
            $fileSize = filesize($originalFullPath);
            if ($fileSize === false || $fileSize === 0) {
                Log::error('Original image file is empty or unreadable: ' . $originalFullPath);
                return null;
            }
            
            // Check image type first
            $imageInfo = getimagesize($originalFullPath);
            if ($imageInfo === false) {
                Log::error('Invalid image file - getimagesize failed: ' . $originalFullPath);
                return null;
            }      
            
                        // Try to create a new image from the existing one using PHP's built-in functions
            $image = null;
            $lastError = null;
            
            try {
                // First try Intervention Image directly
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalFullPath);
            } catch (\Exception $e) {
                $lastError = $e->getMessage();
                Log::warning('Failed to read with Intervention Image: ' . $e->getMessage());
                
                // Try using PHP's built-in imagecreatefromjpeg and then convert to Intervention Image
                try {
                    $gdImage = imagecreatefromjpeg($originalFullPath);
                    if ($gdImage === false) {
                        throw new \Exception('imagecreatefromjpeg failed');
                    }
                    
                    // Create a temporary file with the GD image
                    $tempPath = storage_path('app/temp_' . uniqid() . '.jpg');
                    imagejpeg($gdImage, $tempPath, 90);
                    imagedestroy($gdImage);
                    
                    // Now try to read with Intervention Image
                    $manager = new ImageManager(new Driver());
                    $image = $manager->read($tempPath);
                    
                    // Clean up temp file
                    unlink($tempPath);                    
                } catch (\Exception $e2) {
                    $lastError = $e2->getMessage();
                    Log::error('Failed to read image with PHP GD functions: ' . $e2->getMessage());
                }
            }
            
            if ($image === null) {
                throw new \Exception('Could not read image with any method. Last error: ' . $lastError);
            }

            // Get image dimensions
            $width = $image->width();
            $height = $image->height();

            // Add simple center watermark
            try {
                $this->addCenterWatermark($image, $watermarkText, $width, $height);
            } catch (\Exception $e) {
                Log::error('Error adding watermark: ' . $e->getMessage());
                throw $e;
            }

            // Save the watermarked image
            $extension = strtolower($pathInfo['extension']);
            if ($extension === 'png') {
                $imageData = $image->toPng();
            } else {
                $imageData = $image->toJpeg(90);
            }

            Storage::disk('public')->put($watermarkedPath, $imageData);

            return $watermarkedPath;

        } catch (\Exception $e) {
            Log::error('Error creating watermarked image: ' . $e->getMessage(), [
                'image_path' => $imagePath,
                'original_full_path' => $originalFullPath ?? 'not set',
                'file_exists' => isset($originalFullPath) ? file_exists($originalFullPath) : 'unknown',
                'is_readable' => isset($originalFullPath) ? is_readable($originalFullPath) : 'unknown',
                'file_size' => isset($originalFullPath) ? filesize($originalFullPath) : 'unknown',
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Add SVG watermark
     */
    private function addCenterWatermark($image, $text, $width, $height)
    {
        // Calculate watermark size based on image dimensions (about 1/4 of the smaller dimension)
        $watermarkSize = min($width, $height) / 4;
        $watermarkWidth = $watermarkSize;
        $watermarkHeight = ($watermarkSize * 96) / 141; // Maintain aspect ratio
        
        
        // Center position
        $centerX = ($width - $watermarkWidth) / 2;
        $centerY = ($height - $watermarkHeight) / 2;
        
        
        // Use the existing PNG logo file
        
        $logoPath = resource_path('js/assets/images/logo_white.png');
        
        if (!file_exists($logoPath)) {
            throw new \Exception('Logo file not found: ' . $logoPath);
        }
        
        try {
            // Read the PNG logo file with Intervention Image
            $manager = new ImageManager(new Driver());
            $watermark = $manager->read($logoPath);
            
            
            // Resize watermark
            $watermark->resize($watermarkWidth, $watermarkHeight);
            
            
            // Place watermark on the image
            $image->place($watermark, $centerX, $centerY);
            
            
        } catch (\Exception $e) {
            Log::error('Failed to use PNG logo: ' . $e->getMessage());
            
            // Fallback: Create a simple white rectangle with "Mechari" text
            Log::info('Using fallback text watermark');
            $manager = new ImageManager(new Driver());
            $watermark = $manager->create($watermarkWidth, $watermarkHeight, 'rgba(255, 255, 255, 0.8)');
            
            // Add text to the watermark
            $fontSize = min($watermarkWidth, $watermarkHeight) / 4;
            $watermark->text('Mechari', $watermarkWidth / 2, $watermarkHeight / 2, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(0, 0, 0, 0.8)');
                $font->align('center');
                $font->valign('middle');
            });
            
            // Place watermark on the image
            $image->place($watermark, $centerX, $centerY);
            
            Log::info('Fallback watermark process completed');
        }
    }

    /**
     * Get watermarked image URL for unpurchased products
     */
    public function getWatermarkedImageUrl($originalPath, $isPurchased = false)
    {
        // If purchased, return original image
        if ($isPurchased) {
            return Storage::url($originalPath);
        }

        // For unpurchased products, return the watermark route URL
        // Use base64 encoding to avoid web server issues with URL-encoded paths
        $base64Path = base64_encode($originalPath);
        return url('/api/watermarked-image-b64/' . $base64Path);
    }

    /**
     * Create a watermarked image path (for compatibility with existing code)
     */
    public function addWatermark($imagePath, $watermarkText = 'Mechari')
    {
        return $this->createWatermarkedImage($imagePath, $watermarkText);
    }
}
