<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('evenements_propriete', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unite_id');
            $table->enum('type_evenement', ['acquisition','cession','heritage','donation','rectification','autre']);
            $table->date('date_evenement');
            $table->text('description')->nullable();
            $table->string('piece_justif_doc', 255)->nullable();
            $table->unsignedBigInteger('enregistre_par')->nullable();
            $table->timestamps();

            $table->foreign('unite_id')->references('id')->on('unites_locatives')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('enregistre_par')->references('id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->index(['unite_id','date_evenement'], 'idx_ep_unite_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evenements_propriete');
    }
};
