<?php

namespace App\Http\Controllers;

use App\Services\RoomService;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    private RoomService $roomService;

    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    public function index(Request $request)
    {
        $rooms = $this->roomService->getAllRooms($request->all());
        return response()->json($rooms);
    }

    public function show($id)
    {
        $room = $this->roomService->getRoom($id);
        return response()->json($room);
    }
}
