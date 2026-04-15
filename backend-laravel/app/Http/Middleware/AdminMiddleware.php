<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Autorise l'accès uniquement aux utilisateurs ayant le role admin.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
    $user = $request->user();

    if (!$user || $user->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return $next($request);
    }
}
