<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing clients
        Client::query()->delete();

        // Get some users to assign as agents
        $users = User::all();
        $adminUser = User::where('email', 'admin@tgi.fr')->first();
        $commercialUser = User::where('email', 'commercial@tgi.fr')->first();

        $clients = [
            [
                'nom' => 'Dubois',
                'prenom' => 'Jean',
                'email' => 'jean.dubois@example.fr',
                'telephone' => '0612345678',
                'telephone_secondaire' => '0187654321',
                'adresse' => '15 Rue de la République',
                'ville' => 'Paris',
                'code_postal' => '75001',
                'pays' => 'France',
                'type' => 'acheteur',
                'statut' => 'actif',
                'budget_min' => 200000,
                'budget_max' => 350000,
                'preferences' => ['type' => 'appartement', 'pieces' => 3, 'surface_min' => 70],
                'notes' => 'Client sérieux, recherche appartement T3 dans le 15ème.',
                'user_id' => $commercialUser?->id,
            ],
            [
                'nom' => 'Martin',
                'prenom' => 'Sophie',
                'email' => 'sophie.martin@example.fr',
                'telephone' => '0623456789',
                'adresse' => '42 Avenue des Champs-Élysées',
                'ville' => 'Paris',
                'code_postal' => '75008',
                'pays' => 'France',
                'type' => 'vendeur',
                'statut' => 'actif',
                'budget_min' => null,
                'budget_max' => null,
                'preferences' => ['type' => 'appartement', 'pieces' => 4, 'surface' => 95],
                'notes' => 'Vend un appartement 4 pièces, 95m², proche métro.',
                'user_id' => $commercialUser?->id,
            ],
            [
                'nom' => 'Bernard',
                'prenom' => 'Pierre',
                'email' => 'pierre.bernard@example.fr',
                'telephone' => '0634567890',
                'adresse' => '8 Rue du Commerce',
                'ville' => 'Lyon',
                'code_postal' => '69002',
                'pays' => 'France',
                'type' => 'locataire',
                'statut' => 'prospect',
                'budget_min' => 800,
                'budget_max' => 1200,
                'preferences' => ['type' => 'appartement', 'pieces' => 2, 'surface_min' => 50],
                'notes' => 'Recherche location T2, disponible à partir de mars.',
                'user_id' => $adminUser?->id,
            ],
            [
                'nom' => 'Petit',
                'prenom' => 'Marie',
                'email' => 'marie.petit@example.fr',
                'telephone' => '0645678901',
                'adresse' => '23 Boulevard Haussmann',
                'ville' => 'Paris',
                'code_postal' => '75009',
                'pays' => 'France',
                'type' => 'proprietaire',
                'statut' => 'actif',
                'budget_min' => null,
                'budget_max' => null,
                'preferences' => ['type' => 'appartement', 'pieces' => 5, 'surface' => 120],
                'notes' => 'Propriétaire bailleur, gère plusieurs biens.',
                'user_id' => $adminUser?->id,
            ],
            [
                'nom' => 'Moreau',
                'prenom' => 'Luc',
                'email' => 'luc.moreau@example.fr',
                'telephone' => '0656789012',
                'adresse' => '56 Rue de Rivoli',
                'ville' => 'Paris',
                'code_postal' => '75004',
                'pays' => 'France',
                'type' => 'acheteur',
                'statut' => 'prospect',
                'budget_min' => 150000,
                'budget_max' => 250000,
                'preferences' => ['type' => 'appartement', 'pieces' => 2, 'surface_min' => 45],
                'notes' => 'Premier achat, besoin d\'accompagnement.',
                'user_id' => $commercialUser?->id,
            ],
            [
                'nom' => 'Simon',
                'prenom' => 'Claire',
                'email' => 'claire.simon@example.fr',
                'telephone' => '0667890123',
                'adresse' => '12 Avenue Montaigne',
                'ville' => 'Paris',
                'code_postal' => '75008',
                'pays' => 'France',
                'type' => 'acheteur',
                'statut' => 'actif',
                'budget_min' => 500000,
                'budget_max' => 800000,
                'preferences' => ['type' => 'appartement', 'pieces' => 5, 'surface_min' => 150, 'quartier' => '7ème, 8ème, 16ème'],
                'notes' => 'Investisseuse, recherche appartement haut standing.',
                'user_id' => $commercialUser?->id,
            ],
            [
                'nom' => 'Laurent',
                'prenom' => 'Thomas',
                'email' => 'thomas.laurent@example.fr',
                'telephone' => '0678901234',
                'adresse' => '78 Rue Saint-Honoré',
                'ville' => 'Paris',
                'code_postal' => '75001',
                'pays' => 'France',
                'type' => 'vendeur',
                'statut' => 'prospect',
                'budget_min' => null,
                'budget_max' => null,
                'preferences' => ['type' => 'maison', 'pieces' => 6, 'surface' => 180],
                'notes' => 'Vend maison familiale en banlieue.',
                'user_id' => $adminUser?->id,
            ],
            [
                'nom' => 'Michel',
                'prenom' => 'Isabelle',
                'email' => 'isabelle.michel@example.fr',
                'telephone' => '0689012345',
                'adresse' => '34 Rue de la Paix',
                'ville' => 'Marseille',
                'code_postal' => '13001',
                'pays' => 'France',
                'type' => 'locataire',
                'statut' => 'actif',
                'budget_min' => 600,
                'budget_max' => 900,
                'preferences' => ['type' => 'appartement', 'pieces' => 1, 'surface_min' => 30],
                'notes' => 'Étudiante, recherche studio meublé.',
                'user_id' => $adminUser?->id,
            ],
            [
                'nom' => 'Garcia',
                'prenom' => 'Antonio',
                'email' => 'antonio.garcia@example.fr',
                'telephone' => '0690123456',
                'adresse' => '91 Boulevard Saint-Germain',
                'ville' => 'Paris',
                'code_postal' => '75005',
                'pays' => 'France',
                'type' => 'acheteur',
                'statut' => 'inactif',
                'budget_min' => 300000,
                'budget_max' => 450000,
                'preferences' => ['type' => 'appartement', 'pieces' => 4],
                'notes' => 'A trouvé un bien ailleurs, archive.',
                'user_id' => null,
            ],
            [
                'nom' => 'Roux',
                'prenom' => 'Émilie',
                'email' => 'emilie.roux@example.fr',
                'telephone' => '0601234567',
                'adresse' => '19 Rue du Faubourg Saint-Antoine',
                'ville' => 'Paris',
                'code_postal' => '75011',
                'pays' => 'France',
                'type' => 'proprietaire',
                'statut' => 'actif',
                'budget_min' => null,
                'budget_max' => null,
                'preferences' => null,
                'notes' => 'Propriétaire de plusieurs biens en gestion.',
                'user_id' => $commercialUser?->id,
            ],
        ];

        foreach ($clients as $clientData) {
            Client::create($clientData);
        }

        $this->command->info('✅ 10 clients créés avec succès!');
    }
}
