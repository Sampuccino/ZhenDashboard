<template>
  <div>
    <h6>Recent Events</h6>
    <section data-placement="parent">

      <section>
        <article v-for="(ev, index) in this.returnActiveCompanyAlerts" :key="index">
          <u><i>{{ new Date(ev.created_at).toDateString() }}</i></u>
          <h6>
            <u>
              {{ ev.company_name }}
            </u>
          </h6>

          <h6>{{ ev.title }}</h6>
          {{ ev.body }}
          <hr>
        </article>
      </section>
    </section>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

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
    computed: {
      ...mapGetters(['returnStoredCompanyEvents', 'returnActiveCompanyAlerts'])
    },
    methods: {
      ...mapActions(['requestLatestCompanyEvents', 'requestPaginatedLatestCompanyEvents']),
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
