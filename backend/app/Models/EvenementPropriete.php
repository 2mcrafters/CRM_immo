<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvenementPropriete extends Model
{
    protected $table = 'evenements_propriete';
    protected $fillable = [
        'unite_id','type_evenement','date_evenement','description','piece_justif_doc','enregistre_par'
    ];

    public function unite() { return $this->belongsTo(UniteLocative::class, 'unite_id'); }
    public function auteur() { return $this->belongsTo(User::class, 'enregistre_par'); }
}
