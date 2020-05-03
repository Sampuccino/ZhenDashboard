<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedInteger('company_id');
            $table->string('form_type',5);
            $table->string('quarter', 2);
            $table->string('year');
            $table->date('period');
            $table->text('file_one_url')->nullable($value = true);
            $table->text('file_two_url')->nullable($value = true);
        });

      Schema::table('forms', function($table) {
        $table->foreign('company_id')->references('id')->on('company');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forms');
    }
}
