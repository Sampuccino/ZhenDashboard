<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RDCredit extends Model
{
    //
  protected $table = 'rdcredits';
  protected $fillable = [
    'id', 'company_id', 'return_type', 'period', 'date_return_filed', 'credit_amount', 'credit_claimed', 'credit_available', 'credit_received'
  ];
}
