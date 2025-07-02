<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        $images = [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/169124334.jpg?k=f7c9caabf8254663949bebfc15302612f6fa37aeecc6ec0715d6648a049311ca&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/641151494.jpg?k=74ea667970853565b0503bd675936738d08f067267387672c2f6bd32d1a5f0e7&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/624608378.jpg?k=d1b48b5c6f96884d97b31b7582fe3c0f15c4dff3228c23754a1ae828cc0d8e0c&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/493673533.jpg?k=911cb0ea78f41ae129ec5acdc68e76ad3a0e25a3d14e1faa691d9c4135996d39&o=&hp=1',
        ];

        return [
            'title' => $this->faker->randomElement([
                'Deluxe King Room',
                'Executive Suite',
                'Standard Twin Room',
                'Superior Queen Room',
                'Junior Suite',
            ]),
            'description' => $this->faker->sentence(10),
            'price' => $this->faker->randomFloat(2, 80, 500),
            'image' =>  $this->faker->randomElement($images),
            'created_at' => now(),
            'updated_at' => now(),
            'guest' => $this->faker->numberBetween(1, 6),
        ];
    }
}
