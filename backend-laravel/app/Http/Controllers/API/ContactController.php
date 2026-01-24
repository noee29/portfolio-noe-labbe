<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

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
        $data = $request->validated();

        $contact = Contact::create($data);

        try {
            $contenu = "Nom : " . $data['name'] . "\n" .
                       "Email : " . $data['email'] . "\n\n" .
                       "Message :\n" . $data['message'];

            Mail::raw($contenu, function ($message) use ($data) {
                $message->to('noe.labbe29@gmail.com')
                        ->replyTo($data['email'], $data['name'])
                        ->subject('Nouveau message de contact - Portfolio');
            });
        } catch (\Throwable $e) {
            Log::error('Erreur envoi mail contact', [
                'error' => $e->getMessage(),
            ]);
        }

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
