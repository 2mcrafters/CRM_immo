<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->enum('type_liaison', ['client','proprietaire','unite','bail','encaissement','evenement','autre']);
            $table->unsignedBigInteger('liaison_id');
            $table->string('titre', 180);
            $table->string('path', 255);
            $table->text('note')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->index(['type_liaison','liaison_id'], 'idx_documents_liaison');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
