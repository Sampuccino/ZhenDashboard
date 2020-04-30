<template>
  <div>
    <div>

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
            <div class="bg-white p-4 mb-4">
              <h6 class="font-weight-bolder">Current Company Details</h6>
              <div v-for="(company, index) in this.returnCurrentActiveCompanyAsArray" :key="index">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Detail</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td scope="row">Name</td>
                    <td>{{ company.name }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Tax ID</td>
                    <td>{{ company.ein }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Business Start Date</td>
                    <td>{{ company.business_start_date }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Year End Date</td>
                    <td>{{ company.business_first_year_end_date }}</td>
                  </tr>
                  <tr>
                    <td scope="row">1st Income Year Date</td>
                    <td>{{ company.first_income_year }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Final Payroll Year Date</td>
                    <td>{{ company.final_date_payroll_claim }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Company Type</td>
                    <td>{{ company.company_type }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Email</td>
                    <td>{{ company.email }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Phone</td>
                    <td>{{ company.phone }}</td>
                  </tr>
                  <tr>
                    <td scope="row">Officer</td>
                    <td>{{ company.officer }}</td>
                  </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <div class="bg-white p-4">
              <last-year-you-can-claim-payroll-calculator-component/>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import axios from 'axios';
  import LastYearYouCanClaimPayrollCalculatorComponent from "./LastYearYouCanClaimPayrollCalculatorComponent";
  import Flatpickr from "./Calendar/Flatpickr";

  export default {
    name: "ProfileCompanyComponent",
    components: {Flatpickr, LastYearYouCanClaimPayrollCalculatorComponent},
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
      ...mapGetters(['returnCurrentActiveCompanyAsArray',
        'returnCurrentActiveCompany',
        'returnFinalYearPayrollClaimable',
        'returnFiscalYearEnd',
        'returnFirstIncomeYear',
        'returnFiscalTypeCalculations'
      ])
    },
    methods: {
      ...mapActions(['setCalendarYearCalculation', 'updateExistingCompanyObject']),
      handleCommand(command) {
        console.log('handleCommand ', command);
        this.companyType = command;
      },
      handleCalculation() {
        this.businessStartDate.date = document.getElementById('calendar_year_bsd').value;
        this.yearEndDate.date = document.getElementById('calendar_year_ye').value;
        this.setCalendarYearCalculation({date: this.businessStartDate.date, endDate : this.yearEndDate.date});
      },
      returnRearrangedDate(date) {
        let d = date.split('-');
        const arranged = `${d[2]}-${d[1]}-${d[0]}`;
       return (d[0].length === 4) ? date :  arranged;
      },
      onSubmit() {

        const income = {
          calculated: this.returnFirstIncomeYear,
          current: this.returnCurrentActiveCompany.first_income_year,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.first_income_year, this.returnFirstIncomeYear),
        };
        const payroll = {
          calculated: this.returnFinalYearPayrollClaimable,
          current: this.returnCurrentActiveCompany.final_date_payroll_claim,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.final_date_payroll_claim, this.returnFinalYearPayrollClaimable),
        };

        // Date is not correct formate yyyy-mm-dd when passing to server.

        const startDate = {
          modified: document.getElementById('calendar_year_bsd').value,
          calculated: this.returnFiscalTypeCalculations.start_date,
          current: this.returnCurrentActiveCompany.business_start_date,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.business_start_date, this.returnRearrangedDate(this.returnFiscalTypeCalculations.start_date)),
        };
        const endDate = {
          modified: document.getElementById('calendar_year_ye').value,
          calculated: this.returnFiscalYearEnd,
          current: this.returnCurrentActiveCompany.business_first_year_end_date,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.business_first_year_end_date, this.returnFiscalYearEnd),
        };
        const compType = {
          current: this.returnCurrentActiveCompany.company_type,
          modified: this.companyType,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.company_type, this.companyType),
        };
        const compName = {
          current: this.returnCurrentActiveCompany.name,
          modified: this.companyName.name,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.name, this.companyName.name),
        };
        const compTax = {
          current: this.returnCurrentActiveCompany.ein,
          modified: this.taxID.id,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.ein, this.taxID.id),
        };
        const compEmail = {
          current: this.returnCurrentActiveCompany.email,
          modified: this.email.input,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.email, this.email.input),
        };
        const compPhone = {
          current: this.returnCurrentActiveCompany.phone,
          modified: this.phone.input,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.phone, this.phone.input),
        };
        const compOfficer = {
          current: this.returnCurrentActiveCompany.officer,
          modified: this.officer.input,
          equal: this.returnValueToBeUpdated(this.returnCurrentActiveCompany.officer, this.officer.input),
        };

        console.log('First Income Year ', income);
        console.log('Final Payroll Year ', payroll);
        console.log('Start Date ', startDate);
        console.log('Year End Date ', endDate);
        console.log('Company Type ', compType);
        console.log('Company Name ', compName);
        console.log('Tax ID ', compTax);
        console.log('Email ', compEmail);
        console.log('Phone ', compPhone);
        console.log('Officer ', compOfficer);

        axios.put(`/api/company/update/${this.returnCurrentActiveCompany.id}`, {
          name: compName.equal,
          ein: compTax.equal,
          business_start_date: startDate.equal,
          business_first_year_end_date: endDate.equal,
          first_income_year: income.equal,
          final_date_payroll_claim: payroll.equal,
          company_type: compType.equal,
          email: compEmail.equal,
          phone: compPhone.equal,
          officer: compOfficer.equal
        })
        .then(res => {

          if (res.status === 200) {
            // 200 Clear Form
            console.log('Request success', res.data);

            // Update Company and Companies objects in Store
            this.updateExistingCompanyObject(res.data);

            this.$notify({
              title: 'Success',
              message: 'Company was updated',
              type: 'success'
            });

            this.recordError.duplicate = false;
          } else if (res.status === 400) {
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
        });

      },
      returnValueToBeUpdated(current, modified){
        /*
        * No Null, Empty, Undefined, n/a
        * */
        const blacklist = ['n/a', null, undefined, "undefined", ""];
        return (blacklist.includes(modified)) ? current : modified;
      }
    }
  }
</script>

<style scoped>

</style>
