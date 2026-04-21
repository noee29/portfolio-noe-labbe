<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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

    /**
     * Validation logique complémentaire pour gérer les updates partielles.
     * Si une seule date est envoyée, on compare avec l'autre date existante.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $formation = $this->route('formation');

            $startDate = $this->input('start_date');
            $endDate = $this->input('end_date');

            if (($startDate === null || $startDate === '') && $formation && $formation->start_date) {
                $startDate = $formation->start_date->format('Y-m-d');
            }

            if (($endDate === null || $endDate === '') && $formation && $formation->end_date) {
                $endDate = $formation->end_date->format('Y-m-d');
            }

            if ($startDate && $endDate && strtotime($endDate) < strtotime($startDate)) {
                $validator->errors()->add('end_date', 'La date de fin doit etre superieure ou egale a la date de debut.');
            }
        });
    }
}
