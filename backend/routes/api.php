<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\ClientController;
use App\Models\User;

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// User Management (Admin only)
Route::middleware('auth:sanctum')->prefix('users')->group(function () {
    Route::get('/', [UserManagementController::class, 'index'])->middleware('can:users.view');
    Route::post('/', [UserManagementController::class, 'store'])->middleware('can:users.create');
    Route::get('/{id}', [UserManagementController::class, 'show'])->middleware('can:users.view');
    Route::put('/{id}', [UserManagementController::class, 'update'])->middleware('can:users.edit');
    Route::delete('/{id}', [UserManagementController::class, 'destroy'])->middleware('can:users.delete');
});

// Roles and Permissions
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/roles', [UserManagementController::class, 'getRoles']);
    Route::get('/permissions', [UserManagementController::class, 'getPermissions'])->middleware('can:users.view');
    Route::get('/my-permissions', [UserManagementController::class, 'myPermissions']);
});

// Client Management
Route::middleware('auth:sanctum')->prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->middleware('can:clients.view');
    Route::post('/', [ClientController::class, 'store'])->middleware('can:clients.create');
    Route::get('/statistics', [ClientController::class, 'statistics'])->middleware('can:clients.view');
    Route::get('/{id}', [ClientController::class, 'show'])->middleware('can:clients.view');
    Route::put('/{id}', [ClientController::class, 'update'])->middleware('can:clients.edit');
    Route::delete('/{id}', [ClientController::class, 'destroy'])->middleware('can:clients.delete');
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
