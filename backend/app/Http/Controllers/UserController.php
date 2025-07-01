<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::with(['bookings.room'])->where('id', $id)->get();

        return response()->json(['user' => $user,], 200);
    }
}
