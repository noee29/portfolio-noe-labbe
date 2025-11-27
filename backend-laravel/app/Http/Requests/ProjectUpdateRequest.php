<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'technos'     => ['sometimes', 'string'],
            'github'      => ['sometimes', 'nullable', 'url'],
            'website'     => ['sometimes', 'nullable', 'url'],
            'image'       => ['sometimes', 'nullable', 'image', 'max:2048'],
        ];
    }
}
