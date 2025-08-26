<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\CustomResetPasswordNotification;
use Laravel\Cashier\Billable;

class User extends Authenticatable //implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'google_id',
        'line_id',
        'name',
        'image',
        'header_image',
        'shop_title',
        'shop_description',
        'xlink',
        'instagram',
        'youtube',
        'source',
        'user_type',
        'notification_purchase',
        'notification_relist',
        'notification_follow',
        'notification_new_item',
        'notification_medi_panel',
        'email_notification_purchase',
        'email_notification_relist',
        'email_notification_follow',
        'email_notification_new_item',
        'email_notification_medi_panel',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'email_verified_at',
    ];

    /**
     * Get the product batches for the user.
     */
    public function productBatches(): HasMany
    {
        return $this->hasMany(ProductBatch::class);
    }

    /**
     * Get the categories for the user.
     */
    public function categories(): HasMany
    {
        return $this->hasMany(UserCategory::class);
    }

    /**
     * Get the users who have favorited this user's shop.
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorite_shops', 'favorite_user_id', 'user_id')
                    ->withTimestamps();
    }

    /**
     * Get the favorite shops for this user.
     */
    public function favoriteShops(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorite_shops', 'user_id', 'favorite_user_id')
                    ->withTimestamps();
    }

    /**
     * Check if this user has favorited a specific shop.
     */
    public function hasFavoritedShop($shopUserId): bool
    {
        return $this->favoriteShops()->where('favorite_user_id', $shopUserId)->exists();
    }

    /**
     * Get the favorite products for this user.
     */
    public function favoriteProducts(): BelongsToMany
    {
        return $this->belongsToMany(ProductBatch::class, 'favorite_products', 'user_id', 'product_batch_id')
                    ->withTimestamps();
    }

    /**
     * Get the purchases for this user.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(UserPurchasedProduct::class);
    }

    /**
     * Get the notifications for this user.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(\App\Models\Notification::class);
    }

    /**
     * Get unread notifications count for this user.
     */
    public function unreadNotificationsCount(): int
    {
        return $this->notifications()->unread()->count();
    }

    /**
     * Get the bank account for this user.
     */
    public function bankAccount(): HasMany
    {
        return $this->hasMany(BankAccount::class);
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPasswordNotification($token));
    }
}
