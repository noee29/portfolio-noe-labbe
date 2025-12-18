<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
