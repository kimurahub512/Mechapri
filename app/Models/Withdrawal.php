<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'amount',
        'withdrawal_date',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'withdrawal_date' => 'date',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the seller who made the withdrawal
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    /**
     * Get the manager who recorded the withdrawal
     */
    public function manager()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
