<template>
  <div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";

  export default {
    name: "CreditsChartComponent",
    mounted() {
      let ctx = document.getElementById('myChart').getContext('2d');
      let myChart = new Chart(ctx, {
        // type: 'horizontalBar',
        type: 'bar',
        data: {
          labels: ['Total Credits', 'Credits Filed', 'Credits Recieved'],
          datasets: [{
            label: '# of Votes',
            data: [19, 12, 3],
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
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }
</script>

<style scoped>

</style>