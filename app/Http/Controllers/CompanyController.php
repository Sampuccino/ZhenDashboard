<?php

namespace App\Http\Controllers;

use App\Company;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return response()->json(Company::findOrFail(1)->with(['research_and_development', 'forms'])->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      /* *
        companyName
        taxID
        businessStartDate
        yearEndDate
        firstIncomeYear
        finalPayrollDate
        companyType
        email
        phone
        officer
       * */
      try {
        $c = Company::create([
          'name' => $request->companyName,
          'ein' => $request->taxID,
          'business_start_date' => Carbon::parse($request->businessStartDate)->toDateString(),
          'business_first_year_end_date' => Carbon::parse($request->yearEndDate)->toDateString(),
          'first_income_year' => Carbon::parse($request->firstIncomeYear)->toDateString(),
          'final_date_payroll_claim' => Carbon::parse($request->finalPayrollDate)->toDateString(),
          'company_type' => $request->companyType,
          'email' => $request->email,
          'phone' => $request->phone,
          'officer' => $request->officer
        ]);

        $c->save();

        /* Add empty keys */
        $c->research_and_development = [];
        $c->forms = [];

        return response()->json(['status' => 200, 'message' => 'Request success.', 'company' => $c]);
      } catch (Exception $e) {
        return response()->json(['status' => 400, 'message' => 'Request failed. No duplicate entries allowed.', 'error' => $e]);
      }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        //
    }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param Company $company
   * @return \Illuminate\Http\Response
   */
    public function update(Request $request, Company $company)
    {
      try {
        // Update company here
        // Make sure to Carbon::parse dates as they will be required
        if ($request->has('business_start_date')) {
          $request->business_start_date = Carbon::parse($request->business_start_date)->toDateString();
        }

        if ($request->has('business_first_year_end_date')) {
          $request->business_first_year_end_date = Carbon::parse($request->business_first_year_end_date)->toDateString();
        }

        if ($request->has('final_date_payroll_claim')) {
          $request->final_date_payroll_claim = Carbon::parse($request->final_date_payroll_claim)->toDateString();
        }

        if ($request->has('first_income_year')) {
          $request->first_income_year = Carbon::parse($request->first_income_year)->toDateString();
        }
        $company->update($request->all());
        return response()->json($company, 200);
      } catch (Exception $e) {
        return response()->json(['message' => $e->getMessage()], 404);
      }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        //
    }

      /****/
  /**
   * @param $date
   * @param $endDate
   * @return mixed|\Symfony\Component\HttpFoundation\ParameterBag
   */
    public function claimCalculation($date, $endDate)
    {

      /* claim-calculation */
      try {
        /*
          Rules
          1. If Year End is not 12/31 (default) it will be considered Fiscal Year so long as Start and End are within the same Month else 12/31.
         * */

        $year_end_date = (Carbon::parse($date)->month !== Carbon::parse($endDate)->month) ? Carbon::parse($date)->endOfYear() : Carbon::parse($date)->endOfMonth();
        $first_income_year = (Carbon::parse($date)->month !== Carbon::parse($endDate)->month) ? Carbon::parse($date)->endOfYear()->addYear() : Carbon::parse($date)->endOfMonth();
        /* This is the Year 1 Starting point. We already have the year end in the variable year_end_date */
        $year_one_start = (Carbon::parse($date)->month !== Carbon::parse($endDate)->month) ? Carbon::parse($date)->endOfYear()->addDay() : Carbon::parse($date)->endOfMonth()->addDay();

        return response()->json([
          'status' => 201,
          'message' => 'success',
          'start_date' => $date,
          'year_end_date' => (clone $year_end_date)->toDateString(),
          'first_income_year' => (clone $first_income_year)->toDateString(),
          'year_one' => (clone $year_one_start)->toDateString() . ' - ' . (clone $year_end_date)->addYear()->toDateString(),
          'year_two' => (clone $year_one_start)->addYears(1)->toDateString() . ' - ' . (clone $year_end_date)->addYears(2)->toDateString(),
          'year_three' => (clone $year_one_start)->addYears(2)->toDateString() . ' - ' . (clone $year_end_date)->addYears(3)->toDateString(),
          'year_four' => (clone $year_one_start)->addYears(3)->toDateString() . ' - ' . (clone $year_end_date)->addYears(4)->toDateString(),
          'year_five' => (clone $year_one_start)->addYears(4)->toDateString() . ' - ' . (clone $year_end_date)->addYears(5)->toDateString(),
          'last_year_payroll_claimable' => (clone $year_end_date)->addYears(5)->toDateString()
        ]);
      } catch (Exception $exception) {
        return response()->json([
          'status' => 400,
          'message' => 'Invalid data!',
          'data' => []
        ]);
      }

    }


}
