<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Http\Requests\SkillStoreRequest;
use App\Http\Requests\SkillUpdateRequest;

class SkillController extends Controller
{
    // Récupérer toutes les compétences
    public function index()
    {
        try {
            $skills = Skill::all();
            return response()->json($skills);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Créer une nouvelle compétence
    public function store(SkillStoreRequest $request)
    {
        try {
            $skill = Skill::create($request->validated());
            return response()->json($skill, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Modifier une compétence
    public function update(SkillUpdateRequest $request, Skill $skill)
    {
        try {
            $skill->update($request->validated());
            return response()->json($skill);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Supprimer une compétence
    public function destroy(Skill $skill)
    {
        try {
            $skill->delete();
            return response()->json(['message' => 'Compétence supprimée']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }
}
