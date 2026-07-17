<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Priority extends Model
{
    protected $fillable = [
        'nom',
        'description',
    ];

    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class);
    }
}
