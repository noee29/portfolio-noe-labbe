<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('id')->get();
        return response()->json($skills);
    }

    public function show($id)
    {
        $skill = Skill::findOrFail($id);
        return response()->json($skill);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $skill = Skill::create($request->only(['name','category','level','icon']));
        return response()->json($skill, 201);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->only(['name','category','level','icon']));
        return response()->json($skill);
    }

    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Skill supprimée']);
    }
}
