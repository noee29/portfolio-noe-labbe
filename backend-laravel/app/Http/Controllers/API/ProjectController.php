<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;

class ProjectController extends Controller
{
    /**
     * Retourne les projets triés par ordre d'affichage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Project::orderBy('order')->get());
    }

    /**
     * Affiche un projet spécifique.
     *
     * @param Project $project Projet ciblé (injection de route-model binding)
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Project $project)
    {
        return response()->json($project);
    }

    /**
     * Crée un projet, stocke l'image si présente et définit l'ordre.
     *
     * @param ProjectStoreRequest $request Données validées du projet
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $data['order'] = Project::count();

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    /**
     * Met à jour un projet existant et remplace l'image si fournie.
     *
     * @param ProjectUpdateRequest $request Données validées mises à jour
     * @param Project $project Projet à modifier
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return response()->json($project);
    }

    /**
     * Supprime un projet.
     *
     * @param Project $project Projet à supprimer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Projet supprimé']);
    }

    /**
     * Met à jour l'ordre d'affichage des projets.
     *
     * @param Request $request Tableau `order` contenant les IDs dans le nouvel ordre
     * @return \Illuminate\Http\JsonResponse
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'order' => 'required|array',
            'order.*' => 'integer'
        ]);

        foreach ($request->order as $index => $projectId) {
            Project::where('id', $projectId)->update(['order' => $index]);
        }

        return response()->json(['message' => 'Ordre mis à jour']);
    }
}
