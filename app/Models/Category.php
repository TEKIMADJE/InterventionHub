<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Category extends Model
{
    protected $fillable = [
        'nom',
        'description',
        'is_active'
    ];

    /**
     * Interventions appartenant à cette catégorie.
     */
    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class);
    }
}
