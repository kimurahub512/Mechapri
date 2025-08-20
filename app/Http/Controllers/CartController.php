<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with(['productBatch.user', 'productBatch.files'])
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Cart', [
            'cartItems' => $cartItems
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_batch_id' => 'required|exists:productbatches,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_batch_id' => $request->product_batch_id
            ],
            [
                'quantity' => $request->quantity
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Added to cart successfully',
            'cart_item' => $cartItem->load('productBatch')
        ]);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        Log::info('CartController::update called', [
            'cartItem_id' => $cartItem->id,
            'user_id' => Auth::id(),
            'cartItem_user_id' => $cartItem->user_id,
            'request_quantity' => $request->quantity
        ]);

        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        if ($cartItem->user_id !== Auth::id()) {
            Log::warning('Unauthorized cart update attempt', [
                'cartItem_id' => $cartItem->id,
                'user_id' => Auth::id(),
                'cartItem_user_id' => $cartItem->user_id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        Log::info('Cart item updated successfully', [
            'cartItem_id' => $cartItem->id,
            'new_quantity' => $request->quantity
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated successfully',
            'cart_item' => $cartItem->load('productBatch')
        ]);
    }

    public function remove(CartItem $cartItem)
    {
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }

    public function clear()
    {
        CartItem::where('user_id', Auth::id())->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared'
        ]);
    }
}