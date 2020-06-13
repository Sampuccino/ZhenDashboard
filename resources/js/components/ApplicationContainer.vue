<template>
  <section>
    <client-details-header-component/>

    <!--Dashboard-->
    <dashboard-component v-if="this.returnSelectedMenu === 2"/>

    <!--Research and Development-->
    <research-and-development-credits-component v-if="this.returnSelectedMenu === 3 && this.returnCurrentActiveCompany !== null"/>

    <!--Forms-->
    <forms-component v-if="this.returnSelectedMenu === 4.1 && this.returnCurrentActiveCompany !== null"
                     :ty_8974="t_8974"
                     :ty_941="t_941"
                     :ty_941_url="t_941_url"
                     :ty_941s_url="t_941s_url"
                     :ty_941s="t_941s"
                     :ty_941x_url="t_941x_url"
                     :ty_941x="t_941x"
                     :ty_6765="t_6765"
                     :ty_6765_url="t_6765_url"
                     :ty_3523="t_3523"
                     :ty_3523_url="t_3523_url"
    />

    <p-o-wand-s-o-w-component v-if="this.returnSelectedMenu === 4.2 && this.returnCurrentActiveCompany !== null"/>

    <!--IRS Forms-->
    <select-form-template v-if="this.returnSelectedMenu === 5"
                          :type_8974="t_8974"
                          :type_941="t_941"
                          :type_941_url="t_941_url"
                          :type_941s_url="t_941s_url"
                          :type_941s="t_941s"
                          :type_941x_url="t_941x_url"
                          :type_941x="t_941x"
                          :type_6765="t_6765"
                          :type_6765_url="t_6765_url"
                          :type_3523="t_3523"
                          :type_3523_url="t_3523_url"/>

    <!--Profile-->
    <profile-company-component v-show="this.returnSelectedMenu === 6 && this.returnCurrentActiveCompany !== null"/>

    <!--Setup-->
    <setup-company-component v-if="this.returnSelectedMenu === 7"/>

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
  import SelectFormTemplate from "./SelectFormTemplate";
  import POWandSOWComponent from "./POWandSOWComponent";

  export default {
    name: "ApplicationContainer",
    props: {
      t_8974: String,
      t_941: String,
      t_941_url: String,
      t_941s_url: String,
      t_941s: String,
      t_941x_url: String,
      t_941x: String,
      t_6765: String,
      t_6765_url: String,
      t_3523: String,
      t_3523_url: String
    },
    components: {
      POWandSOWComponent,
      SelectFormTemplate,
      FormsComponent,
      ResearchAndDevelopmentCreditsComponent,
      ClientDetailsHeaderComponent, DashboardComponent, ProfileCompanyComponent, SetupCompanyComponent},
    computed: {
      ...mapGetters(['returnSelectedMenu', 'returnCurrentActiveCompany']),
    }
  }
</script>

<style scoped>

</style>
