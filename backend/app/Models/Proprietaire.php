<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proprietaire extends Model
{
    protected $table = 'proprietaires';
    public $incrementing = false;
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_id','type_personne','cin','raison_sociale','ice','identifiant_fiscal','rib_iban','mode_versement','preference_contact','statut_proprietaire','note_proprietaire'
    ];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
