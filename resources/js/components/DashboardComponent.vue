<template>
  <div class="container">

    <div class="row justify-content-between align-content-around">
      <div class="col-7 bg-white p-4 mb-3">
        <credits-chart-component/>
      </div>
      <div class="col-5 mb-3 no-gutters">
        <last-year-you-can-claim-payroll-component/>
      </div>
    </div>

    <div class="row">
      <div class="col-12 bg-white p-4 mb-3">
        <next-eligible-quarter-component/>
      </div>
    </div>

    <div class="row justify-content-between">
      <div class="col-md-7 pr-md-1">
        <section class="bg-white p-4">
          <recent-events-component/>
        </section>
      </div>

      <div class="col-md-5 pl-md-2">
        <section class="bg-white p-4">
          <new-event-component/>
        </section>
      </div>

    </div>


  </div>
</template>

<script>
  import NewEventComponent from "./NewEventComponent";
  import RecentEventsComponent from "./RecentEventsComponent";
  import NextEligibleQuarterComponent from "./NextEligibleQuarterComponent";
  import LastYearYouCanClaimPayrollComponent from "./LastYearYouCanClaimPayrollComponent";
  import CreditsChartComponent from "./CreditChartComponent";

  export default {
    name: "DashboardComponent",
    components: {
      CreditsChartComponent,
      LastYearYouCanClaimPayrollComponent,
      NextEligibleQuarterComponent, RecentEventsComponent, NewEventComponent}
  }
</script>

<style scoped>

</style>
