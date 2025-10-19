<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index(Request $request)
    {
        try {
            $query = Client::with('user:id,name,email');

            // Filters
            if ($request->has('type')) {
                $query->ofType($request->type);
            }

            if ($request->has('statut')) {
                $query->ofStatut($request->statut);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('nom', 'like', "%{$search}%")
                        ->orWhere('prenom', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('telephone', 'like', "%{$search}%");
                });
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $clients = $query->paginate($perPage);

            return response()->json($clients);
        } catch (\Throwable $e) {
            Log::error('Error fetching clients', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la récupération des clients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created client.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|unique:clients,email',
                'telephone' => 'nullable|string|max:20',
                'telephone_secondaire' => 'nullable|string|max:20',
                'adresse' => 'nullable|string',
                'adresse_ligne1' => 'nullable|string|max:255',
                'adresse_ligne2' => 'nullable|string|max:255',
                'ville' => 'nullable|string|max:255',
                'code_postal' => 'nullable|string|max:10',
                'pays' => 'nullable|string|max:255',
                'type' => 'required|in:acheteur,vendeur,locataire,proprietaire',
                'statut' => 'nullable|in:prospect,actif,inactif,archive',
                'role' => 'nullable|string|max:255',
                'budget_min' => 'nullable|numeric|min:0',
                'budget_max' => 'nullable|numeric|min:0',
                'preferences' => 'nullable|array',
                'notes' => 'nullable|string',
                'user_id' => 'nullable|exists:users,id',
            ]);

            $client = Client::create($validated);
            $client->load('user:id,name,email');

            return response()->json([
                'message' => 'Client créé avec succès',
                'client' => $client
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Error creating client', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la création du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified client.
     */
    public function show($id)
    {
        try {
            $client = Client::with('user:id,name,email')->findOrFail($id);
            return response()->json($client);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Client non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified client.
     */
    public function update(Request $request, $id)
    {
        try {
            $client = Client::findOrFail($id);

            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'nom' => 'sometimes|required|string|max:255',
                'prenom' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:clients,email,' . $id,
                'telephone' => 'nullable|string|max:20',
                'telephone_secondaire' => 'nullable|string|max:20',
                'adresse' => 'nullable|string',
                'adresse_ligne1' => 'nullable|string|max:255',
                'adresse_ligne2' => 'nullable|string|max:255',
                'ville' => 'nullable|string|max:255',
                'code_postal' => 'nullable|string|max:10',
                'pays' => 'nullable|string|max:255',
                'type' => 'sometimes|required|in:acheteur,vendeur,locataire,proprietaire',
                'statut' => 'nullable|in:prospect,actif,inactif,archive',
                'role' => 'nullable|string|max:255',
                'budget_min' => 'nullable|numeric|min:0',
                'budget_max' => 'nullable|numeric|min:0',
                'preferences' => 'nullable|array',
                'notes' => 'nullable|string',
                'user_id' => 'nullable|exists:users,id',
            ]);

            $client->update($validated);
            $client->load('user:id,name,email');

            return response()->json([
                'message' => 'Client mis à jour avec succès',
                'client' => $client
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Error updating client', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified client (soft delete).
     */
    public function destroy($id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();

            return response()->json([
                'message' => 'Client supprimé avec succès'
            ]);
        } catch (\Throwable $e) {
            Log::error('Error deleting client', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la suppression du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics about clients.
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => Client::count(),
                'prospects' => Client::prospects()->count(),
                'actifs' => Client::actifs()->count(),
                'by_type' => [
                    'acheteurs' => Client::ofType('acheteur')->count(),
                    'vendeurs' => Client::ofType('vendeur')->count(),
                    'locataires' => Client::ofType('locataire')->count(),
                    'proprietaires' => Client::ofType('proprietaire')->count(),
                ],
                'by_statut' => [
                    'prospects' => Client::ofStatut('prospect')->count(),
                    'actifs' => Client::ofStatut('actif')->count(),
                    'inactifs' => Client::ofStatut('inactif')->count(),
                    'archives' => Client::ofStatut('archive')->count(),
                ],
            ];

            return response()->json($stats);
        } catch (\Throwable $e) {
            Log::error('Error fetching client statistics', [
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
