<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_batch_id')->constrained('productbatches')->onDelete('cascade');
            $table->string('stripe_payment_id')->unique();
            $table->string('stripe_customer_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('jpy');
            $table->string('status');
            $table->string('payment_method_type')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
