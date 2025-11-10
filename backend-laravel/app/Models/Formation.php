<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Formation extends Model
{
    use HasFactory;

    /**
     * Les attributs assignables en masse
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school',
        'degree',
        'field',
        'start_date',
        'end_date',
        'description',
    ];

    /**
     * Les attributs qui doivent être castés
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Les attributs qui doivent être cachés pour les tableaux
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * Les accesseurs à ajouter au modèle
     *
     * @var array<int, string>
     */
    protected $appends = ['duration', 'is_current', 'formatted_period'];

    /**
     * Accesseur pour obtenir la durée de la formation
     * Retourne la durée en mois ou années
     *
     * @return string
     */
    public function getDurationAttribute()
    {
        if (!$this->start_date) {
            return null;
        }

        $end = $this->end_date ?? now();
        $start = Carbon::parse($this->start_date);
        $endDate = Carbon::parse($end);

        $months = $start->diffInMonths($endDate);
        $years = $start->diffInYears($endDate);

        if ($years > 0) {
            $remainingMonths = $months % 12;
            if ($remainingMonths > 0) {
                return $years . ' an' . ($years > 1 ? 's' : '') . ' et ' . $remainingMonths . ' mois';
            }
            return $years . ' an' . ($years > 1 ? 's' : '');
        }

        return $months . ' mois';
    }

    /**
     * Accesseur pour savoir si la formation est en cours
     *
     * @return bool
     */
    public function getIsCurrentAttribute()
    {
        return is_null($this->end_date) || Carbon::parse($this->end_date)->isFuture();
    }

    /**
     * Accesseur pour obtenir la période formatée
     * Ex: "Sept 2022 - Juin 2025" ou "Sept 2022 - En cours"
     *
     * @return string
     */
    public function getFormattedPeriodAttribute()
    {
        if (!$this->start_date) {
            return null;
        }

        $start = Carbon::parse($this->start_date)->locale('fr');
        $startFormatted = ucfirst($start->translatedFormat('M Y'));

        if (!$this->end_date) {
            return $startFormatted . ' - En cours';
        }

        $end = Carbon::parse($this->end_date)->locale('fr');
        $endFormatted = ucfirst($end->translatedFormat('M Y'));

        return $startFormatted . ' - ' . $endFormatted;
    }

    /**
     * Accesseur pour obtenir l'année de début
     *
     * @return int|null
     */
    public function getStartYearAttribute()
    {
        return $this->start_date ? Carbon::parse($this->start_date)->year : null;
    }

    /**
     * Accesseur pour obtenir l'année de fin
     *
     * @return int|null
     */
    public function getEndYearAttribute()
    {
        return $this->end_date ? Carbon::parse($this->end_date)->year : null;
    }

    /**
     * Scope pour récupérer les formations en cours
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrent($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('end_date')
              ->orWhere('end_date', '>', now());
        });
    }

    /**
     * Scope pour récupérer les formations terminées
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->whereNotNull('end_date')
                     ->where('end_date', '<=', now());
    }

    /**
     * Scope pour trier par date de début (plus récent en premier)
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('start_date', 'desc');
    }

    /**
     * Scope pour trier par date de début (plus ancien en premier)
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOldest($query)
    {
        return $query->orderBy('start_date', 'asc');
    }

    /**
     * Scope pour filtrer par école
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $school
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBySchool($query, $school)
    {
        return $query->where('school', 'like', "%{$school}%");
    }

    /**
     * Scope pour filtrer par domaine
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $field
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByField($query, $field)
    {
        return $query->where('field', 'like', "%{$field}%");
    }

    /**
     * Scope pour récupérer les formations par année
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $year
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByYear($query, $year)
    {
        return $query->whereYear('start_date', '<=', $year)
                     ->where(function ($q) use ($year) {
                         $q->whereNull('end_date')
                           ->orWhereYear('end_date', '>=', $year);
                     });
    }

    /**
     * Obtenir toutes les écoles uniques
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getSchools()
    {
        return self::select('school')
                   ->distinct()
                   ->orderBy('school')
                   ->pluck('school');
    }

    /**
     * Obtenir tous les domaines uniques
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getFields()
    {
        return self::select('field')
                   ->distinct()
                   ->orderBy('field')
                   ->pluck('field');
    }
}
