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
        Schema::table('users', function (Blueprint $table) {
            // Add email notification preferences
            $table->boolean('email_notification_purchase')->default(true)->after('notification_medi_panel');
            $table->boolean('email_notification_relist')->default(true)->after('email_notification_purchase');
            $table->boolean('email_notification_follow')->default(true)->after('email_notification_relist');
            $table->boolean('email_notification_new_item')->default(true)->after('email_notification_follow');
            $table->boolean('email_notification_medi_panel')->default(true)->after('email_notification_new_item');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'email_notification_purchase',
                'email_notification_relist',
                'email_notification_follow',
                'email_notification_new_item',
                'email_notification_medi_panel',
            ]);
        });
    }
};
