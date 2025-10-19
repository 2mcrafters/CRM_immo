<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdresseUnite extends Model
{
    protected $table = 'adresses_unites';
    protected $fillable = [
        'unite_id','adresse_ligne1','adresse_ligne2','ville','code_postal','date_debut','date_fin'
    ];

    public function unite()
    {
        return $this->belongsTo(UniteLocative::class, 'unite_id');
    }
}
