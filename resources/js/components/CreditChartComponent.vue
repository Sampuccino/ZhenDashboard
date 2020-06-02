<template>
  <div>
    <div class="row">
      <div class="col-4 text-center my-auto">
        <h6 class="font-weight-bold text-danger">Total Credits</h6>
        <h4 class="text-danger">{{ returnFormattedCompanyCreditsAvailable }}</h4>
      </div>
      <div class="col-4 text-center my-auto">
        <h6 class="font-weight-bold text-primary">Credits Filed</h6>
        <h4 class="text-primary">{{ returnFormattedCompanyCreditsClaimed }}</h4>
      </div>
      <div class="col-4 text-center my-auto">
        <h6 class="font-weight-bold text-success">Credits Received</h6>
        <h4 class="text-success">{{ returnFormattedCompanyCreditsReceived }}</h4>
      </div>
    </div>

    <canvas ref="canvas" id="myChart" width="400" height="400"></canvas>

  </div>
</template>

<script>
  import {Bar} from 'vue-chartjs'
  import {mapGetters} from "vuex";
  import NumberFormatter from "../../utilities/NumberFormatter";

  export default {
    extends: Bar,
    name: "CreditsChartComponent",
    mounted() {
      this.renderBarChart()
    },
    beforeUpdate(){
      this.$data._chart.destroy();
      this.renderBarChart()
    },
    computed: {
      ...mapGetters(['returnTotalCompanyCreditsAvailable',
        'returnTotalCompanyCreditsClaimed',
        'returnTotalCompanyCreditsReceived',
        'returnTotalCompanyCreditsAmount']),
      returnFormattedCompanyCreditsAvailable(){
        return NumberFormatter.convertToStringAndAddDecimal(this.returnTotalCompanyCreditsAmount)
      },
      returnFormattedCompanyCreditsClaimed(){
        return NumberFormatter.convertToStringAndAddDecimal(this.returnTotalCompanyCreditsClaimed)
      },
      returnFormattedCompanyCreditsReceived(){
        return NumberFormatter.convertToStringAndAddDecimal(this.returnTotalCompanyCreditsReceived)
      },
    },
    methods: {
      renderBarChart() {
        this.renderChart({
          labels: ['Total Credits', 'Credits Filed', 'Credits Recieved'],
            datasets: [{
            label: "",
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
            data: [this.returnTotalCompanyCreditsAmount, this.returnTotalCompanyCreditsClaimed, this.returnTotalCompanyCreditsReceived, 0],
          }],
        },
        {
          responsive: false,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Credits Overview'
          }
        },
        )
      }
    }
  }
</script>
