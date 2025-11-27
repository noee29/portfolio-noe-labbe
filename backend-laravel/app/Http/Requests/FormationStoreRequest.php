<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormationStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
