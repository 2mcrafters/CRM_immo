<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Créer les permissions par module
        $permissions = [
            // Dashboard & Général
            'dashboard.view' => 'Voir le tableau de bord',
            'users.view' => 'Voir les utilisateurs',
            'users.create' => 'Créer des utilisateurs',
            'users.edit' => 'Modifier des utilisateurs',
            'users.delete' => 'Supprimer des utilisateurs',
            'settings.view' => 'Voir les paramètres',
            'settings.edit' => 'Modifier les paramètres',
            
            // Clients & Propriétaires
            'clients.view' => 'Voir les clients',
            'clients.create' => 'Créer des clients',
            'clients.edit' => 'Modifier des clients',
            'clients.delete' => 'Supprimer des clients',
            'owners.view' => 'Voir les propriétaires',
            'owners.create' => 'Créer des propriétaires',
            'owners.edit' => 'Modifier des propriétaires',
            'owners.delete' => 'Supprimer des propriétaires',
            
            // Propriétés
            'properties.view' => 'Voir les propriétés',
            'properties.create' => 'Créer des propriétés',
            'properties.edit' => 'Modifier des propriétés',
            'properties.delete' => 'Supprimer des propriétés',
            
            // Locations & Contrats (Juridique)
            'rentals.view' => 'Voir les locations',
            'rentals.create' => 'Créer des locations',
            'rentals.edit' => 'Modifier des locations',
            'rentals.delete' => 'Supprimer des locations',
            'contracts.view' => 'Voir les contrats',
            'contracts.create' => 'Créer des contrats',
            'contracts.edit' => 'Modifier des contrats',
            'contracts.validate' => 'Valider des contrats',
            'contracts.archive' => 'Archiver des contrats',
            
            // Documents (GED)
            'documents.view' => 'Voir les documents',
            'documents.create' => 'Créer des documents',
            'documents.edit' => 'Modifier des documents',
            'documents.delete' => 'Supprimer des documents',
            'documents.download' => 'Télécharger des documents',
            
            // Facturation & Comptabilité
            'invoices.view' => 'Voir les factures',
            'invoices.create' => 'Créer des factures',
            'invoices.edit' => 'Modifier des factures',
            'invoices.delete' => 'Supprimer des factures',
            'payments.view' => 'Voir les paiements',
            'payments.create' => 'Enregistrer des paiements',
            'payments.validate' => 'Valider des paiements',
            'treasury.view' => 'Voir la trésorerie',
            'treasury.manage' => 'Gérer la trésorerie',
            'liquidations.view' => 'Voir les liquidations',
            'liquidations.create' => 'Créer des liquidations',
            'liquidations.validate' => 'Valider des liquidations',
            
            // Maintenance & Technique
            'maintenance.view' => 'Voir les interventions',
            'maintenance.create' => 'Créer des interventions',
            'maintenance.edit' => 'Modifier des interventions',
            'maintenance.assign' => 'Assigner des interventions',
            'maintenance.close' => 'Clôturer des interventions',
            
            // CRM & Commercial
            'crm.view' => 'Voir le CRM',
            'crm.create' => 'Créer des contacts CRM',
            'crm.edit' => 'Modifier des contacts CRM',
            'crm.delete' => 'Supprimer des contacts CRM',
            'opportunities.view' => 'Voir les opportunités',
            'opportunities.create' => 'Créer des opportunités',
            'opportunities.edit' => 'Modifier des opportunités',
            
            // Rapports & Analyses
            'reports.view' => 'Voir les rapports',
            'reports.financial' => 'Voir les rapports financiers',
            'reports.rental' => 'Voir les rapports locatifs',
            'reports.technical' => 'Voir les rapports techniques',
            'reports.export' => 'Exporter des rapports',
            'analytics.view' => 'Voir les analyses',
        ];

        // Créer toutes les permissions
        foreach ($permissions as $name => $description) {
            Permission::create(['name' => $name, 'guard_name' => 'web']);
        }

        // ========================================
        // 1. ADMINISTRATEUR - Accès complet
        // ========================================
        $admin = Role::create(['name' => 'administrateur', 'guard_name' => 'web']);
        $admin->givePermissionTo(Permission::all());

        // ========================================
        // 2. SERVICE JURIDIQUE
        // Gestion des mandats, contrats, baux et GED
        // ========================================
        $juridique = Role::create(['name' => 'juridique', 'guard_name' => 'web']);
        $juridique->givePermissionTo([
            'dashboard.view',
            'clients.view',
            'owners.view',
            'properties.view',
            'rentals.view',
            'rentals.create',
            'rentals.edit',
            'contracts.view',
            'contracts.create',
            'contracts.edit',
            'contracts.validate',
            'contracts.archive',
            'documents.view',
            'documents.create',
            'documents.edit',
            'documents.delete',
            'documents.download',
            'reports.view',
        ]);

        // ========================================
        // 3. SERVICE COMPTABLE
        // Facturation, trésorerie, liquidations
        // ========================================
        $comptable = Role::create(['name' => 'comptable', 'guard_name' => 'web']);
        $comptable->givePermissionTo([
            'dashboard.view',
            'clients.view',
            'owners.view',
            'properties.view',
            'rentals.view',
            'invoices.view',
            'invoices.create',
            'invoices.edit',
            'invoices.delete',
            'payments.view',
            'payments.create',
            'payments.validate',
            'treasury.view',
            'treasury.manage',
            'liquidations.view',
            'liquidations.create',
            'liquidations.validate',
            'documents.view',
            'documents.download',
            'reports.view',
            'reports.financial',
        ]);

        // ========================================
        // 4. SERVICE TECHNIQUE
        // Maintenance et interventions
        // ========================================
        $technique = Role::create(['name' => 'technique', 'guard_name' => 'web']);
        $technique->givePermissionTo([
            'dashboard.view',
            'properties.view',
            'maintenance.view',
            'maintenance.create',
            'maintenance.edit',
            'maintenance.assign',
            'maintenance.close',
            'documents.view',
            'documents.create',
            'documents.download',
            'reports.view',
            'reports.technical',
        ]);

        // ========================================
        // 5. SERVICE COMMERCIAL
        // CRM, prospection, nouveaux contacts
        // ========================================
        $commercial = Role::create(['name' => 'commercial', 'guard_name' => 'web']);
        $commercial->givePermissionTo([
            'dashboard.view',
            'clients.view',
            'clients.create',
            'clients.edit',
            'owners.view',
            'owners.create',
            'owners.edit',
            'properties.view',
            'crm.view',
            'crm.create',
            'crm.edit',
            'crm.delete',
            'opportunities.view',
            'opportunities.create',
            'opportunities.edit',
            'documents.view',
            'documents.download',
            'reports.view',
        ]);

        // ========================================
        // 6. MANAGER / ADMINISTRATEUR GÉNÉRAL
        // Vue globale, reporting, analyses
        // ========================================
        $manager = Role::create(['name' => 'manager', 'guard_name' => 'web']);
        $manager->givePermissionTo([
            'dashboard.view',
            'users.view',
            'clients.view',
            'owners.view',
            'properties.view',
            'rentals.view',
            'contracts.view',
            'invoices.view',
            'payments.view',
            'treasury.view',
            'liquidations.view',
            'maintenance.view',
            'crm.view',
            'opportunities.view',
            'documents.view',
            'documents.download',
            'reports.view',
            'reports.financial',
            'reports.rental',
            'reports.technical',
            'reports.export',
            'analytics.view',
        ]);

        $this->command->info('✅ Rôles et permissions créés avec succès!');
        $this->command->info('📋 Rôles: Administrateur, Juridique, Comptable, Technique, Commercial, Manager');
    }
}
