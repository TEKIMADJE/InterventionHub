<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Créer la table des pièces jointes.
     */
    public function up(): void
    {
        Schema::create(
            'intervention_attachments',
            function (Blueprint $table) {
                $table->id();

                $table->foreignId('intervention_id')
                    ->constrained('interventions')
                    ->cascadeOnDelete();

                $table->foreignId('user_id')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete();

                $table->string('original_name');

                $table->string('file_path');

                $table->string('mime_type', 100)
                    ->nullable();

                $table->unsignedBigInteger('file_size')
                    ->nullable();

                $table->text('description')
                    ->nullable();

                $table->timestamps();
            }
        );
    }

    /**
     * Supprimer la table.
     */
    public function down(): void
    {
        Schema::dropIfExists('intervention_attachments');
    }
};