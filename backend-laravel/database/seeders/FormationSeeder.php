<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Seeder;

/**
 * Seeder pour remplir la table formations avec le parcours scolaire.
 */
class FormationSeeder extends Seeder
{
    public function run(): void
    {
        // On vide la table avant de la remplir
        Formation::truncate();

        // Liste des formations (de la plus récente à la plus ancienne)
        $formations = [
            [
                'degree'      => 'Licence 3',
                'field'       => 'Informatique (EDN)',
                'school'      => 'Université Catholique de Lille',
                'start_date'  => '2025-09-01',
                'end_date'    => '2026-06-30',
                'description' => 'Parcours Data',
            ],
            [
                'degree'      => 'Licence 2',
                'field'       => 'Informatique (EDN)',
                'school'      => 'Université Catholique de Lille',
                'start_date'  => '2024-09-01',
                'end_date'    => '2025-06-30',
                'description' => null,
            ],
            [
                'degree'      => 'Licence 1',
                'field'       => 'Informatique (EDN)',
                'school'      => 'Université Catholique de Lille',
                'start_date'  => '2023-09-01',
                'end_date'    => '2024-06-30',
                'description' => null,
            ],
            [
                'degree'      => 'Licence 1',
                'field'       => 'Mathématiques MIASHS',
                'school'      => 'Université de Lille',
                'start_date'  => '2022-09-01',
                'end_date'    => '2023-06-30',
                'description' => null,
            ],
            [
                'degree'      => 'BAC mention Bien',
                'field'       => 'Mathématiques et Sciences Économiques et Sociales',
                'school'      => 'Lycée Charlotte Perriand, Genech',
                'start_date'  => '2022-06-01',
                'end_date'    => null,
                'description' => 'Spécialités : Mathématiques et Sciences Économiques et Sociales',
            ],
        ];

        // On crée chaque formation dans la base de données
        foreach ($formations as $formation) {
            Formation::create($formation);
        }
    }
}
