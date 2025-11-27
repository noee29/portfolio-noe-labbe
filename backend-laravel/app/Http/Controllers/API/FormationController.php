<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formation;
use App\Http\Requests\FormationStoreRequest;
use App\Http\Requests\FormationUpdateRequest;

class FormationController extends Controller
{
    public function index()
    {
        return response()->json(Formation::all());
    }

    public function store(FormationStoreRequest $request)
    {
        $formation = Formation::create($request->validated());
        return response()->json($formation, 201);
    }

    public function update(FormationUpdateRequest $request, Formation $formation)
    {
        $formation->update($request->validated());
        return response()->json($formation);
    }

    public function destroy(Formation $formation)
    {
        $formation->delete();
        return response()->json(['message' => 'Formation supprimée']);
    }
}
