<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormationUpdateRequest extends FormRequest
{
    /**
     * Autorise la mise à jour de formation.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour mettre à jour une formation.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'string', 'max:255'],
            'school'      => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'year_start'  => ['sometimes', 'integer', 'min:1900', 'max:' . date('Y')],
            'year_end'    => ['sometimes', 'nullable', 'integer', 'min:1900', 'max:' . (date('Y') + 10)],
        ];
    }
}
