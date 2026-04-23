<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;


/**
 * Gère l'authentification admin avec Sanctum.
 *
<<<<<<< HEAD
 * login => token, token => accès aux routes protégées,
=======
 * Idée simple : login => token, token => accès aux routes protégées,
>>>>>>> 72aa03669fd8fdf2a94e788e9c1b8922819f3b94
 * logout => suppression des tokens.
 */
class AuthController extends Controller
{
    /**
     * Crée un nouvel utilisateur puis retourne un token Sanctum.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ], [
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email n\'est pas valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
            'password.confirmed' => 'Les mots de passe ne correspondent pas',
        ]);

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'name' => explode('@', $validated['email'])[0],
        ]);

        // Token envoyé au frontend pour les appels API admin.
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    /**
     * Vérifie les identifiants et retourne un token Sanctum si c'est valide.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'L\'adresse email est requise.',
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'password.required' => 'Le mot de passe est requis.',
        ]);

        // Vérifier si l'email existe
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'Aucun compte n\'existe avec cette adresse email.'
            ], 401);
        }

        // Vérifier le mot de passe
        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Mot de passe incorrect.'
            ], 401);
        }

        // Marque l'utilisateur comme connecté côté Laravel.
        Auth::login($user);

        // Token utilisé ensuite en Bearer côté frontend.
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user
        ]);
    }

     /**
      * Déconnecte l'utilisateur en supprimant ses tokens.
      */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

     /**
      * Retourne l'utilisateur actuellement authentifié.
      */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

     /**
      * Régénère un token en supprimant les anciens.
      *
      * Note: la méthode existe mais n'est pas routée dans routes/api.php.
      */
    public function refresh(Request $request)
    {
        /** @var User|null $user */
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 401);
        }
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Token rafraîchi',
            'token' => $token,
            'user' => $user
        ]);
    }
}

