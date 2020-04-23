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
//  protected $fillable = [
//    'name', 'email', 'password',
//  ];
  protected $table = 'company';

  public function research_and_development(){
    return $this->hasMany(RDCredit::class);
  }

  public function forms(){
    return $this->hasMany(Form::class);
  }

}
