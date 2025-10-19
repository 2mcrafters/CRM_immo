<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employes', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->string('matricule', 50);
            $table->string('poste', 120)->nullable();
            $table->string('departement', 120)->nullable();
            $table->enum('type_contrat', ['CDI','CDD','Freelance','Stage','Autre'])->default('CDI');
            $table->date('date_embauche')->nullable();
            $table->date('date_fin_contrat')->nullable();
            $table->decimal('salaire_base', 12, 2)->nullable();
            $table->enum('mode_paiement', ['virement','especes','cheque','autre'])->default('virement');
            $table->string('iban_rib', 34)->nullable();
            $table->enum('statut_employe', ['actif','suspendu','sorti'])->default('actif');
            $table->text('note_interne')->nullable();
            $table->timestamps();

            $table->primary('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->unique('matricule', 'uq_employes_matricule');
            $table->index('departement', 'idx_employes_departement');
            $table->index('statut_employe', 'idx_employes_statut');
            $table->index('type_contrat', 'idx_employes_contrat');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};
