<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call(RolesAndPermissionsSeeder::class);

        // Create demo users for each role
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@tgi.fr',
                'password' => 'password',
                'role' => 'administrateur',
            ],
            [
                'name' => 'Marie Dubois',
                'email' => 'juridique@tgi.fr',
                'password' => 'password',
                'role' => 'juridique',
            ],
            [
                'name' => 'Pierre Martin',
                'email' => 'comptable@tgi.fr',
                'password' => 'password',
                'role' => 'comptable',
            ],
            [
                'name' => 'Jean Leclerc',
                'email' => 'technique@tgi.fr',
                'password' => 'password',
                'role' => 'technique',
            ],
            [
                'name' => 'Sophie Bernard',
                'email' => 'commercial@tgi.fr',
                'password' => 'password',
                'role' => 'commercial',
            ],
            [
                'name' => 'Laurent Moreau',
                'email' => 'manager@tgi.fr',
                'password' => 'password',
                'role' => 'manager',
            ],
        ];

        foreach ($users as $userData) {
            $user = \App\Models\User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => \Illuminate\Support\Facades\Hash::make($userData['password']),
            ]);

            $role = \Spatie\Permission\Models\Role::where('name', $userData['role'])->first();
            if ($role) {
                $user->assignRole($role);
            }
        }

        $this->command->info('✅ Utilisateurs de démonstration créés!');
        $this->command->table(
            ['Email', 'Mot de passe', 'Rôle'],
            [
                ['admin@tgi.fr', 'password', 'Administrateur'],
                ['juridique@tgi.fr', 'password', 'Service Juridique'],
                ['comptable@tgi.fr', 'password', 'Service Comptable'],
                ['technique@tgi.fr', 'password', 'Service Technique'],
                ['commercial@tgi.fr', 'password', 'Service Commercial'],
                ['manager@tgi.fr', 'password', 'Manager'],
            ]
        );
    }
}
