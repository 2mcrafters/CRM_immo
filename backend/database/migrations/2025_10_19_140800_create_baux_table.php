<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('baux', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unite_id');
            $table->unsignedBigInteger('locataire_user_id');
            $table->enum('type_bail', ['habitation','commercial','professionnel','autre']);
            $table->date('date_effet');
            $table->date('date_fin')->nullable();
            $table->enum('periodicite', ['mensuelle','trimestrielle','annuelle'])->default('mensuelle');
            $table->decimal('loyer_ht', 12, 2)->default(0);
            $table->decimal('provisions_charges', 12, 2)->default(0);
            $table->decimal('depot_garantie', 12, 2)->nullable();
            $table->string('indice_revision', 50)->nullable();
            $table->enum('statut', ['brouillon','signe','actif','preavis','resilie'])->default('actif');
            $table->string('numero_contrat', 80)->nullable();
            $table->timestamps();

            $table->foreign('unite_id')->references('id')->on('unites_locatives')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('locataire_user_id')->references('user_id')->on('clients')->restrictOnDelete()->cascadeOnUpdate();
            $table->index('unite_id', 'idx_baux_unite');
            $table->index('locataire_user_id', 'idx_baux_locataire');
            $table->index('statut', 'idx_baux_statut');
            $table->unique('numero_contrat', 'uq_baux_numero');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('baux');
    }
};
