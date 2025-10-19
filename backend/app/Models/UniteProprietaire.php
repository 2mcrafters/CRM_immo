<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniteProprietaire extends Model
{
    protected $table = 'unites_proprietaires';
    protected $fillable = [
        'unite_id','proprietaire_user_id','part_fraction','part_num','part_den','date_debut','date_fin','source_evenement_id'
    ];

    public function unite() { return $this->belongsTo(UniteLocative::class, 'unite_id'); }
    public function proprietaire() { return $this->belongsTo(Proprietaire::class, 'proprietaire_user_id', 'user_id'); }
}
