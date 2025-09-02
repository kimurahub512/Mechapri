<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cartCount = 0;
        $unreadNotificationCount = 0;
        if ($request->user()) {
            $cartCount = CartItem::where('user_id', $request->user()->id)->sum('quantity');
            $unreadNotificationCount = Notification::where('user_id', $request->user()->id)->where('read', false)->count();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'image' => $request->user()->image,
                    'user_type' => $request->user()->user_type,
                    'shop_title' => $request->user()->shop_title,
                ] : null,
            ],
            'cartCount' => $cartCount,
            'unreadNotificationCount' => $unreadNotificationCount,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
