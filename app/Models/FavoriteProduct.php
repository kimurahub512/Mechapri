<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_batch_id',
    ];

    /**
     * Get the user who favorited the product.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product batch that was favorited.
     */
    public function productBatch()
    {
        return $this->belongsTo(ProductBatch::class);
    }
}