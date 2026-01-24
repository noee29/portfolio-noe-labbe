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
            'name' => explode('@', $validated['email'])[0], // Nom par défaut depuis email
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
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        /** @var User|null $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => "Utilisateur introuvable après l'authentification"], 500);
        }

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

