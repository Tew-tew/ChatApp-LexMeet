<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversations extends Model
{
    use HasFactory;

    public function participants()
    {
        return $this->hasMany(Participants::class);
    }

    public function messages()
    {
        return $this->hasMany(Messages::class);
    }
}
