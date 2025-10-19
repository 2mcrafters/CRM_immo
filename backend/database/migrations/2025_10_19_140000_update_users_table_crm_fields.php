<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Core CRM user fields
            $table->string('nom', 120)->nullable()->after('name');
            $table->string('prenom', 120)->nullable()->after('nom');
            $table->string('telephone', 50)->nullable()->after('email');
            $table->enum('statut', ['actif','inactif'])->default('actif')->after('telephone');
            $table->string('adresse_ligne1', 150)->nullable()->after('statut');
            $table->string('adresse_ligne2', 150)->nullable()->after('adresse_ligne1');
            $table->string('ville', 100)->nullable()->after('adresse_ligne2');
            $table->string('code_postal', 20)->nullable()->after('ville');
            $table->string('pays', 100)->nullable()->after('code_postal');
            $table->dateTime('last_login_at')->nullable()->after('remember_token');

            // App role convenience column (Spatie still used for full RBAC)
            $table->enum('role', ['admin','employe','client','proprietaire','user'])->default('user')->after('pays');

            // Indexes
            $table->index('statut', 'idx_users_statut');
            $table->index('ville', 'idx_users_ville');

            // Soft deletes
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('idx_users_statut');
            $table->dropIndex('idx_users_ville');
            $table->dropColumn([
                'nom','prenom','telephone','statut','adresse_ligne1','adresse_ligne2','ville','code_postal','pays','last_login_at','role','deleted_at'
            ]);
        });
    }
};
