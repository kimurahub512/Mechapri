<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
            $image = $request->file('image');
            $extension = $image->getClientOriginalExtension();
            $imageName = $user->id . '.' . $extension;
            $imagePath = $image->storeAs('public/user_images', $imageName);
            $validated['image'] = '/storage/user_images/' . $imageName;
        }
        
        $user->update($validated);
        
        return redirect()->back()->with('success', 'ショップ情報が更新されました。');
    }
}
