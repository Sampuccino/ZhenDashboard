<template>
  <div>
    <div id="capture">
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

      <canvas ref="canvas" id="myChart" width="400" height="400" :options="{ legend: { display: false }}"></canvas>
      <!--    <apexchart type="bar" ref="canvas" id="myChart" height="500" width="500" :options="chartOptions" :series="series"/>-->
      </div>

    <div>
      <el-button type="primary" class="mt-3" @click="capture">Download Report</el-button>
    </div>

    </div>
</template>

<script>
  import {PDFDocument, rgb, StandardFonts} from 'pdf-lib';
  import {Bar} from 'vue-chartjs'
  import VueApexCharts from 'vue-apexcharts'
  import htmlToImage from 'html-to-image';
  import download from "downloadjs";
  import axios from "axios";
  import {mapGetters} from "vuex";
  import NumberFormatter from "../../utilities/NumberFormatter";

  // Vue.component('apexchart', VueApexCharts);

  export default {
    extends: Bar,
    name: "CreditsChartComponent",
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        series: [{
          data: [400, 580, 1380]
        }],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          colors: ['#F44336', '#E91E63', '#9C27B0'],
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom'],
          }
        }
      }
    },
    mounted() {
      this.renderBarChart()
    },
    beforeUpdate() {
      this.$data._chart.destroy();
      this.renderBarChart()
    },
    computed: {
      ...mapGetters(['returnTotalCompanyCreditsAvailable',
        'returnTotalCompanyCreditsClaimed',
        'returnTotalCompanyCreditsReceived',
        'returnTotalCompanyCreditsAmount',
        'returnCurrentActiveCompany',
        'returnStoredCompanyEvents']),
      returnFormattedCompanyCreditsAvailable() {
        return NumberFormatter.convertToStringAndAddDecimal(this.returnTotalCompanyCreditsAmount)
      },
      returnFormattedCompanyCreditsClaimed() {
        return NumberFormatter.convertToStringAndAddDecimal(this.returnTotalCompanyCreditsClaimed)
      },
      returnFormattedCompanyCreditsReceived() {
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
            legend: {
              display: false,
            },
            responsive: false,
            maintainAspectRatio: true,
            title: {
              display: true,
              text: `Credits Overview ${(this.returnCurrentActiveCompany !== null) ? 'for ' + this.returnCurrentActiveCompany.name : ''}`
            }
          },
        )
      },
      capture() {
        const that = this;
        htmlToImage.toPng(document.getElementById('capture'))
        .then(async function (dataUrl) {

          const { data } = await axios.post('/api/company/b64-upload', {b64: dataUrl});

          // Returns Base64 encoded Image
          // Send to server to decode and store
          // Return URL
          // Generate report
          const pngUrl = data.image;
          const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

          const pdfDoc = await PDFDocument.create();

          /* Embed */
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const pngImage = await pdfDoc.embedPng(pngImageBytes);
          const pngDims = pngImage.scale(0.5);

          const page = pdfDoc.addPage();

          const COLOR = rgb(0, 0, 0);
          const baseOptions = {
            size: 10,
            font: helveticaFont,
            color: COLOR,
          };

          const baseOptionsHeading = {
            size: 11,
            font: helveticaFont,
            color: COLOR,
          };

          // page.drawText('You can create PDFs!');

          /* Draw Image */
          page.drawImage(pngImage, {
            x: page.getWidth() / 2 - pngDims.width / 2 + 100,
            y: page.getHeight() / 2 - pngDims.height + 500,
            width: (pngDims.width) / 1.25,
            height: (pngDims.height) / 1.25,
          });

          /* Draw Company Messages : Latest 5
          * Already orders from latest @ top
          * */
          const company_events = that.returnStoredCompanyEvents;
          console.warn(company_events.length, company_events);

          if (company_events.length > 0) {
            company_events.forEach(el => {
              let idx = 0;

              // Title
              page.drawText(el.title, {
                x: page.getWidth() / 2 - pngDims.width / 2 + 100,
                y: page.getHeight() / 2 - pngDims.height + (480 - (idx * 30)),
                width: (pngDims.width) / 1.25,
                height: (pngDims.height) / 1.25,
                ...baseOptionsHeading
              });

              // Body
              page.drawText(el.body, {
                x: page.getWidth() / 2 - pngDims.width / 2 + 100,
                y: page.getHeight() / 2 - pngDims.height + (470 - (idx * 30)),
                width: (pngDims.width) / 1.25,
                height: (pngDims.height) / 1.25,
                ...baseOptions
              });

              idx++;
            })
          }


          const pdfBytes = await pdfDoc.save();

          download(pdfBytes, Date.now()+'.pdf', "application/pdf");

          that.$notify({
            title: 'Success',
            message: 'Report successfully generated and downloaded.',
            type: 'success'
          });

        });

        // htmlToImage.toJpeg(document.getElementById('capture'), { backgroundColor: '#fffff', quality: 0.95, })
        // .then(function (dataUrl) {
        //   let link = document.createElement('a');
        //   link.download = 'my-image-name.jpeg';
        //   link.href = dataUrl;
        //   link.click();
        // });

      },
    }
  }
</script>
