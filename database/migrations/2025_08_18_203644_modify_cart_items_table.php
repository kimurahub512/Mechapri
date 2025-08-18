<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Drop the table if it exists and create it fresh
        Schema::dropIfExists('cart_items');

        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('product_batch_id');
            $table->foreign('product_batch_id')->references('id')->on('productbatches')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
            
            // Unique constraint to prevent duplicate cart items
            $table->unique(['user_id', 'product_batch_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('cart_items');
    }
};