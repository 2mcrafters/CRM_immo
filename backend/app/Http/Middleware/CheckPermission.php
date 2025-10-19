<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'Non authentifié',
            ], 401);
        }

        if (!$request->user()->can($permission)) {
            return response()->json([
                'message' => 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action',
                'required_permission' => $permission,
            ], 403);
        }

        return $next($request);
    }
}
