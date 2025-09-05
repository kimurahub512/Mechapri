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
            
            Log::info('Attempting to read image: ' . $originalFullPath . ' (size: ' . $fileSize . ' bytes)');
            
            // Check image type first
            $imageInfo = getimagesize($originalFullPath);
            if ($imageInfo === false) {
                Log::error('Invalid image file - getimagesize failed: ' . $originalFullPath);
                return null;
            }
            
            Log::info('Image info: ' . json_encode($imageInfo));
            
                        // Try to create a new image from the existing one using PHP's built-in functions
            $image = null;
            $lastError = null;
            
            try {
                // First try Intervention Image directly
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalFullPath);
                Log::info('Successfully read image with Intervention Image');
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
                    
                    Log::info('Successfully read image using PHP GD functions and converted to Intervention Image');
                } catch (\Exception $e2) {
                    $lastError = $e2->getMessage();
                    Log::error('Failed to read image with PHP GD functions: ' . $e2->getMessage());
                }
            }
            
            if ($image === null) {
                throw new \Exception('Could not read image with any method. Last error: ' . $lastError);
            }

            // Resize to thumbnail dimensions to save storage space
            [$newWidth, $newHeight] = $this->resizeToThumbnail($image);

            // Add watermark to thumbnail
            try {
                // $this->addCenterWatermark($image, $watermarkText, $newWidth, $newHeight);
                // $this->addDiagonalWatermarks($image, $newWidth, $newHeight);
                $this->addRotatedLogoRows($image, $newWidth, $newHeight);

                Log::info('Successfully added watermark to thumbnail image');
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

            Log::info('Watermarked image created: ' . $watermarkedPath);
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



    private function addRotatedLogoRows($image, int $width, int $height): void
    {
        $manager = new ImageManager(new Driver());
    
        // Calculate scaling factor based on image size
        // Use the smaller dimension as reference, with a base size of 800px
        // This ensures more rows for larger images (up to 1500x2100)
        $baseSize = 800;
        $scaleFactor = min($width, $height) / $baseSize;
        
        // Scale logo size based on image dimensions
        $logoWidth = (int)(280 * $scaleFactor);
        $logoHeight = (int)(49 * $scaleFactor);
        
        // Scale gaps based on image dimensions - smaller gaps for more rows
        $gapX = (int)(40 * $scaleFactor);
        $gapY = (int)(600 * $scaleFactor); // Gap between rows - reduced for more rows
        $gapXOffset = (int)(400 * $scaleFactor); // Horizontal offset between tiles - reduced
        
        Log::info("Image size: {$width}x{$height}, Scale factor: {$scaleFactor}");
        Log::info("Logo size: {$logoWidth}x{$logoHeight}, Gaps: X={$gapX}, Y={$gapY}, XOffset={$gapXOffset}");
    
        // 1) Load & resize logo
        $logoPath = resource_path('js/assets/images/logo_white.png');
        $logo = $manager->read($logoPath)->resize($logoWidth, $logoHeight);
    
        // 2) Build a row of logos
        $logosPerRow = 4;
        $rowW        = $logosPerRow * $logo->width() + ($logosPerRow - 1) * $gapX;
        $rowH        = $logo->height();
    
        $row = $manager->create($rowW, $rowH)->fill('rgba(0,0,0,0)');
        for ($i = 0; $i < $logosPerRow; $i++) {
            $x = $i * ($logo->width() + $gapX);
            $row->place($logo, 'top-left', $x, 0);
        }
    
        // 3) Rotate the row
        $rotatedRow = clone $row;
        $rotatedRow->rotate(30, 'rgba(0,0,0,0)');
    
        // 4) Create an overlay canvas same size as the target
        $overlay = $manager->create($width, $height)->fill('rgba(0,0,0,0)');
    
        // 5) Tile the rotated row only within overlay (like overflow-hidden)
        $tileW = $rotatedRow->width();
        $tileH = $rotatedRow->height();
    
        for ($y = -$tileH; $y < $height + $tileH; $y += $gapY) {
            for ($x = -$tileW; $x < $width + $tileW; $x += $gapXOffset) {
                $overlay->place($rotatedRow, 'top-left', $x, $y);
            }
        }
    
        // 6) Merge overlay into original image
        $image->place($overlay, 'top-left', 0, 0);
    }
    
    

    /**
     * Add SVG watermark
     */
    private function addCenterWatermark($image, $text, $width, $height)
    {
        Log::info('size: ' . $width . 'x' . $height);
        // Calculate watermark size based on image dimensions (about 1/4 of the smaller dimension)
        $watermarkSize = min($width, $height) / 4;
        $watermarkWidth = $watermarkSize;
        $watermarkHeight = ($watermarkSize * 96) / 141; // Maintain aspect ratio
        
        Log::info('Watermark size: ' . $watermarkWidth . 'x' . $watermarkHeight);
        
        // Center position
        $centerX = ($width - $watermarkWidth) / 2;
        $centerY = ($height - $watermarkHeight) / 2;
        
        Log::info('Watermark position: ' . $centerX . ', ' . $centerY);
        
        // Use the existing PNG logo file
        Log::info('Using PNG logo file for watermark');
        
        $logoPath = resource_path('js/assets/images/rotated_logo.png');
        Log::info('Logo file path: ' . $logoPath);
        
        if (!file_exists($logoPath)) {
            throw new \Exception('Logo file not found: ' . $logoPath);
        }
        
        try {
            // Read the PNG logo file with Intervention Image
            $manager = new ImageManager(new Driver());
            $watermark = $manager->read($logoPath);
            
            Log::info('Successfully read PNG logo file');
            
            // Resize watermark
            $watermark->resize($watermarkWidth, $watermarkHeight);
            
            Log::info('Resized watermark to: ' . $watermarkWidth . 'x' . $watermarkHeight);
            
            // Place watermark on the image
            $image->place($watermark, $centerX, $centerY);
            
            Log::info('Watermark process completed successfully');
            
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

    /**
     * Resize image to thumbnail dimensions to save storage space
     */
    private function resizeToThumbnail($image, $maxWidth = 400, $maxHeight = 400)
    {
        $originalWidth = $image->width();
        $originalHeight = $image->height();
        
        // Calculate thumbnail dimensions maintaining aspect ratio
        if ($originalWidth > $originalHeight) {
            // Landscape image
            $newWidth = min($maxWidth, $originalWidth);
            $newHeight = (int)($originalHeight * $newWidth / $originalWidth);
        } else {
            // Portrait or square image
            $newHeight = min($maxHeight, $originalHeight);
            $newWidth = (int)($originalWidth * $newHeight / $originalHeight);
        }
        
        // Resize image to thumbnail size
        $image->resize($newWidth, $newHeight, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize(false); // Prevent upscaling
        });
        
        Log::info("Resized image from {$originalWidth}x{$originalHeight} to {$newWidth}x{$newHeight} for thumbnail watermark");
        
        return [$newWidth, $newHeight];
    }

    /**
     * Create a blurred watermarked image file and return the path (for blur mode)
     */
    public function createBlurredWatermarkedImage($imagePath, $watermarkText = 'Mechari')
    {
        try {
            // Check if original image exists
            if (!Storage::disk('public')->exists($imagePath)) {
                Log::error('Original image not found: ' . $imagePath);
                return null;
            }

            // Generate blurred watermarked file path
            $pathInfo = pathinfo($imagePath);
            $blurredWatermarkedPath = $pathInfo['dirname'] . '/blurred_watermarked_' . $pathInfo['basename'];

            // Check if blurred watermarked version already exists
            if (Storage::disk('public')->exists($blurredWatermarkedPath)) {
                return $blurredWatermarkedPath;
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
            
            Log::info('Creating blurred watermarked image: ' . $originalFullPath . ' (size: ' . $fileSize . ' bytes)');
            
            // Check image type first
            $imageInfo = getimagesize($originalFullPath);
            if ($imageInfo === false) {
                Log::error('Invalid image file: ' . $originalFullPath);
                return null;
            }
            
            $width = $imageInfo[0];
            $height = $imageInfo[1];
            
            Log::info('Image dimensions: ' . $width . 'x' . $height);
            
            // Create image manager
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalFullPath);
            
            // Resize to thumbnail dimensions to save storage space
            [$newWidth, $newHeight] = $this->resizeToThumbnail($image);
            
            // Apply blur first
            $image->blur(10);
            
            // Add watermark
            $this->addCenterWatermark($image, $watermarkText, $newWidth, $newHeight);
            
            // Save the blurred watermarked image
            $ext = strtolower($pathInfo['extension']);
            if ($ext === 'png') {
                Storage::disk('public')->put($blurredWatermarkedPath, (string) $image->toPng());
            } else {
                Storage::disk('public')->put($blurredWatermarkedPath, (string) $image->toJpeg(90));
            }
            
            Log::info('Blurred watermarked image created successfully: ' . $blurredWatermarkedPath);
            return $blurredWatermarkedPath;
            
        } catch (\Exception $e) {
            Log::error('Failed to create blurred watermarked image: ' . $e->getMessage());
            return null;
        }
    }
}
