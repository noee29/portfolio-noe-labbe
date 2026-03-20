<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillStoreRequest extends FormRequest
{
    /**
     * Autorise la création de compétence.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour créer une compétence.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'level'    => ['nullable', 'integer', 'between:1,100'],
            'icon'     => ['nullable', 'file', 'mimes:png,jpg,jpeg', 'max:2048'],
        ];
    }
}
