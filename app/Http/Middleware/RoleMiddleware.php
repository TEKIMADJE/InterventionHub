<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(
        Request $request,
        Closure $next,
        string $role
    ): Response {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        /*
         * Déconnecter immédiatement un compte désactivé.
         */
        if (!$user->is_active) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()
                ->route('login')
                ->with(
                    'error',
                    'Votre compte a été désactivé.'
                );
        }

        $user->loadMissing('role');

        if (!$user->role || $user->role->nom !== $role) {
            abort(403, 'Accès refusé.');
        }

        return $next($request);
    }
}