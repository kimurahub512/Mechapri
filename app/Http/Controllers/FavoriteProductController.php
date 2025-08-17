<?php

namespace App\Http\Controllers;

use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
