<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(public string $token)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);

        return (new MailMessage())
            ->subject('Réinitialisation de votre mot de passe')
            ->line(
                'Vous recevez cet email parce qu’une demande de réinitialisation a été effectuée.'
            )
            ->action('Réinitialiser le mot de passe', $url)
            ->line(
                'Si vous n’avez pas demandé cette réinitialisation, ignorez cet email.'
            );
    }
}