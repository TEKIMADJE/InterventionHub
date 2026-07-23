<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\InterventionAttachment;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'role_id',
        'name',
        'email',
        'password',
        'telephone',
        'adresse',
        'photo',
        'specialite',
        'bio',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

/**
 * Interventions créées par le client.
 */
    public function createdInterventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'client_id');
    }

/**
 * Interventions affectées au technicien.
 */
    public function assignedInterventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'technician_id');
    }

/**
 * Interventions attribuées par le responsable.
 */
    public function managedInterventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'assigned_by');
    }

/**
 * Commentaires rédigés par l'utilisateur.
 */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

/**
 * Pièces jointes ajoutées par l'utilisateur.
 */

    public function interventionAttachments(): HasMany
    {
        return $this->hasMany(InterventionAttachment::class);
    }

/**
 * Historique des actions réalisées.
 */
    public function interventionHistories(): HasMany
    {
        return $this->hasMany(InterventionHistory::class);
    }
}
