<template>
  <div class="text-center no-gutters bg-white p-4">
    The last year you can claim payroll is <br>
    <div class="alert alert-success" role="alert">
      <b>{{ lastPayrollDate || 'n/a' }}</b>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import * as moment from "moment";

  export default {
    name: "LastYearYouCanClaimPayrollComponent",
    computed: {
      ...mapGetters(['returnLastYearClaimablePayroll']),
      lastPayrollDate() {
        // let split = this.returnLastYearClaimablePayroll.split('-');
        // return `${split[2]}-${split[1]}-${split[0]}`;
        return moment(this.returnLastYearClaimablePayroll).format('MM-DD-YYYY');
      }
    }
  }
</script>

<style scoped>

</style>
