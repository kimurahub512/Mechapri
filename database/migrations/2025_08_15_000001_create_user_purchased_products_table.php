<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_purchased_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('batch_id')->constrained('productbatches')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->integer('cnt');
            $table->timestamp('purchase_time');
            $table->timestamps();

            // Add unique constraint to prevent duplicate purchases
            $table->unique(['user_id', 'batch_id', 'purchase_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_purchased_products');
    }
};
