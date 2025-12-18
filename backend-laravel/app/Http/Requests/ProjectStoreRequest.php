<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectStoreRequest extends FormRequest
{
    /**
     * Autorise la requête (aucune restriction ici).
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour la création d'un projet.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'technos'     => ['nullable', 'string'],
            'github'      => ['nullable', 'url'],
            'website'     => ['nullable', 'url'],
            'image'       => ['nullable', 'image', 'max:2048'],
        ];
    }
}
