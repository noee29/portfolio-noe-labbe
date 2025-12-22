<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillUpdateRequest extends FormRequest
{
    /**
     * Autorise la mise à jour de compétence.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour mettre à jour une compétence.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name'     => ['sometimes', 'string', 'max:255'],
            'category' => ['sometimes', 'nullable', 'string', 'max:255'],
            'level'    => ['sometimes', 'integer', 'between:1,100'],
            'icon'     => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
