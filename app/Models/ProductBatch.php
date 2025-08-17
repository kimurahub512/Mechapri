<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class ProductBatch extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     */
    protected $table = 'productbatches';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_cnt',
        'sales_deadline',
        'sales_limit',
        'price',
        'display_mode',
        'add_category',
        'sn_print',
        'sn_format',
        'sn',
        'is_public',
        'password',
        'sales_cnt',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'sales_deadline' => 'date',
        'price' => 'decimal:2',
        'add_category' => 'boolean',
        'sn_print' => 'boolean',
        'is_public' => 'boolean',
        'image_cnt' => 'integer',
        'sales_limit' => 'integer',
        'sales_cnt' => 'integer',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the user that owns the product batch.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the categories that this product batch belongs to.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(UserCategory::class, 'category_product_batch', 'product_batch_id', 'user_category_id');
    }

    /**
     * Get the files for the product batch.
     */
    public function files(): HasMany
    {
        return $this->hasMany(ProductBatchFile::class)->orderBy('sort_order');
    }

    /**
     * Get the users who have favorited this product batch.
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorite_products', 'product_batch_id', 'user_id')
                    ->withTimestamps();
    }

    /**
     * Check if the product is favorited by a specific user
     */
    public function isFavoritedBy(?User $user): bool
    {
        if (!$user) return false;
        return $this->favoritedBy()->where('user_id', $user->id)->exists();
    }

    /**
     * Get the number of users who favorited this product
     */
    public function getFavoriteCountAttribute(): int
    {
        return $this->favoritedBy()->count();
    }


    /**
     * Check if the product batch is free.
     */
    public function isFree(): bool
    {
        return $this->price == 0;
    }

    /**
     * Check if the product batch has unlimited sales.
     */
    public function hasUnlimitedSales(): bool
    {
        return $this->sales_limit === null;
    }

    /**
     * Check if the product batch requires a password.
     */
    public function requiresPassword(): bool
    {
        return $this->display_mode === 'password';
    }

    /**
     * Scope a query to only include public product batches.
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope a query to only include private product batches.
     */
    public function scopePrivate($query)
    {
        return $query->where('is_public', false);
    }

    /**
     * Get the purchases for this product batch.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(UserPurchasedProduct::class, 'batch_id');
    }

    /**
     * Check if the product batch is purchased by a specific user.
     */
    public function isPurchasedBy(User $user): bool
    {
        return $this->purchases()->where('user_id', $user->id)->exists();
    }
}
