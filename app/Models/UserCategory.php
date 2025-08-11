<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserCategory extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_public',
        'batch_cnt',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'batch_cnt' => 'integer',
    ];

    /**
     * Get the user that owns the category.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product batches for this category.
     */
    public function productBatches(): BelongsToMany
    {
        return $this->belongsToMany(ProductBatch::class, 'category_product_batch', 'user_category_id', 'product_batch_id');
    }
}
