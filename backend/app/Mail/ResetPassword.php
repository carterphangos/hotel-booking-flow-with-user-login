<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    public $expiresAt;

    /**
     * Create a new message instance.
     */
    public function __construct($token, $expiresAt)
    {
        $this->token = $token;
        $this->expiresAt = $expiresAt;
    }

    public function build()
    {
        $frontendUrl = config('app.frontend_url');
        $resetLink = $frontendUrl . 'reset-password?token=' . $this->token;

        return $this->subject('Password Reset')
            ->view('emails.reset')
            ->with([
                'resetLink' => $resetLink,
                'expiresAt' => $this->expiresAt->format('H:i, d M Y'),
            ]);
    }
}
