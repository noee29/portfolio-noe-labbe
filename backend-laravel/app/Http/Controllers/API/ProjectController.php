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
        $data = $this->normalizeProjectData($request->validated(), $request);

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
        $data = $this->normalizeProjectData($request->validated(), $request);

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

        /**
         * Normalise les champs de projet (compatibilité anciens noms et format technos).
         *
         * @param array $data Données validées
         * @param Request $request Requête brute (pour récupérer d'anciens champs éventuels)
         * @return array
         */
        private function normalizeProjectData(array $data, Request $request): array
        {
            if (!isset($data['technologies']) && $request->filled('technos')) {
                $data['technologies'] = $this->parseTechnologies($request->input('technos'));
            }

            if (isset($data['technologies']) && is_string($data['technologies'])) {
                $data['technologies'] = $this->parseTechnologies($data['technologies']);
            }

            if (!isset($data['github_link']) && $request->filled('github')) {
                $data['github_link'] = $request->input('github');
            }

            if (!isset($data['demo_link']) && $request->filled('website')) {
                $data['demo_link'] = $request->input('website');
            }

            return $data;
        }

        /**
         * Transforme une chaîne de technos en tableau (séparateur virgule ou point-virgule).
         *
         * @param string $value
         * @return array
         */
        private function parseTechnologies(string $value): array
        {
            return collect(preg_split('/[,;]+/', $value))
                ->map(fn ($item) => trim($item))
                ->filter()
                ->values()
                ->all();
        }
}
