<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formation;

class FormationController extends Controller
{
    public function index()
    {
        $formations = Formation::orderBy('start_date', 'desc')->get();
        return response()->json(['data' => $formations], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'school' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $formation = Formation::create($validated);

        return response()->json(['message' => 'Formation créée', 'data' => $formation], 201);
    }

    public function show(Formation $formation)
    {
        return response()->json(['data' => $formation], 200);
    }

    public function update(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'school' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $formation->update($validated);

        return response()->json(['message' => 'Formation mise à jour', 'data' => $formation], 200);
    }

    public function destroy(Formation $formation)
    {
        $formation->delete();
        return response()->json(['message' => 'Formation supprimée'], 200);
    }
}
