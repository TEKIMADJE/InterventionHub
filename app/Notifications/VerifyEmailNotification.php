<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class VerifyEmailNotification extends Notification
{
    use Queueable;

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(
        object $notifiable
    ): MailMessage {
        $expiration = 60;

        $verificationUrl =
            URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes($expiration),
                [
                    'id' => $notifiable->getKey(),

                    'hash' => sha1(
                        $notifiable
                            ->getEmailForVerification()
                    ),
                ]
            );

        return (new MailMessage)
            ->subject(
                'Vérifiez votre adresse e-mail - InterventionHub'
            )
            ->greeting(
                'Bonjour '.$notifiable->name.' !'
            )
            ->line(
                'Bienvenue sur InterventionHub.'
            )
            ->line(
                'Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.'
            )
            ->action(
                'Vérifier mon adresse e-mail',
                $verificationUrl
            )
            ->line(
                "Ce lien expirera dans {$expiration} minutes."
            )
            ->line(
                'Si vous n’avez pas créé ce compte, vous pouvez ignorer ce message.'
            )
            ->salutation(
                'L’équipe InterventionHub'
            );
    }
}