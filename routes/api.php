<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//Route::get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('company')->group(function () {

  Route::get('/', 'CompanyController@index');
  Route::post('/', 'CompanyController@store');
  Route::delete('/{company}', 'CompanyController@destroy');

  // Claim Calculation
//  Route::post('/claim-calculation/{date}/{endDate}', 'CompanyController@claimCalculation');
  Route::post('/claim-calculation', 'CompanyController@claimCalculation');

  // Alerts
  Route::get('/events', 'AlertController@index');
  Route::post('/events', 'AlertController@store');
  Route::delete('/events/{alert}', 'AlertController@destroy');

  Route::put('/update/{company}', 'CompanyController@update');
  Route::post('/new-credit', 'CompanyController@newCredit');

  //Delete credit
  Route::delete('/delete-credit/{credit}', 'RDCreditsController@destroy');

  // Update Credit Recieved
  Route::put('/update-rdc/{credit}', 'RDCreditsController@update');

  Route::post('/form-upload/{form}', 'FormController@store');
  Route::post('/b64-upload', 'FormController@decodeBase64ImageAndStore');

  // Delete
  Route::post('/form/{form}', 'FormController@destroyFile');
});
