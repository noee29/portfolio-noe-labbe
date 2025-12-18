<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formation;
use App\Http\Requests\FormationStoreRequest;
use App\Http\Requests\FormationUpdateRequest;

class FormationController extends Controller
{
    /**
     * Liste toutes les formations.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Formation::all());
    }

    /**
     * Crée une formation à partir des données validées.
     *
     * @param FormationStoreRequest $request Données de formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(FormationStoreRequest $request)
    {
        $formation = Formation::create($request->validated());
        return response()->json($formation, 201);
    }

    /**
     * Met à jour une formation existante.
     *
     * @param FormationUpdateRequest $request Données mises à jour
     * @param Formation $formation Modèle à modifier
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(FormationUpdateRequest $request, Formation $formation)
    {
        $formation->update($request->validated());
        return response()->json($formation);
    }

    /**
     * Supprime une formation.
     *
     * @param Formation $formation Modèle à supprimer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Formation $formation)
    {
        $formation->delete();
        return response()->json(['message' => 'Formation supprimée']);
    }
}
