<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;

class ContactController extends Controller
{
    /**
     * Liste tous les messages de contact pour l'administration.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $contacts = Contact::all();
            return response()->json($contacts);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Créer un nouveau message de contact
    public function store(ContactStoreRequest $request)
    {
        try {
            $data = $request->validated();
            $contact = Contact::create($data);

            return response()->json($contact, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    // Modifier un message de contact
    public function update(ContactUpdateRequest $request, Contact $contact)
    {
        try {
            $contact->update($request->validated());
            return response()->json($contact);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    /**
     * Supprime un message de contact depuis l'admin.
     *
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Contact $contact)
    {
        try {
            $contact->delete();
            return response()->json(['message' => 'Contact supprimé']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }

    /**
     * Marque un message de contact comme lu dans l'administration.
     *
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead(Contact $contact)
    {
        try {
            $contact->update(['read' => true]);
            return response()->json([
                'message' => 'Message marqué comme lu',
                'contact' => $contact,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur de connexion à la base de données'], 500);
        }
    }
}
