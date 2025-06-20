<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Inertia\Inertia;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Illuminate\Support\Arr;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'images' => 'required',
            'images.*' => 'file|mimes:jpg,jpeg,png,pdf|max:25600', // 25MB per file
        ]);

        $files = Arr::wrap($request->file('images'));
        $results = [];
        $userId = auth()->id();
        $userDir = "photos/user_{$userId}";

        // Create user directory if it doesn't exist
        if (!Storage::disk('public')->exists($userDir)) {
            Storage::disk('public')->makeDirectory($userDir);
        }

        foreach ($files as $file) {
            $extension = strtolower($file->getClientOriginalExtension());
            $filename = uniqid('photo_') . '.' . $extension;
            $path = $userDir . '/' . $filename;

            if (in_array($extension, ['jpg', 'jpeg'])) {
                $manager = new \Intervention\Image\ImageManager(\Intervention\Image\Drivers\Gd\Driver::class);
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
                
                $jpegData = $img->toJpeg(90); // 90% quality
                Storage::disk('public')->put($path, (string) $jpegData);
                $fullPath = Storage::disk('public')->path($path);
                if (class_exists(\Spatie\ImageOptimizer\OptimizerChainFactory::class)) {
                    $optimizerChain = \Spatie\ImageOptimizer\OptimizerChainFactory::create();
                    $optimizerChain->optimize($fullPath);
                }
            } elseif ($extension === 'png') {
                $manager = new \Intervention\Image\ImageManager(\Intervention\Image\Drivers\Gd\Driver::class);
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
                
                Storage::disk('public')->put($path, (string) $img->toPng()); // lossless
            } elseif ($extension === 'pdf') {
                Storage::disk('public')->putFileAs('photos', $file, $filename);
            }

            $results[] = [
                'success' => true,
                'path' => Storage::url($path),
            ];
        }

        if ($request->inertia()) {
            return redirect()->back()->with('success', 'Upload successful!');
        }
        return response()->json($results);
    }
} 