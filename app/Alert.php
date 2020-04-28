<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    //
  protected $table = 'alerts';
  protected $fillable = ['company_name','company_ein', 'title', 'body'];
}
