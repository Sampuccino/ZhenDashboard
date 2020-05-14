<?php

use App\Alert;
use App\Company;
use App\Form;
use App\RDCredit;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @param Faker $faker
   * @return void
   */
    public function run(Faker $faker)
    {
        // $this->call(UserSeeder::class);
      // Company

      for ($i=0; $i < 5; $i++) {
        $company_name = $faker->company;
          $company = Company::create([
                    'name' => $company_name,
                    'ein' => $faker->numberBetween(100000000,999999999),
                    'business_start_date' => $faker->date('Y-m-d'),
                    'business_first_year_end_date' => $faker->date('Y-m-d'),
                    'first_income_year' => $faker->date('Y-m-d'),
                    'final_date_payroll_claim' => $faker->date('Y-m-d'),
                    'company_type' => 'C',
                    'email' => $faker->email,
                    'phone' => $faker->randomNumber(9),
                    'officer' => $faker->firstName,
                  ]);

          for ($j=0; $j < 5; $j++) {
            RDCredit::create([
              'company_id' => $company->id,
              'return_type' => '1040',
              'quarter' => 'Q1',
              'year' => '2020',
              'period' => $faker->date(),
              'date_return_filed' => $faker->date(),
              'credit_amount' => $faker->numberBetween(1000,25000),
              'credit_claimed' => $faker->numberBetween(1000,25000),
              'credit_available' => $faker->numberBetween(1000,25000),
              'credit_received' => $faker->numberBetween(1000,25000),
            ]);

            Form::create([
              'company_id' => $company->id,
              'quarter' => 'Q1',
              'year' => '2020',
              'form_type' => '1040',
              'period' => $faker->date(),
            ]);

            Alert::create([
              'company_id' => $company->id,
              'company_name' => $company_name,
              'company_ein' => $company->ein,
              'title' => $faker->title,
              'body' => $faker->sentence
            ]);

          }

        $company->save();
      }

      // R&D Credits
      // Forms

      // Alerts

    }
}
