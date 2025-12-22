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
            'school'      => ['required', 'string', 'max:255'],
            'degree'      => ['nullable', 'string', 'max:255'],
            'field'       => ['nullable', 'string', 'max:255'],
            'start_date'  => ['nullable', 'date', 'date_format:Y-m-d'],
            'end_date'    => ['nullable', 'date', 'date_format:Y-m-d', 'after_or_equal:start_date'],
            'description' => ['nullable', 'string'],
        ];
    }
}
