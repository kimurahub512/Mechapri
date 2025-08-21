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
        Schema::table('user_purchased_products', function (Blueprint $table) {
            $table->string('nwps_qr_code_url')->nullable()->after('nwps_reservation_no');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_purchased_products', function (Blueprint $table) {
            $table->dropColumn('nwps_qr_code_url');
        });
    }
};
