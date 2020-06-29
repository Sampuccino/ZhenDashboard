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
    'override_date',
    'address',
    'payroll_provider_company_name',
    'payroll_provider_individual_name',
    'payroll_provider_email',
    'payroll_provider_phone',
    'tax_provider_company_name',
    'tax_provider_individual_name',
    'tax_provider_email',
    'tax_provider_phone',
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

  public function attorneystatements(){
    return $this->hasMany(AttorneyandWork::class);
  }

  public function checklists(){
    return $this->hasMany(Checklist::class);
  }

  public function keydates(){
    return $this->hasMany(KeyDueDates::class);
  }

}
