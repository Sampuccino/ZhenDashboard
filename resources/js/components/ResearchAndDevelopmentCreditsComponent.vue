<template>
  <div class="row bg-white p-4 m-1">

    <div class="col-12">
      <table class="table table-responsive table-striped text-center">
        <thead>
        <tr>
          <th>Return Type</th>
          <th>Quarter</th>
          <th>Period</th>
          <th>Date Return Filed</th>
          <th>Year</th>
          <th class="text-danger" >Form Amount</th>
          <th class="text-primary">Claimed</th>
          <th >Credit Available</th>
          <th class="text-success">Credits Received</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rad, index) in this.returnActiveCompanyResearchAndDevelopmentData" :key="index">
          <td>
            <p class="mt-2">{{ rad.return_type }}</p>
          </td>
          <td>
            <p class="mt-2">{{ rad.quarter }}</p>
          </td>
          <td>
            <p class="mt-2">{{ rad.period }}</p>
          </td>
          <td>
            <p class="mt-2">{{ rad.date_return_filed }}</p>
          </td>
          <td>
            <p class="mt-2">{{ rad.year }}</p>
          </td>
          <td class="text-danger font-weight-bolder" >
            <div class="input-group mb-3">
              <input :id="`updatedAmount_${rad.id}`" type="text" class="form-control" aria-describedby="basic-addon2"
                     v-bind:value="parseFloat(rad.credit_amount).toFixed(2)">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary"
                        type="button"
                        @click="onUpdateAmountReceived(rad.id)">
                  <i class="el-icon-edit"></i>
                </button>
              </div>
            </div>
          </td>
          <td class="text-primary font-weight-bolder">
            <div class="input-group mb-3">
              <input :id="`updatedClaimed_${rad.id}`" type="text" class="form-control" aria-describedby="basic-addon2"
                     v-bind:value="parseFloat(rad.credit_claimed).toFixed(2)">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary"
                        type="button"
                        @click="onUpdateAmountClaimed(rad.id)">
                  <i class="el-icon-edit"></i>
                </button>
              </div>
            </div>
          </td>
          <td>
            <!--Available-->
            <p class="mt-2">{{ rowByRowCalculation(index) }}</p>
          </td>
          <td>
            <div class="input-group mb-3">
              <input :id="`updatedReceived_${rad.id}`" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                     v-bind:value="parseFloat(rad.credit_received).toFixed(2)">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary"
                        type="button"
                        @click="onUpdateCreditReceived(rad.id)">
                  <i class="el-icon-edit"></i>
                </button>
              </div>
            </div>
          </td>
          <td>
            <el-button type="danger" @click="deleteRecord(rad.id)">x</el-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-5 bg-light p-2">

      <table class="table col-12">
        <thead>
        <tr>
          <th>Return Type</th>
          <th>Quarter</th>
          <th>Year</th>
          <th>Period</th>
          <th>Date Return Filed</th>
          <th>Form Amount</th>
          <th>Claimed</th>
          <th>Credit Available</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td scope="row">
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
          </td>
          <td>
            <section v-show="quarter.display">
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
            </section>
          </td>
          <td>
            <flatpickr class="minimalMarginTop" timeFormat="Y" v-on:updatedDate="updateYear" id="rad_year"/>
            <small v-if="year.error" class="text-danger d-block">Select a year</small>
          </td>
          <td>
            <flatpickr class="minimalMarginTop" timeFormat="m-d-Y" v-on:updatedDate="updatePeriod" id="rad_period"/>
            <small v-if="period.error" class="text-danger d-block">Select a date</small>
          </td>
          <td>
            <flatpickr class="minimalMarginTop" timeFormat="m-d-Y" v-on:updatedDate="updateDateReturnFiled" id="rad_date_filed"/>
            <small v-if="dateReturnedFiled.error" class="text-danger d-block">Select a date</small>
          </td>
          <td>
            <el-input v-if="returnType.selected !== '941' && returnType.selected !== '941X' " v-model="amount.input"/>
            <b class="d-block" v-else>0</b>
            <small v-if="amount.error" class="text-danger d-block">Enter a value</small>
          </td>
          <td>
            <el-input v-model="claimed.input"/>
            <small v-if="claimed.error" class="text-danger d-block">Enter a value</small>
          </td>
          <td>
            <p class="mt-2">{{ returnCalculatedCreditsAvailable }}</p>
          </td>
        </tr>
        </tbody>
      </table>

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
          display: true,
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
        received: {
          input: '0',
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
      ...mapGetters(['returnActiveCompanyResearchAndDevelopmentData',
        'returnCurrentActiveCompany',
        'returnTotalCompanyCreditsAvailable',
        'returnTotalCompanyCreditsRemaining',
        'returnTotalCompanyCreditsAmount', 'returnTotalCompanyCreditsClaimed']),
      returnCalculatedCreditsAvailable(){
        const blacklist = ['941', '941X'];
        const current = (blacklist.includes(this.returnType.selected)) ? (parseFloat(this.returnTotalCompanyCreditsAmount) - parseFloat(this.returnTotalCompanyCreditsClaimed) - parseFloat(this.amount.input)).toFixed(2) : (parseFloat(this.returnTotalCompanyCreditsAmount) - parseFloat(this.returnTotalCompanyCreditsClaimed) + parseFloat(this.amount.input)).toFixed(2);
        console.warn('returnCalculatedCreditsAvailable ', this.returnTotalCompanyCreditsAmount, this.returnTotalCompanyCreditsClaimed, this.amount.input);
        // const n1 = (blacklist.includes(this.returnType.selected)) ? current : parseFloat(this.amount.input);
        const n1 = current;
        const n2 = parseFloat(this.claimed.input);
        const calculation = (n1 - n2);
        return (isNaN(calculation)) ? 0 : calculation.toFixed(2);
      }
    },
    methods: {
      ...mapActions(['updateCompanyWithNewCreditAndForm', 'deleteResearchRecord', 'onUpdateResearchAndDevelopmentCreditReceived', 'onUpdateResearchAndDevelopmentCreditAmount', 'onUpdateResearchAndDevelopmentCreditClaimed']),
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
            this.quarter.display = true;
            this.amount.input = 0;
            break;
          default:
            this.quarter.selected = '--';
            this.quarter.display = false;
            this.amount.input = '';
        }
      },
      updateYear(event) {
        this.year.year = event;
      },
      handleQuarterCommand(command) {
        this.quarter.selected = command;
      },
      deleteRecord(id) {
        console.log('deleteRecord ', id);
        this.deleteResearchRecord(id);

        this.$notify({
          title: 'Success',
          message: 'Credit was deleted.',
          type: 'success'
        });

      },
      onUpdateCreditReceived(rID) {
        // rad is the R&D Object
        const ur = parseFloat(document.getElementById(`updatedReceived_${rID}`).value).toFixed(2);
        this.onUpdateResearchAndDevelopmentCreditReceived({id: rID, received: ur});
      },
      onUpdateAmountReceived(rID) {
        // rad is the R&D Object
        const ur = parseFloat(document.getElementById(`updatedAmount_${rID}`).value).toFixed(2);
        this.onUpdateResearchAndDevelopmentCreditAmount({id: rID, amount: ur});
      },
      onUpdateAmountClaimed(rID) {
        // rad is the R&D Object
        const ur = parseFloat(document.getElementById(`updatedClaimed_${rID}`).value).toFixed(2);
        this.onUpdateResearchAndDevelopmentCreditClaimed({id: rID, claimed: ur});
      },
      rowByRowCalculation(index){
        const amountArr = [];
        const claimedArr = [];
        if (index === 0) {
          amountArr.push(this.returnActiveCompanyResearchAndDevelopmentData[index].credit_amount);
          claimedArr.push(this.returnActiveCompanyResearchAndDevelopmentData[index].credit_claimed);
          return (amountArr[0] - claimedArr[0]);
        } else {
          //Add in Previous & Current
          for (let i = 0; i <= index; i++ ) {
            amountArr.push(this.returnActiveCompanyResearchAndDevelopmentData[i].credit_amount);
            claimedArr.push(this.returnActiveCompanyResearchAndDevelopmentData[i].credit_claimed);
          }

          // Calculate Each
          const totalAmount = [];
          amountArr.forEach( c => { (parseFloat(c)) ? totalAmount.push(parseFloat(c)) : 0 });

          const totalClaimed = [];
          claimedArr.forEach( c => { (parseFloat(c)) ? totalClaimed.push(parseFloat(c)) : 0 });

          const runningAmount = totalAmount.reduce((a,b) => a+b,0);
          const runningClaimed = totalClaimed.reduce((a,b) => a+b,0);

          // console.warn('rowByRowCalculation 2nd Iteration + ', {a: amountArr, t: runningAmount}, {c: claimedArr, t: runningClaimed});

          return (runningAmount - runningClaimed).toFixed(2);
        }

      },
    }
  }
</script>

<style scoped>

</style>
