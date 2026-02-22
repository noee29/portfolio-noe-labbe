<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Http\Requests\FormationStoreRequest;
use App\Http\Requests\FormationUpdateRequest;

class FormationController extends Controller
{
    // Récupérer toutes les formations
    public function index()
    {
        try {
            $formations = Formation::all();
            return response()->json($formations);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Créer une nouvelle formation
    public function store(FormationStoreRequest $request)
    {
        try {
            $formation = Formation::create($request->validated());
            return response()->json($formation, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Modifier une formation
    public function update(FormationUpdateRequest $request, Formation $formation)
    {
        try {
            $formation->update($request->validated());
            return response()->json($formation);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Supprimer une formation
    public function destroy(Formation $formation)
    {
        try {
            $formation->delete();
            return response()->json(['message' => 'Formation supprimée']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }
}
