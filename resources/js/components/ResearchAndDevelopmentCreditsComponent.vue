<template>
  <div class="row bg-white p-4">

    <div class="col-12">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th>Return Type</th>
          <th>Period</th>
          <th>Date Return Filed</th>
          <th>Quarter</th>
          <th>Year</th>
          <th class="text-danger" >Form Amount</th>
          <th class="text-primary">Claimed</th>
          <th >Credit Available</th>
          <th class="text-success">Credits Received</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rad, index) in this.returnActiveCompanyResearchAndDevelopmentData" :key="index">
          <td>{{ rad.return_type }}</td>
          <td>{{ rad.period }}</td>
          <td>{{ rad.date_return_filed }}</td>
          <td>{{ rad.quarter }}</td>
          <td>{{ rad.year }}</td>
          <td class="text-danger font-weight-bolder" >{{ rad.credit_amount }}</td>
          <td class="text-primary font-weight-bolder">{{ rad.credit_claimed }}</td>
          <td>{{ rad.credit_available }}</td>
          <td class="text-success font-weight-bolder">{{ rad.credit_received }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-5 bg-light p-2">

      <div class="col-12">
        <h6>This Company has a total of {{ returnTotalCompanyCreditsAvailable }} Credits Available</h6>
      </div>

      <div class="form-group col-2">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Return <h4>{{ returnType.selected }}</h4> <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type)">{{ companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type) }}</el-dropdown-item>
            <el-dropdown-item command="941">941</el-dropdown-item>
            <el-dropdown-item command="941X">941X</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <small v-if="returnType.error" class="text-danger d-block">Select a return type</small>
      </div>

      <div class="col-2">
        <el-dropdown @command="handleQuarterCommand">
          <span class="el-dropdown-link">
            Quarter <h4>{{ quarter.selected }}</h4> <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Q1">Q1</el-dropdown-item>
            <el-dropdown-item command="Q2">Q2</el-dropdown-item>
            <el-dropdown-item command="Q3">Q3</el-dropdown-item>
            <el-dropdown-item command="Q4">Q4</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <small v-if="quarter.error" class="text-danger d-block">Select a quarter</small>
      </div>

      <div class="form-group col-2">
        <label>Year</label>
        <flatpickr class="minimalMarginTop" timeFormat="Y" v-on:updatedDate="updateYear" id="rad_year"/>
        <small v-if="year.error" class="text-danger d-block">Select a year</small>
      </div>

      <div class="form-group col-3">
        <label>Period</label>
        <flatpickr class="minimalMarginTop" timeFormat="m-d-Y" v-on:updatedDate="updatePeriod" id="rad_period"/>
        <small v-if="period.error" class="text-danger d-block">Select a date</small>
      </div>

      <div class="form-group col-3">
        <label>Date Return Filed</label>
        <flatpickr class="minimalMarginTop" timeFormat="m-d-Y" v-on:updatedDate="updateDateReturnFiled" id="rad_date_filed"/>
        <small v-if="dateReturnedFiled.error" class="text-danger d-block">Select a date</small>
      </div>

      <div class="form-group col-3">
        <label>Form Amount</label>
        <el-input v-if="returnType.selected !== '941' && returnType.selected !== '941X' " v-model="amount.input"/>
        <b class="d-block" v-else>n/a</b>
        <small v-if="amount.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="form-group col-3">
        <label>Claimed</label>
        <el-input v-model="claimed.input"/>
        <small v-if="claimed.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="form-group col-3">
        <label>Credit Available</label>
        <br>
        <b>{{ returnCalculatedCreditsAvailable }}</b>
      </div>

      <div class="form-group col-3">
        <label>Credits Received</label>
        <br>
        <b>{{ parseFloat(claimed.input).toFixed(2) }}</b>
      </div>

      <div class="col-12">
        <el-button type="success" @click="onNewCredit">Add Credit</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex"
  import axios from "axios";
  import Flatpickr from "./Calendar/Flatpickr";

  export default {
    name: "ResearchAndDevelopmentCreditsComponent",
    components: {Flatpickr},
    data(){
      return {
        quarter: {
          selected: '',
          error: false
        },
        year: {
          year: '',
          error: false
        },
        period: {
          date: '',
          error: false
        },
        dateReturnedFiled: {
          date: '',
          error: false
        },
        amount: {
          input: '',
          error: false
        },
        claimed: {
          input: '',
          error: false
        },
        returnType: {
          selected: '',
          error: false
        }
      }
    },
    updated() {
      if (this.returnCurrentActiveCompany !== null) {
        if (this.returnCurrentActiveCompany.company_type === this.returnType.selected) {
          this.returnType.selected = this.companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type);
        }
      }
    },
    computed: {
      ...mapGetters(['returnActiveCompanyResearchAndDevelopmentData', 'returnCurrentActiveCompany', 'returnTotalCompanyCreditsAvailable']),
      returnCalculatedCreditsAvailable(){
        const blacklist = ['941', '941X'];
        const n1 = (blacklist.includes(this.returnType.selected)) ? parseFloat(this.returnTotalCompanyCreditsAvailable) : parseFloat(this.amount.input);
        const n2 = parseFloat(this.claimed.input);
        const calculation = (blacklist.includes(this.returnType.selected)) ? (n1 - n2) : (n1 - n2);
        return (isNaN(calculation)) ? 0 : calculation.toFixed(2);
      }
    },
    methods: {
      ...mapActions(['updateCompanyWithNewCreditAndForm']),
      companyTypeToFormConversion(type){
        console.log('companyTypeToFormConversion ', type);
        switch (type) {
          case 'C':
            return '1120';
          case 'S':
            return '1120S';
          case 'P':
            return '1065';
          case 'I':
            return '1040';
        }
      },
      onNewCredit() {
        if (this.validation()) {
          const errorCodes = [400, 404, 500];

          axios.post(`api/company/new-credit`, {
            company_id: this.returnCurrentActiveCompany.id,
            return_type: this.returnType.selected,
            quarter: this.quarter.selected,
            year: this.year.year,
            period: this.reformatDate(this.period.date),
            date_return_filed: this.reformatDate(this.dateReturnedFiled.date),
            credit_amount: this.amount.input,
            credit_claimed: this.claimed.input,
            credit_available: this.returnCalculatedCreditsAvailable,
            credit_received: this.claimed.input
          }).then( res => {

            if (res.status === 200) {
              /*
              * Validate
              * Send request
              * Update store if OK
              * Show notification Success/Error
              * Add check in store for 'n/a' values
              * */
              console.log(res.data);
              this.updateCompanyWithNewCreditAndForm(res.data);
              this.$notify({
                title: 'Success',
                message: `New Credit added to Company ${this.returnCurrentActiveCompany.name}`,
                type: 'success'
              });
            }

            if (errorCodes.includes(res.status)) {
              this.$notify({
                title: 'Failed',
                message: 'Credit failed to save',
                type: 'error'
              });
            }

          });

        } else {
          // Notify of error
          this.$notify({
            title: 'Failed',
            message: 'Please check for errors',
            type: 'error'
          });
        }

      },
      updatePeriod(event) {
        this.period.date = event;
      },
      updateDateReturnFiled(event) {
        this.dateReturnedFiled.date = event;
      },
      reformatDate(d){
        const _d = d.split('-');
        return `${_d[2]}-${_d[0]}-${_d[1]}`
      },
      validation(){

        /* Return Type */
        if (this.returnType.selected === '') {
          this.returnType.error = true;
          return false;
        } else this.returnType.error = false;

        /* Quarter */
        if (this.quarter.selected === '') {
          this.quarter.error = true;
          return false;
        } else this.quarter.error = false;

        /* Year */
        if (this.year.year === '') {
          this.year.error = true;
          return false;
        } else this.year.error = false;

        /* Period */
        if (this.period.date === '') {
          this.period.error = true;
          return false;
        } else this.period.error = false;

        /* Date Return Filed */
        if (this.dateReturnedFiled.date === '') {
          this.dateReturnedFiled.error = true;
          return false;
        } else this.dateReturnedFiled.error = false;

        /* Amount */
        if (this.amount.input === '') {
          this.amount.error = true;
          return false;
        } else this.amount.error = false;

        /* Claimed */
        if (this.claimed.input === '') {
          this.claimed.error = true;
          return false;
        } else this.claimed.error = false;

        return true;
      },
      handleCommand(command) {
        console.log('R&D handleCommand ', command );
        this.returnType.selected = command;
        switch (command) {
          case '941':
          case '941X':
            this.quarter.selected = '';
            this.amount.input = 'n/a';
            break;
          default:
            this.quarter.selected = '--';
            this.amount.input = '';
        }
      },
      updateYear(event) {
        this.year.year = event;
      },
      handleQuarterCommand(command) {
        this.quarter.selected = command;
      }
    }
  }
</script>

<style scoped>

</style>
