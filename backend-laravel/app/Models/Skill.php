<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Modèle Skill : compétences avec niveau et catégorie.
 */
class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'level',
        'icon',
    ];

    protected $casts = [
        'level' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = [
        'icon_url',
    ];

    /**
     * Retourne l'URL publique de l'icone.
     */
    public function getIconUrlAttribute()
    {
        if (!$this->icon) {
            return null;
        }

        if (str_starts_with($this->icon, 'http://') || str_starts_with($this->icon, 'https://')) {
            return $this->icon;
        }

        return Storage::url($this->icon);
    }

    /**
     * Filtre les compétences par catégorie.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $category Catégorie ciblée
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Trie les compétences par niveau décroissant.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByLevel($query)
    {
        return $query->orderBy('level', 'desc');
    }

    /**
     * Récupère la liste des catégories uniques.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getCategories()
    {
        return self::select('category')->distinct()->pluck('category');
    }
}
