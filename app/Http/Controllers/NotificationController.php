<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display the notifications page
     */
    public function index()
    {
        $user = Auth::user();
        
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($notification) {
                $imageUrl = null;
                
                // Get product image if notification has product data
                if ($notification->data && isset($notification->data['product_id'])) {
                    $product = \App\Models\ProductBatch::with('files')->find($notification->data['product_id']);
                    if ($product && $product->files->count() > 0) {
                        $imageUrl = '/storage/' . $product->files->first()->file_path;
                    }
                }
                
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'data' => $notification->data,
                    'read' => $notification->read,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->format('Y/m/d H:i'),
                    'image_url' => $imageUrl,
                ];
            });

        return Inertia::render('Notification', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Get notifications for API
     */
    public function getNotifications()
    {
        $user = Auth::user();
        
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function($notification) {
                $imageUrl = null;
                
                // Get product image if notification has product data
                if ($notification->data && isset($notification->data['product_id'])) {
                    $product = \App\Models\ProductBatch::with('files')->find($notification->data['product_id']);
                    if ($product && $product->files->count() > 0) {
                        $imageUrl = '/storage/' . $product->files->first()->file_path;
                    }
                }
                
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'data' => $notification->data,
                    'read' => $notification->read,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->format('Y/m/d H:i'),
                    'image_url' => $imageUrl,
                ];
            });

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $user->unreadNotificationsCount()
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Request $request)
    {
        $request->validate([
            'notification_id' => 'required|integer|exists:notifications,id'
        ]);

        $user = Auth::user();
        $notification = $user->notifications()->findOrFail($request->notification_id);
        
        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'unread_count' => $user->unreadNotificationsCount()
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead()
    {
        $user = Auth::user();
        
        $user->notifications()
            ->unread()
            ->update([
                'read' => true,
                'read_at' => now()
            ]);

        return response()->json([
            'success' => true,
            'unread_count' => 0
        ]);
    }

    /**
     * Delete notification
     */
    public function delete(Request $request)
    {
        $request->validate([
            'notification_id' => 'required|integer|exists:notifications,id'
        ]);

        $user = Auth::user();
        $notification = $user->notifications()->findOrFail($request->notification_id);
        
        $notification->delete();

        return response()->json([
            'success' => true,
            'unread_count' => $user->unreadNotificationsCount()
        ]);
    }

    /**
     * Get unread notifications count
     */
    public function getUnreadCount()
    {
        $user = Auth::user();
        
        return response()->json([
            'unread_count' => $user->unreadNotificationsCount()
        ]);
    }
}
