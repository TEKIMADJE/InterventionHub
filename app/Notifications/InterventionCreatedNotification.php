<?php

namespace App\Notifications;

use App\Models\Intervention;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class InterventionCreatedNotification extends Notification
{
    use Queueable;

    public function __construct(
        private Intervention $intervention
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $routeName = match ($notifiable->role?->nom) {
            'Administrateur' => 'admin.interventions.show',
            'Responsable technique' => 'manager.interventions.show',
            'Technicien' => 'technician.interventions.show',
            'Client' => 'client.interventions.show',
            default => 'dashboard',
        };

        return [
            'type' => 'intervention_created',
            'intervention_id' => $this->intervention->id,
            'reference' => $this->intervention->reference,

        'title' => 'Nouvelle intervention',

        'message' => sprintf(
            'Une nouvelle intervention %s a été créée.',
            $this->intervention->reference
        ),

        'url' => route(
            $routeName,
            $this->intervention
        ),
    ];
}
}