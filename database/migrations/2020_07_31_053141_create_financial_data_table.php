<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinancialDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('financial_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('company_id');
            $table->string('name');
            $table->string('title');
            $table->decimal('amount', 15,2);
            $table->timestamps();
        });

        Schema::table('financial_data', function($table) {
          $table->foreign('company_id')->references('id')->on('qualifying_questions_years')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('financial_data');
    }
}
