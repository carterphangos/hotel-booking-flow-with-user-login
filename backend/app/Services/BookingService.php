<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Http\Requests\CreateBookingRequest;

class BookingService extends BaseService
{
    public function __construct(Booking $booking)
    {
        parent::__construct($booking);
    }
    public function getUserBookings(): \Illuminate\Database\Eloquent\Collection
    {
        $user = Auth::user();
        return Booking::with('room')->where('user_id', $user->id)->orderByDesc('created_at')->get();
    }
    public function createBooking(CreateBookingRequest $request): Booking
    {
        $data = $request->validated();
        $room = Room::findOrFail($data['room_id']);
        $nights = Carbon::parse($data['check_in'])->diffInDays(Carbon::parse($data['check_out']));
        $bookingNumber = 'RES' . strtoupper(Str::random(8));
        $status = Carbon::parse($data['check_in'])->isFuture() ? 'upcoming' : 'past';
        $total = $room->price * $nights;

        return $this->create([
            'user_id' => Auth::id(),
            'room_id' => $room->id,
            'check_in' => $data['check_in'],
            'check_out' => $data['check_out'],
            'guests' => $data['guests'],
            'total' => $total,
            'nights' => $nights,
            'booking_number' => $bookingNumber,
            'status' => $status,
            'title' => $data['title'] ?? null,
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
        ]);
    }

    public function getUserBooking(int $id): Booking
    {
        return Booking::with('room')->where('user_id', Auth::id())->findOrFail($id);
    }

    public function cancelBooking(int $id): Booking
    {
        $booking = Booking::where('user_id', Auth::id())->findOrFail($id);
        if ($booking->status === 'upcoming') {
            $booking->status = 'cancelled';
            $booking->cancelled_at = now();
            $booking->save();
        }
        return $booking;
    }
}
