<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Modèle Project : projets avec image, liens et ordre d'affichage.
 */
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'technologies',
        'image',
        'github_link',
        'demo_link',
        'featured',
        'order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Retourne l'URL publique complète de l'image stockée.
     *
     * @return string|null URL ou null si aucune image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // Si c'est une URL complète, retourne telle quelle
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Sinon, génère l'URL depuis le storage
        return Storage::url($this->image);
    }

    /**
     * Filtre uniquement les projets mis en avant.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Trie par `order` ascendant puis par date de création descendante.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('created_at', 'desc');
    }
}
