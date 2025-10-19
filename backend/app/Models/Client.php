<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';
    public $incrementing = false;
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_id','type_personne','cin','date_naissance','raison_sociale','ice','identifiant_fiscal','secteur_activite','source_acquisition','statut_client','note_client'
    ];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
