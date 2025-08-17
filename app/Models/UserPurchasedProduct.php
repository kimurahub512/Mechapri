<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPurchasedProduct extends Model
{
    protected $fillable = [
        'user_id',
        'batch_id',
        'price',
        'cnt',
        'purchase_time',
    ];

    protected $casts = [
        'purchase_time' => 'datetime',
        'price' => 'decimal:2',
    ];

    /**
     * Get the user that owns the purchase.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product batch that was purchased.
     */
    public function productBatch(): BelongsTo
    {
        return $this->belongsTo(ProductBatch::class, 'batch_id');
    }

    public static function getTopBuyersForProduct($productId, $limit = 5)
    {
        return static::where('batch_id', $productId)
            ->select('user_id')
            ->selectRaw('SUM(cnt) as total_quantity')
            ->with('user:id,name,image')
            ->groupBy('user_id')
            ->orderByDesc('total_quantity')
            ->limit($limit)
            ->get();
    }
}
