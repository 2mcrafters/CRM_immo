<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('unites_proprietaires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unite_id');
            $table->unsignedBigInteger('proprietaire_user_id');
            $table->string('part_fraction', 30);
            $table->unsignedInteger('part_num');
            $table->unsignedInteger('part_den');
            $table->decimal('part_pct', 10, 6)->storedAs('part_num / NULLIF(part_den,0)');
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->unsignedBigInteger('source_evenement_id')->nullable();
            $table->timestamps();

            $table->foreign('unite_id')->references('id')->on('unites_locatives')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('proprietaire_user_id')->references('user_id')->on('proprietaires')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('source_evenement_id')->references('id')->on('evenements_propriete')->nullOnDelete()->cascadeOnUpdate();
            $table->index(['unite_id','date_debut','date_fin'], 'idx_up_unite_periode');
            $table->index('proprietaire_user_id', 'idx_up_proprietaire');
            $table->unique(['unite_id','proprietaire_user_id','date_debut'], 'uq_up_unite_prop_start');
        });

        // MySQL CHECK constraint for part_den > 0
        DB::statement('ALTER TABLE unites_proprietaires ADD CONSTRAINT chk_up_den_pos CHECK (part_den > 0)');
    }

    public function down(): void
    {
        // Drop CHECK constraint if exists (MySQL 8)
        try { DB::statement('ALTER TABLE unites_proprietaires DROP CONSTRAINT chk_up_den_pos'); } catch (\Throwable $e) { /* ignore */ }
        Schema::dropIfExists('unites_proprietaires');
    }
};
