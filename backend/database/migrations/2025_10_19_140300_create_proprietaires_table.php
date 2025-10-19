<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('proprietaires', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->enum('type_personne', ['personne','societe'])->default('personne');
            $table->string('cin', 20)->nullable();
            $table->string('raison_sociale', 180)->nullable();
            $table->string('ice', 30)->nullable();
            $table->string('identifiant_fiscal', 50)->nullable();
            $table->string('rib_iban', 34)->nullable();
            $table->enum('mode_versement', ['virement','cheque','autre'])->default('virement');
            $table->enum('preference_contact', ['email','telephone','courrier','app'])->default('email');
            $table->enum('statut_proprietaire', ['actif','inactif'])->default('actif');
            $table->text('note_proprietaire')->nullable();
            $table->timestamps();

            $table->primary('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->index('type_personne', 'idx_prop_type');
            $table->index('statut_proprietaire', 'idx_prop_statut');
            $table->unique('ice', 'uq_prop_ice');
            $table->unique('cin', 'uq_prop_cin');
            $table->unique('rib_iban', 'uq_prop_rib');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proprietaires');
    }
};
