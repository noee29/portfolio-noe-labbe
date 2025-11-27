<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Requests\SkillStoreRequest;
use App\Http\Requests\SkillUpdateRequest;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::all());
    }

    public function store(SkillStoreRequest $request)
    {
        $skill = Skill::create($request->validated());
        return response()->json($skill, 201);
    }

    public function update(SkillUpdateRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Skill supprimé']);
    }
}
