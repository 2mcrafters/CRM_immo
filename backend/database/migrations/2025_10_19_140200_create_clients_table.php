<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->enum('type_personne', ['personne','societe'])->default('personne');
            $table->string('cin', 20)->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('raison_sociale', 180)->nullable();
            $table->string('ice', 30)->nullable();
            $table->string('identifiant_fiscal', 50)->nullable();
            $table->string('secteur_activite', 150)->nullable();
            $table->string('source_acquisition', 100)->nullable();
            $table->enum('statut_client', ['prospect','actif','inactif','blacklist'])->default('prospect');
            $table->text('note_client')->nullable();
            $table->timestamps();

            $table->primary('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->index('type_personne', 'idx_clients_type');
            $table->index('statut_client', 'idx_clients_statut');
            $table->unique('ice', 'uq_clients_ice');
            $table->unique('cin', 'uq_clients_cin');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
