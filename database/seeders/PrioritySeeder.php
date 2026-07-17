<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Priority;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [

            [
                'nom' => 'Faible',
                'description' => 'Intervention non urgente'
            ],

            [
                'nom' => 'Moyenne',
                'description' => 'Intervention à traiter normalement'
            ],

            [
                'nom' => 'Haute',
                'description' => 'Intervention importante'
            ],

            [
                'nom' => 'Urgente',
                'description' => 'Intervention critique nécessitant une prise en charge immédiate'
            ]

        ];

        foreach ($priorities as $priority) {

            Priority::updateOrCreate(

                ['nom' => $priority['nom']],

                $priority

            );

        }
    }
}
