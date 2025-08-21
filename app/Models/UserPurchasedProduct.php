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
        'nwps_token',
        'nwps_token_expires_at',
        'nwps_file_id',
        'nwps_upload_status',
        'nwps_reservation_no',
        'nwps_qr_code_url',
        'print_status',
        'printed_at',
        'print_expires_at',
    ];

    protected $casts = [
        'purchase_time' => 'datetime',
        'price' => 'decimal:2',
        'nwps_token_expires_at' => 'datetime',
        'printed_at' => 'datetime',
        'print_expires_at' => 'datetime',
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
