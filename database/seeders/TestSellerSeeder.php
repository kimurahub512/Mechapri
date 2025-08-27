<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class TestSellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test seller
        User::create([
            'name' => 'Test Seller',
            'email' => 'seller@test.com',
            'user_type' => 'seller',
            'password' => bcrypt('password'),
            'source' => 'web',
        ]);

        // Create another test seller
        User::create([
            'name' => 'Another Seller',
            'email' => 'seller2@test.com',
            'user_type' => 'seller',
            'password' => bcrypt('password'),
            'source' => 'web',
        ]);

        echo "Test sellers created successfully!\n";
    }
}
