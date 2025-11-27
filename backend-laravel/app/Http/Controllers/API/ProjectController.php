<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('order')->get());
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $data['order'] = Project::count(); // ajouté en dernier

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Projet supprimé']);
    }

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
