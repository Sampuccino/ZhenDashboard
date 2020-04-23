<template>
  <div class="text-center no-gutters bg-white p-4">
    The last year you can claim payroll is <br>
    <b class="text-primary">{{ returnLastYearClaimablePayroll || 'n/a' }}</b>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "LastYearYouCanClaimPayrollComponent",
    computed: {
      ...mapGetters(['returnLastYearClaimablePayroll'])
    }
  }
</script>

<style scoped>

</style>
