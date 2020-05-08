<template>
  <div class="row bg-white p-4">

    <div class="col-12">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th>Return Type</th>
          <th>Period</th>
          <th>Date Return Filed</th>
          <th>Form Amount</th>
          <th>Quarter</th>
          <th>Year</th>
          <th class="text-danger">Credit Available</th>
          <th class="text-primary">Claimed</th>
          <th class="text-success">Credits Received</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rad, index) in this.returnActiveCompanyResearchAndDevelopmentData" :key="index">
          <td>{{ rad.return_type }}</td>
          <td>{{ rad.period }}</td>
          <td>{{ rad.date_return_filed }}</td>
          <td>{{ rad.credit_amount }}</td>
          <td>{{ rad.quarter }}</td>
          <td>{{ rad.year }}</td>
          <td class="text-danger font-weight-bolder">{{ rad.credit_available }}</td>
          <td class="text-primary font-weight-bolder">{{ rad.credit_claimed }}</td>
          <td class="text-success font-weight-bolder">{{ rad.credit_received }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-3">

      <div class="form-group col-12">
        <el-alert
          title="Enter n/a on inputs which don't have a value."
          type="warning">
        </el-alert>
      </div>

      <div class="form-group col-2">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Selected Return Type <h4>{{ returnType.selected }}</h4> <i class="el-icon-arrow-down el-icon--right"></i>
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
            Select Quarter | <h4>{{ quarter.selected }}</h4> <i class="el-icon-arrow-down el-icon--right"></i>
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
        <flatpickr timeFormat="Y" v-on:updatedDate="updateYear" id="rad_year"/>
        <small v-if="year.error" class="text-danger d-block">Select a year</small>
      </div>

      <div class="form-group col-3">
        <label>Period</label>
        <flatpickr timeFormat="d-m-Y" v-on:updatedDate="updatePeriod" id="rad_period"/>
        <small v-if="period.error" class="text-danger d-block">Select a date</small>
      </div>

      <div class="form-group col-3">
        <label>Date Return Filed</label>
        <flatpickr timeFormat="d-m-Y" v-on:updatedDate="updateDateReturnFiled" id="rad_date_filed"/>
        <small v-if="dateReturnedFiled.error" class="text-danger d-block">Select a date</small>
      </div>

      <div class="form-group col-3">
        <label>Form Amount</label>
        <el-input v-model="amount.input"/>
        <small v-if="amount.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="form-group col-3">
        <label>Claimed</label>
        <el-input v-model="claimed.input"/>
        <small v-if="claimed.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="form-group col-3">
        <label>Credit Available</label>
        <el-input v-model="available.input"/>
        <small v-if="available.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="form-group col-3">
        <label>Credits Received</label>
        <el-input v-model="received.input"/>
        <small v-if="received.error" class="text-danger d-block">Enter a value</small>
      </div>

      <div class="col-12">
        <el-button type="primary" @click="onNewCredit">Post new credit</el-button>
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
        available: {
          input: '',
          error: false
        },
        received: {
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
      ...mapGetters(['returnActiveCompanyResearchAndDevelopmentData', 'returnCurrentActiveCompany']),
    },
    methods: {
      ...mapActions(['updateCompanyWithNewCreditAndForm']),
      companyTypeToFormConversion(type){
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
            credit_available: this.available.input,
            credit_received: this.received.input
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
        return `${_d[2]}-${_d[1]}-${_d[0]}`
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

        /* Available */
        if (this.available.input === '') {
          this.available.error = true;
          return false;
        } else this.available.error = false;

        /* Received */
        if (this.received.input === '') {
          this.received.error = true;
          return false;
        } else this.received.error = false;

        return true;
      },
      handleCommand(command) {
        console.log('R&D handleCommand ', command );
        this.returnType.selected = command;
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
