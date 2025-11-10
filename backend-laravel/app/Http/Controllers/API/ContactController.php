<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    // PUBLIC : enregistrer un message
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact = Contact::create([
            'name'    => $request->name,
            'email'   => $request->email,
            'message' => $request->message,
            'read'    => false,
        ]);

        return response()->json(['message' => 'Message envoyé', 'data' => $contact], 201);
    }

    // ADMIN : lister tous les messages
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }

    // ADMIN : marquer comme lu
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['read' => true]);
        return response()->json($contact);
    }

    // ADMIN : supprimer
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Message supprimé']);
    }
}
