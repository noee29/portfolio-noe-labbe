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
            'school'      => ['sometimes', 'string', 'max:255'],
            'degree'      => ['sometimes', 'nullable', 'string', 'max:255'],
            'field'       => ['sometimes', 'nullable', 'string', 'max:255'],
            'start_date'  => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],
            'end_date'    => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d', 'after_or_equal:start_date'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
