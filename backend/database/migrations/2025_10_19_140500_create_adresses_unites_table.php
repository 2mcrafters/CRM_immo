<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('adresses_unites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unite_id');
            $table->string('adresse_ligne1', 150);
            $table->string('adresse_ligne2', 150)->nullable();
            $table->string('ville', 100);
            $table->string('code_postal', 20)->nullable();
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->timestamps();

            $table->foreign('unite_id')->references('id')->on('unites_locatives')->cascadeOnDelete()->cascadeOnUpdate();
            $table->index(['unite_id','date_debut','date_fin'], 'idx_adru_unite_periode');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adresses_unites');
    }
};
