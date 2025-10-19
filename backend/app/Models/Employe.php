<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    protected $table = 'employes';
    public $incrementing = false;
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_id','matricule','poste','departement','type_contrat','date_embauche','date_fin_contrat','salaire_base','mode_paiement','iban_rib','statut_employe','note_interne'
    ];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
