<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    public function edit()
    {
        $user = Auth::user();
        
        $shopData = [
            'image' => $user->image,
            'shop_title' => $user->shop_title,
            'shop_description' => $user->shop_description,
            'xlink' => $user->xlink,
            'instagram' => $user->instagram,
            'youtube' => $user->youtube,
        ];
        
        return Inertia::render('MyShopManagement/MyShopEdit', [
            'shopData' => $shopData
        ]);
    }
    
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'shop_title' => 'nullable|string|max:20',
            'shop_description' => 'nullable|string|max:100',
            'xlink' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB max
        ]);
        
        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if it exists and is not null
            if ($user->image && !empty($user->image)) {
                $oldImagePath = str_replace('/storage/', '', $user->image);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }
            
            $image = $request->file('image');
            $extension = $image->getClientOriginalExtension();
            $imageName = $user->id . '.' . $extension;
            $imagePath = $image->storeAs('user_images', $imageName, 'public');
            $validated['image'] = '/storage/user_images/' . $imageName;
            
        }
        
        $user->update($validated);
        
        return redirect()->back()->with('success', 'ショップ情報が更新されました。');
    }
}
