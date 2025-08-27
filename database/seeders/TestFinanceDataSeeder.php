<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Payment;
use App\Models\ProductBatch;
use App\Models\Withdrawal;

class TestFinanceDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the test sellers
        $seller1 = User::where('email', 'seller@test.com')->first();
        $seller2 = User::where('email', 'seller2@test.com')->first();
        
        if (!$seller1 || !$seller2) {
            echo "Test sellers not found. Please run TestSellerSeeder first.\n";
            return;
        }

        // Create test product batches for sellers
        $product1 = ProductBatch::create([
            'user_id' => $seller1->id,
            'title' => 'Test Product 1',
            'description' => 'Test product description',
            'price' => 1000,
        ]);

        $product2 = ProductBatch::create([
            'user_id' => $seller2->id,
            'title' => 'Test Product 2',
            'description' => 'Test product description',
            'price' => 2000,
        ]);

        // Create test payments (successful)
        Payment::create([
            'user_id' => 1, // Assuming there's a buyer user with ID 1
            'product_batch_id' => $product1->id,
            'stripe_payment_id' => 'pi_test_1',
            'amount' => 1000,
            'status' => 'succeeded',
            'paid_at' => now()->subDays(5),
        ]);

        Payment::create([
            'user_id' => 1, // Assuming there's a buyer user with ID 1
            'product_batch_id' => $product2->id,
            'stripe_payment_id' => 'pi_test_2',
            'amount' => 2000,
            'status' => 'succeeded',
            'paid_at' => now()->subDays(3),
        ]);

        Payment::create([
            'user_id' => 1, // Assuming there's a buyer user with ID 1
            'product_batch_id' => $product1->id,
            'stripe_payment_id' => 'pi_test_3',
            'amount' => 1000,
            'status' => 'succeeded',
            'paid_at' => now()->subDays(1),
        ]);

        // Create UserPurchasedProduct records to match the payments
        \App\Models\UserPurchasedProduct::create([
            'user_id' => 1,
            'batch_id' => $product1->id,
            'price' => 1000,
            'purchase_time' => now()->subDays(5),
        ]);

        \App\Models\UserPurchasedProduct::create([
            'user_id' => 1,
            'batch_id' => $product2->id,
            'price' => 2000,
            'purchase_time' => now()->subDays(3),
        ]);

        \App\Models\UserPurchasedProduct::create([
            'user_id' => 1,
            'batch_id' => $product1->id,
            'price' => 1000,
            'purchase_time' => now()->subDays(1),
        ]);

        // Create test withdrawals
        Withdrawal::create([
            'seller_id' => $seller1->id,
            'amount' => 500,
            'withdrawal_date' => now()->subDays(2),
            'notes' => 'Test withdrawal 1',
            'created_by' => 1, // Assuming there's an admin user with ID 1
        ]);

        Withdrawal::create([
            'seller_id' => $seller2->id,
            'amount' => 1000,
            'withdrawal_date' => now()->subDays(1),
            'notes' => 'Test withdrawal 2',
            'created_by' => 1, // Assuming there's an admin user with ID 1
        ]);

        echo "Test finance data created successfully!\n";
    }
}
