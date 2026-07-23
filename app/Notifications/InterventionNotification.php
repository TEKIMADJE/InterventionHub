<?php

namespace App\Notifications;

use App\Models\Intervention;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class InterventionNotification extends Notification
{
    use Queueable;

    public function __construct(
        private Intervention $intervention,
        private string $title,
        private string $message,
        private string $url,
        private string $notificationType = 'information'
    ) {
    }

    /**
     * Canal utilisé pour enregistrer
     * la notification dans la base.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Informations enregistrées
     * dans la table notifications.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'intervention_id' =>
                $this->intervention->id,

            'reference' =>
                $this->intervention->reference,

            'title' =>
                $this->title,

            'message' =>
                $this->message,

            'url' =>
                $this->url,

            'type' =>
                $this->notificationType,
        ];
    }
}