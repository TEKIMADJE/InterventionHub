<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [

            [
                'nom' => 'Maintenance informatique',
                'description' => 'Maintenance des ordinateurs'
            ],

            [
                'nom' => 'Réseau',
                'description' => 'Installation et dépannage réseau'
            ],

            [
                'nom' => 'Logiciel',
                'description' => 'Installation et mise à jour des logiciels'
            ],

            [
                'nom' => 'Matériel',
                'description' => 'Réparation du matériel'
            ],

            [
                'nom' => 'Imprimante',
                'description' => 'Maintenance des imprimantes'
            ]

        ];

        foreach ($categories as $categorie) {

            Category::updateOrCreate(

                ['nom' => $categorie['nom']],

                $categorie

            );

        }
    }
}