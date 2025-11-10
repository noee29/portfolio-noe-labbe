<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
     * Scope pour récupérer les skills par catégorie
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope pour trier par niveau décroissant
     */
    public function scopeByLevel($query)
    {
        return $query->orderBy('level', 'desc');
    }

    /**
     * Récupérer toutes les catégories uniques
     */
    public static function getCategories()
    {
        return self::select('category')->distinct()->pluck('category');
    }
}
