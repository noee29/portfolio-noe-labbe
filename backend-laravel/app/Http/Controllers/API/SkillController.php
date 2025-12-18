<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Requests\SkillStoreRequest;
use App\Http\Requests\SkillUpdateRequest;

class SkillController extends Controller
{
    /**
     * Retourne toutes les compétences.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Skill::all());
    }

    /**
     * Crée une compétence à partir des données validées.
     *
     * @param SkillStoreRequest $request Données de compétence
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SkillStoreRequest $request)
    {
        $skill = Skill::create($request->validated());
        return response()->json($skill, 201);
    }

    /**
     * Met à jour une compétence existante.
     *
     * @param SkillUpdateRequest $request Données mises à jour
     * @param Skill $skill Modèle à modifier
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(SkillUpdateRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return response()->json($skill);
    }

    /**
     * Supprime une compétence.
     *
     * @param Skill $skill Modèle à supprimer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Skill supprimé']);
    }
}
