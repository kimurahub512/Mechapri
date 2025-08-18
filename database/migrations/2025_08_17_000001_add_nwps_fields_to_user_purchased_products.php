<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_purchased_products', function (Blueprint $table) {
            $table->string('nwps_reservation_no')->nullable()->after('purchase_time');
            $table->string('nwps_file_id')->nullable()->after('nwps_reservation_no');
            $table->string('nwps_token')->nullable()->after('nwps_file_id');
            $table->timestamp('nwps_token_expires_at')->nullable()->after('nwps_token');
            $table->string('nwps_upload_status')->default('pending')->after('nwps_token_expires_at');
            $table->string('print_status')->default('not_printed')->after('nwps_upload_status');
            $table->timestamp('printed_at')->nullable()->after('print_status');
            $table->timestamp('print_expires_at')->nullable()->after('printed_at');
        });
    }

    public function down(): void
    {
        Schema::table('user_purchased_products', function (Blueprint $table) {
            $table->dropColumn([
                'nwps_reservation_no',
                'nwps_file_id',
                'nwps_token',
                'nwps_token_expires_at',
                'nwps_upload_status',
                'print_status',
                'printed_at',
                'print_expires_at',
            ]);
        });
    }
};


