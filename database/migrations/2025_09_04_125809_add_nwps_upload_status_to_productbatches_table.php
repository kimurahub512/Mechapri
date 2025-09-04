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
            $table->string('nwps_upload_status')->default('pending')->after('nwps_user_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productbatches', function (Blueprint $table) {
            $table->dropColumn('nwps_upload_status');
        });
    }
};
