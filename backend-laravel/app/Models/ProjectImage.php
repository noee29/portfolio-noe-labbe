<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle ProjectImage : captures d'écran et vidéos associées à un projet.
 */
class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'file_path',
        'file_type',
        'order',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Retourne le projet auquel appartient cette image.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
