<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'ein',
    'business_start_date',
    'business_first_year_end_date',
    'first_income_year',
    'final_date_payroll_claim',
    'company_type',
    'email',
    'phone',
    'officer',
  ];
  protected $table = 'company';

  public function research_and_development(){
    return $this->hasMany(RDCredit::class);
  }

  public function forms(){
    return $this->hasMany(Form::class);
  }

  public function alerts(){
    return $this->hasMany(Alert::class);
  }

}
