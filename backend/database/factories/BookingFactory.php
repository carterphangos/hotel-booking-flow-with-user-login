<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Room;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create();

        return [
            'user_id' => User::factory(),
            'room_id' => Room::factory(),
            'check_in' => $faker->date(),
            'check_out' => $faker->date(),
            'guests' => $faker->numberBetween(1, 4),
            'total' => $faker->randomFloat(2, 100, 1000),
            'nights' => $faker->numberBetween(1, 14),
            'booking_number' => 'RES' . strtoupper(Str::random(8)),
            'status' => $faker->randomElement(['upcoming', 'past', 'cancelled']),
            'title' => $faker->title,
            'name' => $faker->name,
            'email' => $faker->safeEmail,
            'cancelled_at' => null,
        ];
    }
}
