<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectUpdateRequest extends FormRequest
{
    /**
     * Autorise la requête de mise à jour.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour la mise à jour d'un projet.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title'         => ['sometimes', 'string', 'max:255'],
            'description'   => ['sometimes', 'string'],
            'technologies'  => ['sometimes', 'array'],
            'technologies.*'=> ['string', 'max:255'],
            'github_link'   => ['sometimes', 'nullable', 'url'],
            'demo_link'     => ['sometimes', 'nullable', 'url'],
            'featured'      => ['sometimes', 'boolean'],
            'order'         => ['sometimes', 'integer'],
            'image'         => ['sometimes', 'nullable', 'image', 'max:2048'],
        ];
    }
}
