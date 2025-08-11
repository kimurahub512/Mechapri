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
        Schema::create('productbatches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('image_cnt')->default(0);
            $table->date('sales_deadline')->nullable();
            $table->integer('sales_limit')->nullable(); // null means unlimited
            $table->decimal('price', 10, 2)->default(0.00);
            $table->enum('display_mode', ['normal', 'gacha', 'blur', 'password', 'cushion'])->default('normal');
            $table->boolean('add_category')->default(false);
            $table->boolean('sn_print')->default(true);
            $table->string('sn')->nullable();
            $table->boolean('is_public')->default(true);
            $table->string('password')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productbatches');
    }
};
