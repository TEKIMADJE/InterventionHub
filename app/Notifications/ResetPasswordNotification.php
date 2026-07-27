<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(
        private string $token
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(
        object $notifiable
    ): MailMessage {
        $expiration = config(
            'auth.passwords.'
            .config('auth.defaults.passwords')
            .'.expire',
            60
        );

        $resetUrl = route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable
                ->getEmailForPasswordReset(),
        ]);

        return (new MailMessage)
            ->subject(
                'Réinitialisation de votre mot de passe - InterventionHub'
            )
            ->greeting(
                'Bonjour '.$notifiable->name.' !'
            )
            ->line(
                'Nous avons reçu une demande de réinitialisation du mot de passe de votre compte.'
            )
            ->action(
                'Réinitialiser mon mot de passe',
                $resetUrl
            )
            ->line(
                "Ce lien expirera dans {$expiration} minutes."
            )
            ->line(
                'Si vous n’êtes pas à l’origine de cette demande, aucune action n’est nécessaire.'
            )
            ->salutation(
                'L’équipe InterventionHub'
            );
    }
}