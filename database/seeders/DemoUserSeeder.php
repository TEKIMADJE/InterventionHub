<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            [
                'name' => 'Administrateur Démo',
                'email' => 'admin@interventionhub.test',
                'role' => 'Administrateur',
            ],
            [
                'name' => 'Responsable Démo',
                'email' => 'manager@interventionhub.test',
                'role' => 'Responsable technique',
            ],
            [
                'name' => 'Technicien Démo',
                'email' => 'technician@interventionhub.test',
                'role' => 'Technicien',
            ],
            [
                'name' => 'Client Démo',
                'email' => 'client@interventionhub.test',
                'role' => 'Client',
            ],
        ];

        foreach ($accounts as $account) {
            $role = Role::where(
                'nom',
                $account['role']
            )->firstOrFail();

            User::updateOrCreate(
                [
                    'email' => $account['email'],
                ],
                [
                    'name' => $account['name'],
                    'role_id' => $role->id,
                    'password' => Hash::make('Demo@2026'),
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}