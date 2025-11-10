<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\FormationController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\AuthController;

// Routes publiques
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/formations', [FormationController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

// Authentification
Route::post('/login', [AuthController::class, 'login']);

// Routes admin
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Projects
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::put('/admin/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{id}', [ProjectController::class, 'destroy']);
    Route::post('/admin/projects/reorder', [ProjectController::class, 'reorder']);

    // Skills
    Route::post('/admin/skills', [SkillController::class, 'store']);
    Route::put('/admin/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/admin/skills/{id}', [SkillController::class, 'destroy']);

    // Formations
    Route::post('/admin/formations', [FormationController::class, 'store']);
    Route::put('/admin/formations/{id}', [FormationController::class, 'update']);
    Route::delete('/admin/formations/{id}', [FormationController::class, 'destroy']);

    // Contacts
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::patch('/admin/contacts/{id}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/admin/contacts/{id}', [ContactController::class, 'destroy']);
});
