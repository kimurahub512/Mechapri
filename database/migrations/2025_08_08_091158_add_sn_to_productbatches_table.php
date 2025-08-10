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
            $table->string('sn')->nullable()->after('sn_format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productbatches', function (Blueprint $table) {
            $table->dropColumn('sn');
        });
    }
};
