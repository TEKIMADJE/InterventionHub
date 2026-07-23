<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\InterventionAttachment;

class Intervention extends Model
{
    protected $fillable = [
        'reference',
        'titre',
        'description',
        'lieu',
        'contact_nom',
        'contact_telephone',
        'solution',
        'client_id',
        'technician_id',
        'assigned_by',
        'category_id',
        'status_id',
        'priority_id',
        'planned_at',
        'started_at',
        'completed_at',
    ];

    /**
     * Client ayant créé l'intervention.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Technicien affecté.
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    /**
     * Responsable ayant effectué l'affectation.
     */
    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    /**
     * Catégorie de l'intervention.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Statut de l'intervention.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * Priorité de l'intervention.
     */
    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class);
    }

    /**
     * Commentaires liés à l'intervention.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)
            ->latest();
    }

    /**
     * Pièces jointes liées à l'intervention.
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(InterventionAttachment::class);
    }

    /**
     * Historique de l'intervention.
     */
    public function histories(): HasMany
    {
        return $this->hasMany(InterventionHistory::class);
    }
}