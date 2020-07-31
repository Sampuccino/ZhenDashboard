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

  // Consolidated Company Info
  Route::get('/consolidated', 'RDCreditsController@index');

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

  // Attorney and Work Forms
  Route::post('/attorney-work/{company}', 'AttorneyandWorkController@store');
  Route::delete('/attorney-work/{attorneyandWork}', 'AttorneyandWorkController@destroy');

  // Checklist PUT / Update Checklist item
  Route::put('/checklist/{checklist}', 'ChecklistController@update');
  // Checklist POST Checklist item
  Route::post('/checklist', 'ChecklistController@store');
  // Checklist DELETE Checklist item
  Route::delete('/checklist/{checklist}', 'ChecklistController@destroy');

  // Delete
  Route::post('/form/{form}', 'FormController@destroyFile');

  // Store Key Due Date
  Route::post('/kdd', 'KeyDueDatesController@store');
  Route::delete('/kdd/{keyDueDate}', 'KeyDueDatesController@destroy');

  // Association
  Route::get('/association', 'HomeController@usersWithAssociation');
  Route::post('/association', 'AssociationController@store');

  //Update user password
  Route::post('/user/{user}', 'UserController@update');


  // Analyzer API endpoints
  Route::post('/analyzer/qq/{year}', 'QualifyingQuestionsYearsController@store');
  Route::get('/analyzer/qq/{companyId}', 'QualifyingQuestionsYearsController@index');
});
