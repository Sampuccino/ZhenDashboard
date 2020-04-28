<template>
  <div class="text-center no-gutters bg-white p-4">
    The last year you can claim payroll is <br>
    <b class="text-primary">{{ lastPayrollDate || 'n/a' }}</b>
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
        return moment(this.returnLastYearClaimablePayroll).format('YYYY-MM-DD');
      }
    }
  }
</script>

<style scoped>

</style>
