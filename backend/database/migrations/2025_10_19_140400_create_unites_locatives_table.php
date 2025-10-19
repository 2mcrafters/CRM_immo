<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('unites_locatives', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 80);
            $table->enum('type_unite', ['appartement','local','terrain','bureau','autre']);
            $table->enum('statut', ['disponible','occupe','travaux','reserve','retire'])->default('disponible');
            $table->string('adresse_ligne1', 150)->nullable();
            $table->string('adresse_ligne2', 150)->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('code_postal', 20)->nullable();
            $table->decimal('surface_m2', 10, 2)->nullable();
            $table->string('etage', 20)->nullable();
            $table->string('cadastre_ref', 80)->nullable();
            $table->string('dpe_classe', 5)->nullable();
            $table->date('date_mise_service')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique('reference', 'uq_unites_reference');
            $table->index(['type_unite','statut'], 'idx_unites_type_statut');
            $table->index('ville', 'idx_unites_ville');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unites_locatives');
    }
};
