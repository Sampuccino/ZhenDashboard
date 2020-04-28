<template>
  <div>
    <h6>Recent Events</h6>
    <section data-placement="parent">

      <section>
        <article v-for="(ev, index) in companyEvents.data" :key="index">
          <h5>
          <span>
            <b>Company: </b>
          </span>
            <u>
              {{ ev.company_name }}
            </u>
          </h5>

          <h6>{{ ev.title }}</h6>
          {{ ev.body }}
          <hr>
        </article>
      </section>
    </section>

    <el-button v-show="!this.prevPage.empty" type="primary" plain @click="requestPaginatedLatestCompanyEvents('p')">Previous</el-button>
    <el-button v-show="!this.nextPage.empty" type="primary" @click="requestPaginatedLatestCompanyEvents('n')">Next</el-button>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import axios from 'axios';

  export default {
    name: "RecentEventsComponent",
    data(){
      return {
        companyEvents: [],
        nextPage: {
          url: null,
          empty: false
        },
        prevPage: {
          url: null,
          empty: false
        },
      }
    },
    created(){
      this.requestLatestCompanyEvents();
    },
     mounted() {
      // Get all events
       if (this.returnStoredCompanyEvents.length === 0) {
         setTimeout(() => {
           console.log('Set Timeout of 2.5 seconds finished ', this.returnStoredCompanyEvents);
           this.companyEvents = this.returnStoredCompanyEvents;
           this.setNextAndPreviousButtons(this.returnStoredCompanyEvents);
         }, 2500)
       } else {
         this.companyEvents = this.returnStoredCompanyEvents;
         this.setNextAndPreviousButtons(this.returnStoredCompanyEvents);
       }
     },
    computed: {
      ...mapGetters(['returnStoredCompanyEvents'])
    },
    methods: {
      ...mapActions(['requestLatestCompanyEvents', 'requestPaginatedLatestCompanyEvents']),
      setNextAndPreviousButtons(requestObj){
        /*
        * next_page_url
        * prev_page_url
        * */
        this.prevPage.url = requestObj.prev_page_url;
        this.nextPage.url = requestObj.next_page_url;

        (requestObj.prev_page_url === null) ? this.prevPage.empty = true : this.prevPage.empty = false;
        (requestObj.next_page_url === null) ? this.nextPage.empty = true : this.nextPage.empty = false;

      },
      async requestPaginatedLatestCompanyEvents(type) {
        // Determine if next / prev result is possible
        if (type === 'p') {
          if (this.prevPage.url === null) {
            this.prevPage.empty = true;
          } else {
            const {data} = await axios.get(this.prevPage.url);
            console.log('Got Prev Page ', data);
            this.companyEvents = data;
            this.setNextAndPreviousButtons(data);
          }
        } else {
          if (this.nextPage.url === null) {
            this.nextPage.empty = true;
          } else {
            const {data} = await axios.get(this.nextPage.url);
            console.log('Got Next Page ', data);
            this.companyEvents = data;
            this.setNextAndPreviousButtons(data);
          }
        }

      }
    }
  }
</script>

<style scoped>
  [data-placement="parent"] {
    max-height: 20rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

</style>
