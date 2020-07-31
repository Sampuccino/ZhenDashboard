<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinancialData extends Model
{
    protected $fillable = ['name', 'title', 'amount'];
}
