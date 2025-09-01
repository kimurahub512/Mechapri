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

            // Get the full path to the original image
            $originalFullPath = Storage::disk('public')->path($imagePath);
            
            // Create image manager
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalFullPath);

            // Get image dimensions
            $width = $image->width();
            $height = $image->height();

            // Add simple center watermark
            $this->addCenterWatermark($image, $watermarkText, $width, $height);

            // Save the watermarked image
            $extension = strtolower($pathInfo['extension']);
            if ($extension === 'png') {
                $imageData = $image->toPng();
            } else {
                $imageData = $image->toJpeg(90);
            }

            Storage::disk('public')->put($watermarkedPath, $imageData);

            Log::info('Watermarked image created: ' . $watermarkedPath);
            return $watermarkedPath;

        } catch (\Exception $e) {
            Log::error('Error creating watermarked image: ' . $e->getMessage(), [
                'image_path' => $imagePath,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Add simple center watermark
     */
    private function addCenterWatermark($image, $text, $width, $height)
    {
        // Calculate font size based on image dimensions
        $fontSize = max(24, min($width, $height) / 20);
        
        // Center position
        $centerX = $width / 2;
        $centerY = $height / 2;
        
        // Create a temporary canvas for the rotated text
        $manager = new ImageManager(new Driver());
        $textCanvas = $manager->create($width, $height);
        
        // Add text to the canvas
        $textCanvas->text($text, $centerX, $centerY, function ($font) use ($fontSize) {
            $font->size($fontSize);
            $font->color('rgba(255, 255, 255, 0.8)'); // Semi-transparent white
            $font->align('center');
            $font->valign('middle');
        });
        
        // Rotate the text canvas
        $textCanvas->rotate(45);
        
        // Composite the rotated text onto the original image
        $image->place($textCanvas, 0, 0);
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
