<?php

namespace App\Http\Controllers;

use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class ProductPasswordController extends Controller
{
    /**
     * Verify the product password.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productbatches,id',
            'password' => 'required|string',
        ]);

        $product = ProductBatch::findOrFail($request->product_id);

        if (Hash::check($request->password, $product->password)) {
            // Store the unlocked status in session
            Session::put("product_{$product->id}_unlocked", true);
            
            return response()->json([
                'success' => true,
                'message' => 'パスワードが正しく確認されました。'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'パスワードが正しくありません。'
        ], 422);
    }

    /**
     * Check if a product is unlocked.
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productbatches,id',
        ]);

        $isUnlocked = Session::get("product_{$request->product_id}_unlocked", false);

        return response()->json([
            'isUnlocked' => $isUnlocked
        ]);
    }
}
