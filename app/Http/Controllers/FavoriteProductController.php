<?php

namespace App\Http\Controllers;

use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteProductController extends Controller
{
    /**
     * Toggle favorite status for a product
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productbatches,id'
        ]);

        $product = ProductBatch::findOrFail($request->product_id);
        $user = Auth::user();

        if ($product->isFavoritedBy($user)) {
            $product->favoritedBy()->detach($user->id);
            $isFavorited = false;
        } else {
            $product->favoritedBy()->attach($user->id);
            $isFavorited = true;
        }

        return response()->json([
            'success' => true,
            'isFavorited' => $isFavorited,
            'favoriteCount' => $product->favorite_count
        ]);
    }

    /**
     * Check if a product is favorited by the current user
     */
    public function check(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productbatches,id'
        ]);

        $product = ProductBatch::findOrFail($request->product_id);
        $user = Auth::user();

        return response()->json([
            'success' => true,
            'isFavorited' => $product->isFavoritedBy($user),
            'favoriteCount' => $product->favorite_count
        ]);
    }

    /**
     * Display the user's favorite products.
     */
    public function index()
    {
        $user = Auth::user();
        $favoriteProducts = $user->favoriteProducts()
            ->with(['user', 'files'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($product) {
                                 return [
                     'id' => $product->id,
                     'title' => $product->title,
                     'price' => $product->price,
                     'sales_deadline' => $product->sales_deadline ? $product->sales_deadline->format('Y/m/d') : null,
                     'image_cnt' => $product->image_cnt,
                     'favorite_count' => $product->favorite_count,
                     'is_favorited' => true, // Since these are from favoriteProducts relationship
                     'user' => [
                         'id' => $product->user->id,
                         'name' => $product->user->name,
                         'image' => $product->user->image,
                         'title' => $product->user->shop_title,
                     ],
                     'files' => $product->files->map(function($file) {
                         return [
                             'id' => $file->id,
                             'file_path' => $file->file_path,
                             'url' => $file->url,
                         ];
                     }),
                 ];
            });

        return Inertia::render('FavoriteProducts', [
            'favoriteProducts' => $favoriteProducts
        ]);
    }
}
