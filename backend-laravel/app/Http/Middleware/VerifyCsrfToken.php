<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Le nom des URIs qui ne doivent pas être protégés contre les attaques CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
