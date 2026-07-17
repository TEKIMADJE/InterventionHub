<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [

            [
                'nom' => 'En attente',
                'description' => 'Intervention créée'
            ],

            [
                'nom' => 'Affectée',
                'description' => 'Technicien affecté'
            ],

            [
                'nom' => 'En cours',
                'description' => 'Intervention en cours'
            ],

            [
                'nom' => 'Terminée',
                'description' => 'Intervention terminée'
            ],

            [
                'nom' => 'Annulée',
                'description' => 'Intervention annulée'
            ]
        ];

        foreach ($statuses as $status) {

            Status::updateOrCreate(

                ['nom' => $status['nom']],

                $status

            );
        }
    }
}
