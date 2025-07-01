<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
    <style>
        /* Add some basic styling for the email */
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset</h1>
        <p>You are receiving this email because we received a password reset request for your account.</p>
        <p>To reset your password, click the button below:</p>
        <a href="{{ $resetLink }}" class="btn">Reset Password</a>
        <p>This password reset link will expire at {{ $expiresAt }}.</p>
        <p>If you did not request a password reset, no further action is required.</p>
        <p>Regards,<br>
    </div>
</body>
</html>
