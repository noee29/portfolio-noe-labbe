<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Récupérer tous les projets
     */
    public function index(Request $request)
    {
        try {
            $query = Project::query();

            // Filtrer par featured si demandé
            if ($request->has('featured')) {
                $query->where('featured', $request->featured);
            }

            // Filtrer par technologie si demandé
            if ($request->has('technology')) {
                $query->whereJsonContains('technologies', $request->technology);
            }

            // Trier les projets
            $projects = $query->ordered()->get();

            // Ajouter l'URL complète de l'image
            $projects->each(function ($project) {
                $project->image_url = $project->image_url;
            });

            return response()->json([
                'success' => true,
                'data' => $projects
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des projets',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer un projet spécifique
     */
    public function show($id)
    {
        try {
            $project = Project::findOrFail($id);
            $project->image_url = $project->image_url;

            return response()->json([
                'success' => true,
                'data' => $project
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Projet non trouvé'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du projet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer un nouveau projet
     */
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string|min:50',
                'technologies' => 'required|array|min:1',
                'technologies.*' => 'string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
                'github_link' => 'nullable|url|max:255',
                'demo_link' => 'nullable|url|max:255',
                'featured' => 'boolean',
                'order' => 'nullable|integer|min:0',
            ], [
                'title.required' => 'Le titre est obligatoire',
                'description.required' => 'La description est obligatoire',
                'description.min' => 'La description doit contenir au moins 50 caractères',
                'technologies.required' => 'Au moins une technologie doit être renseignée',
                'image.image' => 'Le fichier doit être une image',
                'image.max' => 'L\'image ne doit pas dépasser 2 Mo',
                'github_link.url' => 'Le lien GitHub doit être une URL valide',
                'demo_link.url' => 'Le lien de démo doit être une URL valide',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Gestion de l'upload d'image
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . Str::slug($request->title) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('projects', $filename, 'public');
                $data['image'] = $path;
            }

            // Si order n'est pas fourni, le mettre à la fin
            if (!isset($data['order'])) {
                $data['order'] = Project::max('order') + 1;
            }

            // Créer le projet
            $project = Project::create($data);
            $project->image_url = $project->image_url;

            return response()->json([
                'success' => true,
                'message' => 'Projet créé avec succès',
                'data' => $project
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du projet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un projet
     */
    public function update(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);

            // Validation des données
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string|min:50',
                'technologies' => 'sometimes|array|min:1',
                'technologies.*' => 'string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
                'github_link' => 'nullable|url|max:255',
                'demo_link' => 'nullable|url|max:255',
                'featured' => 'boolean',
                'order' => 'nullable|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Gestion de l'upload d'image
            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image
                if ($project->image && Storage::disk('public')->exists($project->image)) {
                    Storage::disk('public')->delete($project->image);
                }

                $image = $request->file('image');
                $filename = time() . '_' . Str::slug($request->title ?? $project->title) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('projects', $filename, 'public');
                $data['image'] = $path;
            }

            // Mettre à jour le projet
            $project->update($data);
            $project->image_url = $project->image_url;

            return response()->json([
                'success' => true,
                'message' => 'Projet mis à jour avec succès',
                'data' => $project
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Projet non trouvé'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du projet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un projet
     */
    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);

            // Supprimer l'image associée
            if ($project->image && Storage::disk('public')->exists($project->image)) {
                Storage::disk('public')->delete($project->image);
            }

            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Projet supprimé avec succès'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Projet non trouvé'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du projet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Réorganiser l'ordre des projets
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reorder(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'projects' => 'required|array',
                'projects.*.id' => 'required|exists:projects,id',
                'projects.*.order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            foreach ($request->projects as $projectData) {
                Project::where('id', $projectData['id'])
                    ->update(['order' => $projectData['order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Ordre des projets mis à jour avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la réorganisation',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
