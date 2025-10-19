<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';
    protected $primaryKey = 'id';
    public $incrementing = true;

    protected $fillable = [
        'name',
        'nom',
        'prenom',
        'email',
        'telephone',
        'telephone_secondaire',
        'adresse',
        'adresse_ligne1',
        'adresse_ligne2',
        'ville',
        'code_postal',
        'pays',
        'type',
        'statut',
        'role',
        'budget_min',
        'budget_max',
        'preferences',
        'notes',
        'user_id',
    ];

    protected $casts = [
        'preferences' => 'array',
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['nom_complet'];

    /**
     * Get the user (agent) assigned to this client.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get client's full name.
     */
    public function getNomCompletAttribute()
    {
        return "{$this->prenom} {$this->nom}";
    }

    /**
     * Scope for filtering by type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope for filtering by status.
     */
    public function scopeOfStatut($query, $statut)
    {
        return $query->where('statut', $statut);
    }

    /**
     * Scope for active clients.
     */
    public function scopeActifs($query)
    {
        return $query->where('statut', 'actif');
    }

    /**
     * Scope for prospects.
     */
    public function scopeProspects($query)
    {
        return $query->where('statut', 'prospect');
    }
}
