<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormationStoreRequest extends FormRequest
{
    /**
     * Autorise la création de formation.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour créer une formation.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'school'      => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'year_start'  => ['required', 'integer', 'min:1900', 'max:' . date('Y')],
            'year_end'    => ['nullable', 'integer', 'min:1900', 'max:' . (date('Y') + 10)],
        ];
    }
}
