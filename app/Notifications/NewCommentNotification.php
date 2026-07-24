<?php

namespace App\Notifications;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification
{
    use Queueable;

    public function __construct(
        private Comment $comment
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $intervention = $this->comment->intervention;
        $author = $this->comment->user;

        $routeName = match ($notifiable->role?->nom) {
            'Administrateur' => 'admin.interventions.show',
            'Responsable technique' => 'manager.interventions.show',
            'Technicien' => 'technician.interventions.show',
            'Client' => 'client.interventions.show',
            default => 'dashboard',
        };

        return [
            'type' => 'new_comment',
            'intervention_id' => $intervention->id,
            'comment_id' => $this->comment->id,
            'reference' => $intervention->reference,
            'author' => $author->name,
            'message' => sprintf(
                '%s a ajouté un commentaire à l’intervention %s.',
                $author->name,
                $intervention->reference
            ),
            'url' => route($routeName, $intervention),
        ];
    }
}