<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterUserRequest $request)
    {
        $this->authService->registerUser($request);

        return response()->json([
            'status' => true,
            'message' => 'User Created Successfully',
        ], Response::HTTP_OK);
    }

    public function login(LoginUserRequest $request)
    {
        $result = $this->authService->loginUser($request);

        if (!$result) {
            return response()->json([
                'status' => false,
                'message' => 'Email & Password does not match with our record.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'status' => true,
            'message' => 'User Logged In Successfully',
            'access_token' => $result['access_token'],
            'user' => $result['user']
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $this->authService->logoutUser($request);

        return response()->json([
            'status' => true,
            'message' => 'User Logged Out Successfully.',
        ], Response::HTTP_OK);
    }
}
