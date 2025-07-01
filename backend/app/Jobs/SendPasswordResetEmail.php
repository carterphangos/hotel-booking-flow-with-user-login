<?php

namespace App\Jobs;

use App\Mail\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPasswordResetEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public $expiresAt;

    public $email;

    public function __construct($token, $expiresAt, $email)
    {
        $this->token = $token;
        $this->expiresAt = $expiresAt;
        $this->email = $email;
    }

    public function handle()
    {
        Mail::to($this->email)->send(new ResetPassword($this->token, $this->expiresAt));
    }
}
