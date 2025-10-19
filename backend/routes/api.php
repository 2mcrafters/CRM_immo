<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Quick health endpoint to verify backend is reachable via Vite proxy
Route::get('/ping', function () {
    return response()->json(['ok' => true, 'time' => now(), 'php' => PHP_VERSION]);
});

// Local-only debug route to verify a user exists
if (app()->environment('local')) {
    Route::get('/debug/user', function (Request $request) {
        $email = $request->query('email');
        $exists = $email ? User::where('email', $email)->exists() : false;
        return response()->json(['email' => $email, 'exists' => $exists]);
    });
}
