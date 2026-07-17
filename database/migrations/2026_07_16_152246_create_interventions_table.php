<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('interventions', function (Blueprint $table) {

            $table->id();

            // Référence unique de l'intervention
            $table->string('reference',20)->unique();

            // Informations générales
            $table->string('titre',255);
            $table->text('description');
            $table->string('lieu',255)->nullable();
            $table->string('contact_nom',255)->nullable();
            $table->string('contact_telephone',20)->nullable();

            // Relations
            $table->foreignId('client_id')
                  ->constrained('users')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            $table->foreignId('technician_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->foreignId('assigned_by')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->foreignId('category_id')
                  ->constrained('categories')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            $table->foreignId('status_id')
                  ->constrained('statuses')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            $table->foreignId('priority_id')
                  ->constrained('priorities')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            // Dates
            $table->dateTime('planned_at')->nullable();

            $table->dateTime('started_at')->nullable();

            $table->dateTime('completed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interventions');
    }
};