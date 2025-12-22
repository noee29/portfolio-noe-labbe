<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;

class ContactController extends Controller
{
    /**
     * Liste tous les messages de contact.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Contact::all());
    }

    /**
     * Crée un nouveau message de contact à partir des données validées.
     *
     * @param ContactStoreRequest $request Données de contact validées
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ContactStoreRequest $request)
    {
        $contact = Contact::create($request->validated());
        return response()->json($contact, 201);
    }

    /**
     * Met à jour un message de contact existant.
     *
     * @param ContactUpdateRequest $request Données mises à jour validées
     * @param Contact $contact Modèle à modifier
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ContactUpdateRequest $request, Contact $contact)
    {
        $contact->update($request->validated());
        return response()->json($contact);
    }

    /**
     * Supprime un message de contact.
     *
     * @param Contact $contact Modèle à supprimer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['message' => 'Contact supprimé']);
    }

    /**
     * Marque un message de contact comme lu.
     *
     * @param Contact $contact Message à marquer
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead(Contact $contact)
    {
        $contact->update(['read' => true]);
        return response()->json(['message' => 'Message marqué comme lu', 'contact' => $contact]);
    }
}
