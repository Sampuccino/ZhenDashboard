<template>
  <section>
    <h2>Current Selected Menu {{ returnSelectedMenu }}</h2>
    <h6>{{ returnIntro || 'No intro found' }}</h6>
    <client-details-header-component/>

    <dashboard-component v-show="returnSelectedMenu === 2"/>

  </section>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "ApplicationContainer",
    computed: {
      ...mapGetters(['returnIntro', 'returnSelectedMenu'])
    }
  }
</script>

<style scoped>

</style>
