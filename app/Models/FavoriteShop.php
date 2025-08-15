<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteShop extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'favorite_user_id',
    ];

    /**
     * Get the user who is favoriting.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user whose shop is being favorited.
     */
    public function favoriteUser()
    {
        return $this->belongsTo(User::class, 'favorite_user_id');
    }
}
