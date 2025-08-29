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

            // Try SVG-based watermarking first, fall back to text if it fails
            $svgSuccess = $this->addSvgWatermark($image, $width, $height);
            
            // if (!$svgSuccess) {
            //     // Fall back to text watermarking
            //     $this->addTextWatermark($image, $watermarkText, $width, $height);
            // }

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
        // Use Japanese text "めちゃプリ" with SVG-based approach
        $watermarkText = 'めちゃプリ';
        
        // Calculate MUCH larger font size for the diagonal watermark text
        $fontSize = max(80, min($width, $height) / 8); // Much larger base size
        
        // Add diagonal logo pattern across the image (like the original overlay)
        // The original has multiple rows at different positions: top-[50%], top-[70%], top-[90%]
        $logoSpacing = $width / 4; // Wider spacing for larger text
        
        // First diagonal row (top-[50%] equivalent)
        $y1 = $height * 0.5;
        for ($x = -$width * 0.3; $x < $width * 1.5; $x += $logoSpacing) {
            $image->text($watermarkText, $x, $y1, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.7)'); // Slightly more opaque
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Second diagonal row (top-[70%] equivalent)
        $y2 = $height * 0.7;
        for ($x = -$width * 0.4; $x < $width * 1.6; $x += $logoSpacing) {
            $image->text($watermarkText, $x, $y2, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.7)'); // Slightly more opaque
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Third diagonal row (top-[90%] equivalent)
        $y3 = $height * 0.9;
        for ($x = -$width * 0.5; $x < $width * 1.7; $x += $logoSpacing) {
            $image->text($watermarkText, $x, $y3, function ($font) use ($fontSize) {
                $font->size($fontSize);
                $font->color('rgba(255, 255, 255, 0.7)'); // Slightly more opaque
                $font->angle(-45); // -45 degree rotation like the original
            });
        }
        
        // Add central overlay text (like the original bg-black bg-opacity-30)
        $centerX = $width / 2;
        $centerY = $height / 2;
        
        // Add the central text with MUCH larger size for better visibility
        $centerFontSize = max(120, min($width, $height) / 5); // Much larger central text
        $image->text($watermarkText, $centerX, $centerY, function ($font) use ($centerFontSize) {
            $font->size($centerFontSize);
            $font->color('rgba(255, 255, 255, 1.0)'); // Solid white for central text
            $font->align('center');
            $font->valign('middle');
        });
    }

    /**
     * Add SVG-based watermark to the image
     */
    private function addSvgWatermark($image, $width, $height)
    {
        try {
            // Create SVG watermark with Japanese text
            $svgContent = $this->createSvgWatermark($width, $height);
            
            // Convert SVG to image and overlay it
            $svgImage = $this->svgToImage($svgContent, $width, $height);
            
            if ($svgImage) {
                // Overlay the SVG watermark on the main image
                $image->place($svgImage, 0, 0);
                return true;
            }
            
            return false;
        } catch (\Exception $e) {
            Log::error('SVG watermark failed: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Create SVG watermark content
     */
    private function createSvgWatermark($width, $height)
    {
        // Calculate sizes
        $logoSize = min($width, $height) / 8;
        $logoSpacing = $width / 4;
        
        // Create SVG with diagonal pattern like the original overlay
        $svg = '<svg width="' . $width . '" height="' . $height . '" viewBox="0 0 ' . $width . ' ' . $height . '" xmlns="http://www.w3.org/2000/svg">';
        
        // Add diagonal rows of Japanese text
        $y1 = $height * 0.5;
        $y2 = $height * 0.7;
        $y3 = $height * 0.9;
        
        // First diagonal row
        for ($x = -$width * 0.3; $x < $width * 1.5; $x += $logoSpacing) {
            $svg .= '<text x="' . $x . '" y="' . $y1 . '" font-size="' . $logoSize . '" fill="rgba(255,255,255,0.7)" transform="rotate(-45 ' . $x . ' ' . $y1 . ')">めちゃプリ</text>';
        }
        
        // Second diagonal row
        for ($x = -$width * 0.4; $x < $width * 1.6; $x += $logoSpacing) {
            $svg .= '<text x="' . $x . '" y="' . $y2 . '" font-size="' . $logoSize . '" fill="rgba(255,255,255,0.7)" transform="rotate(-45 ' . $x . ' ' . $y2 . ')">めちゃプリ</text>';
        }
        
        // Third diagonal row
        for ($x = -$width * 0.5; $x < $width * 1.7; $x += $logoSpacing) {
            $svg .= '<text x="' . $x . '" y="' . $y3 . '" font-size="' . $logoSize . '" fill="rgba(255,255,255,0.7)" transform="rotate(-45 ' . $x . ' ' . $y3 . ')">めちゃプリ</text>';
        }
        
        // Add central text
        $centerX = $width / 2;
        $centerY = $height / 2;
        $centerSize = min($width, $height) / 5;
        $svg .= '<text x="' . $centerX . '" y="' . $centerY . '" font-size="' . $centerSize . '" fill="rgba(255,255,255,1.0)" text-anchor="middle" dominant-baseline="middle">めちゃプリ</text>';
        
        $svg .= '</svg>';
        
        return $svg;
    }
    
    /**
     * Convert SVG to image using Intervention Image
     */
    private function svgToImage($svgContent, $width, $height)
    {
        try {
            // Create a temporary SVG file
            $tempSvgPath = storage_path('app/temp_watermark.svg');
            file_put_contents($tempSvgPath, $svgContent);
            
            // Load SVG as image
            $manager = new ImageManager(new Driver());
            $svgImage = $manager->read($tempSvgPath);
            
            // Clean up temp file
            unlink($tempSvgPath);
            
            return $svgImage;
        } catch (\Exception $e) {
            Log::error('SVG to image conversion failed: ' . $e->getMessage());
            return null;
        }
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
        // Use base64 encoding to avoid web server issues with URL-encoded paths
        $base64Path = base64_encode($originalPath);
        return url('/api/watermarked-image-b64/' . $base64Path);
    }

    /**
     * Create a watermarked image path (for compatibility with existing code)
     */
    public function addWatermark($imagePath, $watermarkText = 'Mechapri')
    {
        return $this->createWatermarkedImage($imagePath, $watermarkText);
    }
}
