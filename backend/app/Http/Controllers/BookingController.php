<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
use App\Http\Requests\CreateBookingRequest;

class BookingController extends Controller
{
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function index()
    {
        $bookings = $this->bookingService->getUserBookings();
        return response()->json($bookings);
    }

    public function store(CreateBookingRequest $request)
    {
        $booking = $this->bookingService->createBooking($request)->load('room');
        return response()->json($booking, 201);
    }

    public function show($id)
    {
        $booking = $this->bookingService->getUserBooking($id);
        return response()->json($booking);
    }

    public function cancel($id)
    {
        $booking = $this->bookingService->cancelBooking($id);
        return response()->json($booking);
    }
}
