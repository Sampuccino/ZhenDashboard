<template>
  <div class="container">

    <div class="row justify-content-between align-content-around">
      <div class="col-7 bg-white p-4 mb-3">
        <credit-chart-component/>
      </div>
      <div class="col-5 mb-3 no-gutters">
        <last-year-you-can-claim-payroll-component/>
      </div>
    </div>

    <div class="row">
      <div class="col-12 bg-white p-4 mb-3">
        <next-eligible-quarter-component/>
      </div>
      <div class="col-12 bg-white p-4 mb-3">
        <recent-events-component/>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "DashboardComponent"
  }
</script>

<style scoped>

</style>
