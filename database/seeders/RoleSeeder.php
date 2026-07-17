<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'nom' => 'Administrateur',
                'description' => 'Gestion complète de la plateforme',
            ],
            [
                'nom' => 'Responsable technique',
                'description' => 'Planifie les interventions, affecte les techniciens et supervise les travaux',
            ],
            [
                'nom' => 'Technicien',
                'description' => 'Exécute les interventions techniques',
            ],
            [
                'nom' => 'Client',
                'description' => 'Crée et suit les demandes d\'intervention',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['nom' => $role['nom']],
                ['description' => $role['description']]
            );
        }
    }
}