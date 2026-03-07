<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;


class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur.
     *
     * @param Request $request Données d'inscription (email, password, password_confirmation)
     * @return \Illuminate\Http\JsonResponse
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

        // Token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    /**
     * Authentifie un utilisateur et génère un token Sanctum.
     *
     * @param Request $request Données de connexion (email, password)
     * @return \Illuminate\Http\JsonResponse
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

        // Authentifier l'utilisateur
        Auth::login($user);

        // Token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * Révoque tous les tokens de l'utilisateur courant.
     *
     * @param Request $request Requête authentifiée
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    /**
     * Retourne l'utilisateur authentifié.
     *
     * @param Request $request Requête authentifiée
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Rafraîchit le token Sanctum de l'utilisateur courant.
     *
     * @param Request $request Requête authentifiée
     * @return \Illuminate\Http\JsonResponse
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

