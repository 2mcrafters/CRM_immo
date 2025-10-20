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
        // Supprimer la table clients si elle existe
        Schema::dropIfExists('clients');
        
        // Créer la table clients avec tous les champs
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); // Nom complet / Identifiant
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('telephone')->nullable();
            $table->string('telephone_secondaire')->nullable();
            $table->text('adresse')->nullable();
            $table->string('adresse_ligne1')->nullable();
            $table->string('adresse_ligne2')->nullable();
            $table->string('ville')->nullable();
            $table->string('code_postal')->nullable();
            $table->string('pays')->default('France');
            $table->enum('type', ['acheteur', 'vendeur', 'locataire', 'proprietaire'])->default('acheteur');
            $table->enum('statut', ['prospect', 'actif', 'inactif', 'archive'])->default('prospect');
            $table->string('role')->nullable();
            $table->decimal('budget_min', 12, 2)->nullable();
            $table->decimal('budget_max', 12, 2)->nullable();
            $table->json('preferences')->nullable(); // JSON pour stocker les préférences
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // Agent assigné
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
