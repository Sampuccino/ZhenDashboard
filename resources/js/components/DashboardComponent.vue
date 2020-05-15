<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-7 bg-white p-4 mb-3">
        <credits-chart-component/>
      </div>

      <div class="col-5 mb-3 mr-0 pr-0">
        <last-year-you-can-claim-payroll-component/>

        <section class="bg-white p-4 mt-3">
          <recent-events-component/>
        </section>

      </div>

      <div class="col-12 ml-0 pl-0 mr-0 pr-0">
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
