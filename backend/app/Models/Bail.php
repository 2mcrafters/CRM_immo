<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    protected $table = 'baux';
    protected $fillable = [
        'unite_id','locataire_user_id','type_bail','date_effet','date_fin','periodicite','loyer_ht','provisions_charges','depot_garantie','indice_revision','statut','numero_contrat'
    ];

    public function unite() { return $this->belongsTo(UniteLocative::class, 'unite_id'); }
    public function locataire() { return $this->belongsTo(Client::class, 'locataire_user_id', 'user_id'); }
}
