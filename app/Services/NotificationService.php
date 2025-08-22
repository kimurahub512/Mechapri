<?php

namespace App\Services;

use App\Models\User;
use App\Models\Notification;
use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;
use App\Mail\PurchaseNotificationMail;
use App\Mail\FollowNotificationMail;
use App\Mail\NewItemNotificationMail;
use App\Mail\RelistNotificationMail;
use App\Mail\MediPanelNotificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Create a purchase notification
     */
    public static function createPurchaseNotification(User $seller, UserPurchasedProduct $purchase)
    {
        // Check if seller has purchase notifications enabled
        if (!$seller->notification_purchase) {
            return;
        }

        $buyer = $purchase->user;
        $product = $purchase->productBatch;

        $notification = Notification::create([
            'user_id' => $seller->id,
            'type' => 'purchase',
            'title' => '商品が購入されました',
            'message' => "{$buyer->name}さんが「{$product->title}」を{$purchase->cnt}枚購入しました",
            'data' => [
                'buyer_id' => $buyer->id,
                'buyer_name' => $buyer->name,
                'product_id' => $product->id,
                'product_title' => $product->title,
                'quantity' => $purchase->cnt,
                'price' => $purchase->price,
                'purchase_id' => $purchase->id,
            ],
        ]);

        // Send email notification if enabled
        if ($seller->email_notification_purchase) {
            try {
                Mail::to($seller->email)->send(new PurchaseNotificationMail($notification));
            } catch (\Exception $e) {
                Log::error('Failed to send purchase notification email: ' . $e->getMessage());
            }
        }
    }

    /**
     * Create a relist request notification
     */
    public static function createRelistNotification(User $seller, ProductBatch $product, User $requester)
    {
        // Check if seller has relist notifications enabled
        if (!$seller->notification_relist) {
            return;
        }

        $notification = Notification::create([
            'user_id' => $seller->id,
            'type' => 'relist',
            'title' => '再販リクエストが届きました',
            'message' => "{$requester->name}さんが「{$product->title}」の再販をリクエストしました",
            'data' => [
                'requester_id' => $requester->id,
                'requester_name' => $requester->name,
                'product_id' => $product->id,
                'product_title' => $product->title,
            ],
        ]);

        // Send email notification if enabled
        if ($seller->email_notification_relist) {
            try {
                Mail::to($seller->email)->send(new RelistNotificationMail($notification));
            } catch (\Exception $e) {
                Log::error('Failed to send relist notification email: ' . $e->getMessage());
            }
        }
    }

    /**
     * Create a follow notification
     */
    public static function createFollowNotification(User $followedUser, User $follower)
    {
        // Check if followed user has follow notifications enabled
        if (!$followedUser->notification_follow) {
            return;
        }

        $notification = Notification::create([
            'user_id' => $followedUser->id,
            'type' => 'follow',
            'title' => '新しいフォロワーがいます',
            'message' => "{$follower->name}さんがあなたのショップをフォローしました",
            'data' => [
                'follower_id' => $follower->id,
                'follower_name' => $follower->name,
            ],
        ]);

        // Send email notification if enabled
        if ($followedUser->email_notification_follow) {
            try {
                Mail::to($followedUser->email)->send(new FollowNotificationMail($notification));
            } catch (\Exception $e) {
                Log::error('Failed to send follow notification email: ' . $e->getMessage());
            }
        }
    }

    /**
     * Create a new item notification for followers
     */
    public static function createNewItemNotification(User $seller, ProductBatch $product)
    {
        // Get all followers who have new item notifications enabled
        $followers = $seller->favoritedBy()
            ->where('notification_new_item', true)
            ->get();

        foreach ($followers as $follower) {
            $notification = Notification::create([
                'user_id' => $follower->id,
                'type' => 'new_item',
                'title' => 'フォロー中のショップが新商品を出品しました',
                'message' => "{$seller->name}さんが「{$product->title}」を新しく出品しました",
                'data' => [
                    'seller_id' => $seller->id,
                    'seller_name' => $seller->name,
                    'product_id' => $product->id,
                    'product_title' => $product->title,
                ],
            ]);

            // Send email notification if enabled
            if ($follower->email_notification_new_item) {
                try {
                    Mail::to($follower->email)->send(new NewItemNotificationMail($notification));
                } catch (\Exception $e) {
                    Log::error('Failed to send new item notification email: ' . $e->getMessage());
                }
            }
        }
    }

    /**
     * Create a medi panel notification
     */
    public static function createMediPanelNotification(User $user, string $title, string $message, array $data = [])
    {
        // Check if user has medi panel notifications enabled
        if (!$user->notification_medi_panel) {
            return;
        }

        $notification = Notification::create([
            'user_id' => $user->id,
            'type' => 'medi_panel',
            'title' => $title,
            'message' => $message,
            'data' => $data,
        ]);

        // Send email notification if enabled
        if ($user->email_notification_medi_panel) {
            try {
                Mail::to($user->email)->send(new MediPanelNotificationMail($notification));
            } catch (\Exception $e) {
                Log::error('Failed to send medi panel notification email: ' . $e->getMessage());
            }
        }
    }

    /**
     * Create a notification for multiple users
     */
    public static function createBulkNotification(array $userIds, string $type, string $title, string $message, array $data = [])
    {
        $notifications = [];
        $usersToEmail = [];
        
        foreach ($userIds as $userId) {
            $user = User::find($userId);
            if (!$user) continue;

            // Check if user has notifications enabled for this type
            $notificationField = "notification_{$type}";
            if (isset($user->$notificationField) && !$user->$notificationField) {
                continue;
            }

            $notifications[] = [
                'user_id' => $userId,
                'type' => $type,
                'title' => $title,
                'message' => $message,
                'data' => $data,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $usersToEmail[] = $user;
        }

        if (!empty($notifications)) {
            Notification::insert($notifications);
            
            // Send email notifications
            foreach ($usersToEmail as $user) {
                try {
                    $notification = new Notification([
                        'user_id' => $user->id,
                        'type' => $type,
                        'title' => $title,
                        'message' => $message,
                        'data' => $data,
                    ]);
                    
                    // Determine which mail class to use based on type
                    $mailClass = match($type) {
                        'purchase' => PurchaseNotificationMail::class,
                        'follow' => FollowNotificationMail::class,
                        'new_item' => NewItemNotificationMail::class,
                        'relist' => RelistNotificationMail::class,
                        'medi_panel' => MediPanelNotificationMail::class,
                        default => null,
                    };
                    
                    // Check email notification preference
                    $emailField = "email_notification_{$type}";
                    if (isset($user->$emailField) && $user->$emailField && $mailClass) {
                        Mail::to($user->email)->send(new $mailClass($notification));
                    }
                } catch (\Exception $e) {
                    Log::error('Failed to send bulk notification email: ' . $e->getMessage());
                }
            }
        }
    }
}
