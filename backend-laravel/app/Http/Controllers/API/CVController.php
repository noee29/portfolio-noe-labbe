<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CVController extends Controller
{
    // Récupérer le CV actuel
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

    // Uploader un nouveau CV
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
