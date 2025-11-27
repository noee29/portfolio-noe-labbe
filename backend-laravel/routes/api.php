<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\FormationController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\AuthController;

/*
Routes publiques
*/

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/formations', [FormationController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);


// Auth
Route::post('/login', [AuthController::class, 'login']);


/*
Routes Admin protégées (Sanctum)
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth actions
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    /*
    Projects (Admin)
    */
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::put('/admin/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

    // Reorder Projects
    Route::post('/admin/projects/reorder', [ProjectController::class, 'reorder']);


    /*
    Skills (Admin)
    */
    Route::post('/admin/skills', [SkillController::class, 'store']);
    Route::put('/admin/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/admin/skills/{skill}', [SkillController::class, 'destroy']);


    /*
    Formations (Admin)
    */
    Route::post('/admin/formations', [FormationController::class, 'store']);
    Route::put('/admin/formations/{formation}', [FormationController::class, 'update']);
    Route::delete('/admin/formations/{formation}', [FormationController::class, 'destroy']);


    /*
    Contacts (Admin)
    */
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::patch('/admin/contacts/{contact}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
});
