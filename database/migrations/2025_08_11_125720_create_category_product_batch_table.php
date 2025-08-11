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
        Schema::create('category_product_batch', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_category_id')->constrained('user_categories')->onDelete('cascade');
            $table->foreignId('product_batch_id')->constrained('productbatches')->onDelete('cascade');
            $table->timestamps();
            
            // Ensure a product batch can only be in a category once
            $table->unique(['user_category_id', 'product_batch_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_product_batch');
    }
};
