<template>
  <div class="row bg-white p-4">

    <!--
    company_id:1
created_at:"2020-04-29T04:57:04.000000Z"
credit_amount:"22425"
credit_available:"3816"
credit_claimed:"9490"
credit_received:"24650"
date_return_filed:"1974-03-15"
id:1
period:"2001-05-16"
return_type:"1040"
updated_at:"2020-04-29T04:57:04.000000Z"
    -->

    <div class="col-12">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th>Return Type</th>
          <th>Period</th>
          <th>Date Return Filed</th>
          <th>Form Amount</th>
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
            Selected Return Type <h4>{{ returnType }}</h4> <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type)">{{ companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type) }}</el-dropdown-item>
            <el-dropdown-item command="941">941</el-dropdown-item>
            <el-dropdown-item command="941X">941X</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

<!--      <div class="form-group col-2 text-center">
        <label>Return Type</label>
        <h2>
          {{ this.returnCurrentActiveCompany.company_type }}
          <br>
          {{companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type)}}
        </h2>
      </div>-->

      <div class="form-group col-5">
        <label>Period</label>
        <flatpickr timeFormat="d-m-Y" v-on:updatedDate="updatePeriod" id="rad_period"/>
        <small v-if="period.error" class="text-danger d-block">Select a date</small>
      </div>

      <div class="form-group col-5">
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
        returnType: ''
      }
    },
    updated() {
      if (this.returnCurrentActiveCompany !== null) {
        if (this.returnCurrentActiveCompany.company_type === this.returnType) {
          this.returnType = this.companyTypeToFormConversion(this.returnCurrentActiveCompany.company_type);
        }
      }
    },
    computed: {
      ...mapGetters(['returnActiveCompanyResearchAndDevelopmentData', 'returnCurrentActiveCompany']),
    },
    methods: {
      ...mapActions(['updateCompanyWithNewCredit']),
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
            return_type: this.returnType,
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
              this.updateCompanyWithNewCredit(res.data);
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
        this.returnType = command;
      }
    }
  }
</script>

<style scoped>

</style>
