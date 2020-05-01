<template>
  <section>
    <h2>Current Selected Menu {{ returnSelectedMenu }}</h2>
    <h6>{{ returnIntro || 'No intro found' }}</h6>
    <client-details-header-component/>

    <!--Dashboard-->
    <dashboard-component v-if="this.returnSelectedMenu === 2"/>

    <!--Research and Development-->
    <research-and-development-credits-component v-if="this.returnSelectedMenu === 3 && this.returnCurrentActiveCompany !== null"/>

    <!--Forms-->
    <forms-component v-if="this.returnSelectedMenu === 4 && this.returnCurrentActiveCompany !== null"/>

    <!--Profile-->
    <profile-company-component v-if="this.returnSelectedMenu === 5 && this.returnCurrentActiveCompany !== null"/>

    <!--Setup-->
    <setup-company-component v-if="this.returnSelectedMenu === 6"/>

  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import SetupCompanyComponent from "./SetupCompanyComponent";
  import ProfileCompanyComponent from "./ProfileCompanyComponent";
  import DashboardComponent from "./DashboardComponent";
  import ClientDetailsHeaderComponent from "./ClientDetailsHeaderComponent";
  import ResearchAndDevelopmentCreditsComponent from "./ResearchAndDevelopmentCreditsComponent";
  import FormsComponent from "./FormsComponent";

  export default {
    name: "ApplicationContainer",
    components: {
      FormsComponent,
      ResearchAndDevelopmentCreditsComponent,
      ClientDetailsHeaderComponent, DashboardComponent, ProfileCompanyComponent, SetupCompanyComponent},
    computed: {
      ...mapGetters(['returnIntro', 'returnSelectedMenu', 'returnCurrentActiveCompany'])
    }
  }
</script>

<style scoped>

</style>
