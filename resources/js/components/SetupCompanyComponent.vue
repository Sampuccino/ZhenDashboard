<template>
  <div class="row justify-content-between">
    <div class="col-md-6 pr-md-1">

      <div class="bg-white p-4">

        <div class="form-group">
          <label>Company Name</label>
          <el-input placeholder="Please input" v-model="companyName.name"></el-input>
        </div>

        <div class="form-group">
          <label>Tax ID / EIN</label>
          <el-input
            type="text"
            placeholder="Please input"
            maxlength="9"
            show-word-limit
            v-model="taxID.id"/>
        </div>

        <div class="form-group">
          <label>Business Start Date</label>
          <flatpickr timeFormat="d-m-Y" v-model="businessStartDate.date" id="calendar_year_bsd"/>
        </div>

        <div class="form-group">
          <label>Year End</label>
          <br>
          {{ returnFiscalYearEnd }}
          <flatpickr timeFormat="d-m-Y" v-model="yearEndDate.date" id="calendar_year_ye"/>
        </div>

        <el-button type="primary" class="mb-2" @click="handleCalculation">Calculate Calendar / Fiscal</el-button>

        <div class="form-group">
          <label>1st Income Year</label>
          <br>
          {{ returnFirstIncomeYear }}
          <!--<flatpickr timeFormat="Y" v-model="firstIncomeYear.year" id="calendar_year_fiy"/>-->
        </div>

        <div class="form-group">
          <label>Final Year Payroll Claimable</label>
          <br>
          <b class="font-weight-bolder text-primary">{{ returnFinalYearPayrollClaimable }}</b>
        </div>

        <div class="form-group">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              Company Type <b class="alert-primary p-1">{{ companyType }}</b> <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="C">C - Corporation</el-dropdown-item>
              <el-dropdown-item command="S">S - Corporation</el-dropdown-item>
              <el-dropdown-item command="P">P -  Partnership</el-dropdown-item>
              <el-dropdown-item command="I">I - Individual</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="form-group">
          <label>Email</label>
          <el-input type="email" placeholder="Please input" v-model="email.input"></el-input>
        </div>

        <div class="form-group">
          <label>Phone</label>
          <el-input
            type="text"
            placeholder="Please input"
            maxlength="10"
            minlength="10"
            show-word-limit
            v-model="phone.input"/>
        </div>

        <div class="form-group">
          <label>Officer</label>
          <el-input placeholder="Please input" v-model="officer.input"></el-input>
        </div>

        <p v-show="recordError.duplicate" class="text-danger font-weight-bolder mb-2 mt-2">No duplicate companies allowed (Name or TaxID already taken). Change Company Name / TaxID and try again.</p>

        <el-button type="primary" @click="onSubmit">Submit</el-button>

      </div>

    </div>
    <div class="col-md-6 pl-md-2">
      <div class="bg-white p-4">
      <last-year-you-can-claim-payroll-calculator-component/>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapActions, mapGetters} from "vuex"
  import axios from 'axios';
  import Flatpickr from "./Calendar/Flatpickr";

  export default {
    name: "SetupCompanyComponent",
    components: {Flatpickr},
    data(){
      return {
        recordError: {
          duplicate: false
        },
        companyName: {
          name: '',
          error: false
        },
        taxID: {
          id: '',
          error: false
        },
        businessStartDate: {
          date: '',
          error: false
        },
        yearEndDate: {
          date: '',
          error: false
        },
        firstIncomeYear: {
          date: this.returnFirstIncomeYear,
          error: false
        },
        finalPayrollDate: {
          date: this.returnFinalYearPayrollClaimable
        },
        email: {
          input: '',
          error: false
        },
        phone: {
          input: '',
          error: false
        },
        officer: {
          input: '',
          error: false
        },
        companyType: ''
      }
    },
    computed: {
      ...mapGetters(['returnFinalYearPayrollClaimable','returnFiscalYearEnd','returnFirstIncomeYear'])
    },
    methods: {
      ...mapActions(['setCalendarYearCalculation', 'storeNewCompanySetup']),
      handleCommand(command) {
        this.companyType = command;
      },
      handleCalculation() {
        this.businessStartDate.date = document.getElementById('calendar_year_bsd').value;
        this.yearEndDate.date = document.getElementById('calendar_year_ye').value;
        this.setCalendarYearCalculation({date: this.businessStartDate.date, endDate : this.yearEndDate.date});
        console.log('handleCalculation ', this.businessStartDate.date, '   ', this.yearEndDate.date);
      },
      onSubmit() {
        axios.post('/api/company', {
          companyName: this.companyName.name,
          taxID: this.taxID.id,
          businessStartDate: this.businessStartDate.date,
          yearEndDate: this.returnFiscalYearEnd,
          firstIncomeYear: this.returnFirstIncomeYear,
          finalPayrollDate: this.returnFinalYearPayrollClaimable,
          companyType: this.companyType,
          email: this.email.input,
          phone: this.phone.input,
          officer: this.officer.input
        })
        .then(res => {

          if (res.data.status === 200) {
            // 200 Clear Form
            /*
            * Add company to Store
            * */
            console.log('Request success');
            // Add blank Company R&D and Forms
            this.$notify({
              title: 'Success',
              message: 'Company was saved',
              type: 'success'
            });
            this.storeNewCompanySetup(res.data.company);
            this.recordError.duplicate = false;
          } else if (res.data.status === 400) {
            // Duplicate entry.
            console.log('Request failed');
            this.$notify({
              title: 'Failed',
              message: 'Could not save company',
              type: 'error'
            });
            this.recordError.duplicate = true;
          }

        }).catch( err => {
          console.warn('Error ', err);
        })
      },
    }
  }
</script>

<style scoped>

</style>
