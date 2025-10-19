<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniteLocative extends Model
{
    protected $table = 'unites_locatives';
    protected $fillable = [
        'reference','type_unite','statut','adresse_ligne1','adresse_ligne2','ville','code_postal','surface_m2','etage','cadastre_ref','dpe_classe','date_mise_service','description'
    ];

    public function adresses() { return $this->hasMany(AdresseUnite::class, 'unite_id'); }
    public function evenements() { return $this->hasMany(EvenementPropriete::class, 'unite_id'); }
    public function baux() { return $this->hasMany(Bail::class, 'unite_id'); }
    public function proprietaires() { return $this->hasMany(UniteProprietaire::class, 'unite_id'); }
}
