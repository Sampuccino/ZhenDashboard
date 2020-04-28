<template>
  <section>
    <h2>Current Selected Menu {{ returnSelectedMenu }}</h2>
    <h6>{{ returnIntro || 'No intro found' }}</h6>
    <client-details-header-component/>

    <!--Dashboard-->
    <dashboard-component v-show="returnSelectedMenu === 2"/>

    <!--Setup-->
    <setup-company-component v-show="returnSelectedMenu === 6"/>

  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import SetupCompanyComponent from "./SetupCompanyComponent";

  export default {
    name: "ApplicationContainer",
    components: {SetupCompanyComponent},
    computed: {
      ...mapGetters(['returnIntro', 'returnSelectedMenu'])
    }
  }
</script>

<style scoped>

</style>
