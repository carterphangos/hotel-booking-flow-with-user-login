<?php

namespace App\Services;

use App\Enums\TokenAbilities;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function registerUser(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $user;
    }

    public function loginUser(Request $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return null;
        }
        $user = User::where('email', $request->email)->first();
        $accessToken = $user->createToken('Access Token', [TokenAbilities::ACCESS_TOKEN], Carbon::now()->addMinutes(config('sanctum.at_expiration')))->plainTextToken;

        return [
            'access_token' => $accessToken,
            'user' => $user
        ];
    }

    public function logoutUser(Request $request)
    {
        $request->user()->tokens()->delete();
    }
}
