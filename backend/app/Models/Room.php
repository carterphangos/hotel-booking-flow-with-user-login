<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
        'guest',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeGuest($query, $guest)
    {
        if ($guest !== null) {
            return $query->where('guest', '>=', $guest);
        }
        return $query;
    }

    public function scopeSortByPrice($query, $direction = 'asc')
    {
        return $query->orderBy('price', $direction);
    }
}
