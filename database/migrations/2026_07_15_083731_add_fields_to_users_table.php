<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->foreignId('role_id')
                  ->nullable()
                  ->after('id')
                  ->constrained('roles')
                  ->nullOnDelete();

            $table->string('telephone', 20)
                  ->nullable()
                  ->after('email');

            $table->text('adresse')
                  ->nullable()
                  ->after('telephone');

            $table->string('photo')
                  ->nullable()
                  ->after('adresse');

            $table->boolean('is_active')
                  ->default(true)
                  ->after('photo');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropForeign(['role_id']);

            $table->dropColumn([
                'role_id',
                'telephone',
                'adresse',
                'photo',
                'is_active'
            ]);
        });
    }
};