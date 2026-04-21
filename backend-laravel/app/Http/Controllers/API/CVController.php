<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CVController extends Controller
{
    /**
     * Récupère le CV publié.
     *
     * Utilisé côté admin pour prévisualiser le fichier actif, et côté public pour exposer le CV.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        // Chercher le fichier CV dans storage/app/public/cv/
        $files = Storage::disk('public')->files('cv');

        if (empty($files)) {
            return response()->json(['file' => null, 'url' => null]);
        }

        $file = $files[0];
        $url = asset('storage/' . $file);

        return response()->json([
            'file' => basename($file),
            'url' => $url,
        ]);
    }

    /**
     * Remplace le CV existant par un nouveau fichier PDF.
     *
     * Supprime les anciens fichiers avant de stocker la nouvelle version.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'cv' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ]);

        // Supprimer les anciens CV
        $anciensFichiers = Storage::disk('public')->files('cv');
        foreach ($anciensFichiers as $ancien) {
            Storage::disk('public')->delete($ancien);
        }

        // Stocker le nouveau
        $path = $request->file('cv')->store('cv', 'public');

        return response()->json([
            'message' => 'CV mis à jour.',
            'file' => basename($path),
            'url' => asset('storage/' . $path),
        ]);
    }
}
