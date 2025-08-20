<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\FavoriteShop;
use App\Services\NotificationService;
use Inertia\Inertia;

class FavoriteShopController extends Controller
{
    /**
     * Display the user's favorite shops.
     */
    public function index()
    {
        $user = Auth::user();
        $favoriteShops = $user->favoriteShops()
            ->with(['productBatches' => function ($query) {
                $query->latest()->take(5); // Get latest 5 products
            }])
            ->get();

        return Inertia::render('FavoriteShops', [
            'favoriteShops' => $favoriteShops
        ]);
    }

    /**
     * Add a shop to favorites.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shop_user_id' => 'required|exists:users,id'
        ]);

        $user = Auth::user();
        $shopUserId = $request->shop_user_id;

        // Prevent users from favoriting their own shop
        if ($user->id == $shopUserId) {
            return response()->json([
                'success' => false,
                'message' => '自分のショップをお気に入りに追加することはできません。'
            ], 400);
        }

        // Check if already favorited
        if ($user->hasFavoritedShop($shopUserId)) {
            return response()->json([
                'success' => false,
                'message' => '既にお気に入りに追加されています。'
            ], 400);
        }

        // Add to favorites
        $user->favoriteShops()->attach($shopUserId);

        // Create follow notification
        try {
            $followedUser = User::find($shopUserId);
            NotificationService::createFollowNotification($followedUser, $user);
        } catch (\Exception $e) {
            \Log::error('Failed to create follow notification: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'お気に入りに追加しました。'
        ]);
    }

    /**
     * Remove a shop from favorites.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'shop_user_id' => 'required|exists:users,id'
        ]);

        $user = Auth::user();
        $shopUserId = $request->shop_user_id;

        // Remove from favorites
        $user->favoriteShops()->detach($shopUserId);

        return response()->json([
            'success' => true,
            'message' => 'お気に入りから削除しました。'
        ]);
    }

    /**
     * Toggle favorite status (add if not favorited, remove if favorited).
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'shop_user_id' => 'required|exists:users,id'
        ]);

        $user = Auth::user();
        $shopUserId = $request->shop_user_id;

        // Prevent users from favoriting their own shop
        if ($user->id == $shopUserId) {
            return response()->json([
                'success' => false,
                'message' => '自分のショップをお気に入りに追加することはできません。'
            ], 400);
        }

        if ($user->hasFavoritedShop($shopUserId)) {
            // Remove from favorites
            $user->favoriteShops()->detach($shopUserId);
            $isFavorited = false;
            $message = 'お気に入りから削除しました。';
        } else {
            // Add to favorites
            $user->favoriteShops()->attach($shopUserId);
            $isFavorited = true;
            $message = 'お気に入りに追加しました。';

            // Create follow notification
            try {
                $followedUser = User::find($shopUserId);
                NotificationService::createFollowNotification($followedUser, $user);
            } catch (\Exception $e) {
                \Log::error('Failed to create follow notification: ' . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'isFavorited' => $isFavorited,
            'message' => $message
        ]);
    }

    /**
     * Check if a shop is favorited by the current user.
     */
    public function check(Request $request)
    {
        $request->validate([
            'shop_user_id' => 'required|exists:users,id'
        ]);

        $user = Auth::user();
        $shopUserId = $request->shop_user_id;

        $isFavorited = $user->hasFavoritedShop($shopUserId);

        return response()->json([
            'isFavorited' => $isFavorited
        ]);
    }
}
