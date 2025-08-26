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
            $table->string('nwps_user_code')->nullable()->after('nwps_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productbatches', function (Blueprint $table) {
            $table->dropColumn('nwps_user_code');
        });
    }
};
