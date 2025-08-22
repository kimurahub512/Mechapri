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
    public function createWatermarkedImage($imagePath, $watermarkText = 'Mechapri')
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

            // Create watermark text
            // Add watermarks - only the main Mechapri text, no PROTECTED text
            $this->addTextWatermark($image, $watermarkText, $width, $height);

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
     * Add text watermark to the image - matching the original overlay exactly
     */
    private function addTextWatermark($image, $text, $width, $height)
    {
        // Use Japanese text "めちゃプリ" to match the original overlay
        $japaneseText = 'めちゃプリ';
        
        // Calculate font size for the central overlay text
        $fontSize = max(24, min($width, $height) / 20);
        
        // Add diagonal logo pattern across the image (like the original overlay)
        // The original has multiple rows at different positions: top-[50%], top-[70%], top-[90%]
        $logoSpacing = $width / 8; // Spacing between logos
        
        // First diagonal row (top-[50%] equivalent)
        $y1 = $height * 0.5;
        for ($x = -$width * 0.2; $x < $width * 1.2; $x += $logoSpacing) {
            $image->text($japaneseText, $x, $y1, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.6)'); // Semi-transparent white
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Second diagonal row (top-[70%] equivalent)
        $y2 = $height * 0.7;
        for ($x = -$width * 0.3; $x < $width * 1.3; $x += $logoSpacing) {
            $image->text($japaneseText, $x, $y2, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.6)'); // Semi-transparent white
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Third diagonal row (top-[90%] equivalent)
        $y3 = $height * 0.9;
        for ($x = -$width * 0.4; $x < $width * 1.4; $x += $logoSpacing) {
            $image->text($japaneseText, $x, $y3, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.6)'); // Semi-transparent white
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Add central overlay text (like the original bg-black bg-opacity-30)
        $centerX = $width / 2;
        $centerY = $height / 2;
        
        // Add the central text with larger size for better visibility
        $centerFontSize = max(32, min($width, $height) / 15);
        $image->text($japaneseText, $centerX, $centerY, function ($font) use ($centerFontSize) {
            $font->size($centerFontSize);
            $font->color('rgba(255, 255, 255, 1.0)'); // Solid white for central text
            $font->align('center');
            $font->valign('middle');
        });
    }

    /**
     * Add diagonal watermark pattern
     */
    private function addDiagonalWatermarks($image, $width, $height)
    {
        // Create diagonal watermark pattern with "PROTECTED" text
        $diagonalText = 'PROTECTED';
        $fontSize = max(16, min($width, $height) / 40);
        
        // Calculate spacing
        $spacing = $fontSize * 10;
        
        // Add diagonal watermarks across the image
        for ($y = -$height; $y < $height * 2; $y += $spacing) {
            for ($x = -$width; $x < $width * 2; $x += $spacing) {
                $image->text($diagonalText, $x, $y, function ($font) use ($fontSize) {
                    $font->size($fontSize);
                    $font->color('rgba(255, 255, 255, 0.3)'); // Subtle white
                    $font->angle(45);
                });
            }
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
        // Use the actual server IP instead of localhost
        $encodedPath = urlencode($originalPath);
        return 'http://172.16.5.41:8000/api/watermarked-image/' . $encodedPath;
    }

    /**
     * Create a watermarked image path (for compatibility with existing code)
     */
    public function addWatermark($imagePath, $watermarkText = 'Mechapri')
    {
        return $this->createWatermarkedImage($imagePath, $watermarkText);
    }
}
