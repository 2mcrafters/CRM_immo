<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Assign default role if using Spatie (optional)
        if (method_exists($user, 'assignRole')) {
            try { $user->assignRole('user'); } catch (\Throwable $e) { /* role might not exist yet */ }
        }

        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $validated['email'])->first();
            if (! $user || ! Hash::check($validated['password'], $user->password)) {
                throw ValidationException::withMessages(['email' => ['The provided credentials are incorrect.']]);
            }
            $token = $user->createToken('api')->plainTextToken;
            return response()->json(['user' => $user, 'token' => $token]);
        } catch (\Throwable $e) {
            Log::error('Login error', ['msg' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()]);
            return response()->json(['message' => 'Login server error', 'error' => $e->getMessage()], 500);
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json(['user' => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['ok' => true]);
    }
}
