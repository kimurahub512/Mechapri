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
        Schema::table('productbatches', function (Blueprint $table) {
            $table->string('nwps_token')->nullable();
            $table->timestamp('nwps_token_expires_at')->nullable();
            $table->string('nwps_file_id')->nullable();
            $table->string('nwps_qr_code_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productbatches', function (Blueprint $table) {
            $table->dropColumn([
                'nwps_token',
                'nwps_token_expires_at',
                'nwps_file_id',
                'nwps_qr_code_url'
            ]);
        });
    }
};
