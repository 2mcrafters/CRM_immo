<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EncaissementLoyer extends Model
{
    protected $table = 'encaissements_loyers';
    protected $fillable = [
        'bail_id','date_encaissement','montant_encaisse','mode_paiement','reference_paiement'
    ];

    public function bail() { return $this->belongsTo(Bail::class, 'bail_id'); }
}
