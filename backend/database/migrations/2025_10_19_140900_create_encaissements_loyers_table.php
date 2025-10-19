<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('encaissements_loyers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bail_id');
            $table->date('date_encaissement');
            $table->decimal('montant_encaisse', 12, 2);
            $table->enum('mode_paiement', ['virement','cheque','especes','tpe','prelevement','autre'])->default('virement');
            $table->string('reference_paiement', 120)->nullable();
            $table->timestamps();

            $table->foreign('bail_id')->references('id')->on('baux')->cascadeOnDelete()->cascadeOnUpdate();
            $table->index(['bail_id','date_encaissement'], 'idx_enc_bail_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('encaissements_loyers');
    }
};
