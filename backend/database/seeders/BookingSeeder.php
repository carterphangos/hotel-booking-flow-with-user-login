<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\User;
use App\Models\Room;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $rooms = Room::all();

        foreach ($users as $user) {
            $bookedRooms = $rooms->random(rand(1, 6));

            foreach ($bookedRooms as $room) {
                $checkIn = Carbon::now()->addDays(rand(1, 30));
                $nights = rand(1, 5);
                $checkOut = (clone $checkIn)->addDays($nights);
                $status = $checkIn->isFuture() ? 'upcoming' : 'past';

                Booking::factory()->create([
                    'user_id' => $user->id,
                    'room_id' => $room->id,
                    'check_in' => $checkIn->toDateString(),
                    'check_out' => $checkOut->toDateString(),
                    'nights' => $nights,
                    'total' => $room->price * $nights,
                    'status' => $status,
                ]);
            }
        }
    }
}
