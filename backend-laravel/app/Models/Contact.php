<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle Contact : messages envoyés via le formulaire.
 * Champs : name, email, message, read (bool).
 */
class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'message',
        'read',
    ];

    protected $casts = [
        'read' => 'boolean',
    ];
}
