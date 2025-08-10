<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductBatch>
 */
class ProductBatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'image_cnt' => fake()->numberBetween(1, 10),
            'sales_deadline' => fake()->optional()->dateTimeBetween('+1 week', '+3 months'),
            'sales_limit' => fake()->optional()->numberBetween(10, 1000),
            'price' => fake()->randomFloat(2, 0, 5000),
            'display_mode' => fake()->randomElement(['normal', 'gacha', 'blur', 'password', 'cushion']),
            'add_category' => fake()->boolean(30), // 30% chance of true
            'sn_print' => fake()->boolean(70), // 70% chance of true
            'sn_format' => fake()->randomElement(['number', 'random']),
            'is_public' => fake()->boolean(80), // 80% chance of true
            'password' => function (array $attributes) {
                return $attributes['display_mode'] === 'password' ? fake()->password(6, 12) : null;
            },
        ];
    }
}
