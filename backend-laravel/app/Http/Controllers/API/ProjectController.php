<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    // Récupérer tous les projets (triés par ordre) avec leurs images
    public function index()
    {
        try {
            $projets = Project::with('images')->orderBy('order')->get();
            return response()->json($projets);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Afficher un seul projet avec ses images
    public function show(Project $project)
    {
        try {
            $project->load('images');
            return response()->json($project);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Créer un nouveau projet
    public function store(ProjectStoreRequest $request)
    {
        try {
            $data = $request->validated();

            $data = $this->fixOldFieldNames($data, $request);

            // Convertir les technologies en tableau si c'est une chaîne
            if (isset($data['technologies']) && is_string($data['technologies'])) {
                $data['technologies'] = $this->splitTechnologies($data['technologies']);
            }

            // Stocker l'image si elle est envoyée
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('projects', 'public');
            }

            // Définir l'ordre : le nouveau projet va à la fin
            $data['order'] = Project::count();

            $projet = Project::create($data);
            return response()->json($projet, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Modifier un projet existant
    public function update(ProjectUpdateRequest $request, Project $project)
    {
        try {
            $data = $request->validated();

            $data = $this->fixOldFieldNames($data, $request);

            // Convertir les technologies en tableau si c'est une chaîne
            if (isset($data['technologies']) && is_string($data['technologies'])) {
                $data['technologies'] = $this->splitTechnologies($data['technologies']);
            }

            // Remplacer l'image si une nouvelle est envoyée
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('projects', 'public');
            }

            $project->update($data);
            return response()->json($project);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Supprimer un projet
    public function destroy(Project $project)
    {
        try {
            $project->delete();
            return response()->json(['message' => 'Projet supprimé']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Changer l'ordre d'affichage des projets
    public function reorder(Request $request)
    {
        try {
            $request->validate([
                'order'   => 'required|array',
                'order.*' => 'integer',
            ]);

            foreach ($request->order as $position => $projetId) {
                Project::where('id', $projetId)->update(['order' => $position]);
            }

            return response()->json(['message' => 'Ordre mis à jour']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Ajouter des captures image/video a un projet
    public function addMedia(Request $request, Project $project)
    {
        try {
            $request->validate([
                'files' => 'required|array|min:1',
                'files.*' => 'file|mimes:png,jpg,jpeg,mp4|max:20480',
            ]);

            $ordre = $project->images()->count();

            foreach ($request->file('files') as $fichier) {
                $mime = $fichier->getMimeType();
                $type = 'image';
                if (str_starts_with((string) $mime, 'video/')) {
                    $type = 'video';
                }

                $path = $fichier->store('project-media', 'public');

                ProjectImage::create([
                    'project_id' => $project->id,
                    'file_path' => $path,
                    'file_type' => $type,
                    'order' => $ordre,
                ]);

                $ordre++;
            }

            $project->load('images');
            return response()->json($project);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de l\'upload des medias'], 500);
        }
    }

    // Supprimer un media d'un projet
    public function deleteMedia(Project $project, ProjectImage $media)
    {
        try {
            if ($media->project_id !== $project->id) {
                return response()->json(['message' => 'Media introuvable pour ce projet'], 404);
            }

            Storage::disk('public')->delete($media->file_path);
            $media->delete();

            return response()->json(['message' => 'Media supprime']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression du media'], 500);
        }
    }


    private function fixOldFieldNames(array $data, Request $request): array
    {
        // "technos" -> "technologies"
        if (!isset($data['technologies']) && $request->filled('technos')) {
            $data['technologies'] = $this->splitTechnologies($request->input('technos'));
        }

        // "github" -> "github_link"
        if (!isset($data['github_link']) && $request->filled('github')) {
            $data['github_link'] = $request->input('github');
        }

        // "website" -> "demo_link"
        if (!isset($data['demo_link']) && $request->filled('website')) {
            $data['demo_link'] = $request->input('website');
        }

        return $data;
    }

    // Transformer une chaîne "React, Node, PHP" en tableau ["React", "Node", "PHP"]
    private function splitTechnologies(string $texte): array
    {
        $parties = preg_split('/[,;]+/', $texte);

        $resultat = [];
        foreach ($parties as $partie) {
            $partie = trim($partie);
            if ($partie !== '') {
                $resultat[] = $partie;
            }
        }

        return $resultat;
    }
}
