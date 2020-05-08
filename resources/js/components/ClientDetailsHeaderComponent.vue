<template>
  <div class="row bg-white p-4 mb-3">
    <div class="col-5">
      <el-dropdown @command="handleCommand">
        <span class="btn-link">
          {{ companyName || 'Company List' }} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(company, index) in companies"
            :key="index"
            :command="[company.ein, company.name, company.phone, company.email]">
            {{ company.name || 'Company Name Here' }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="col-3 my-auto">
      <i class="el-icon-phone"></i> {{ phone || '(111) 111-1111' }}
    </div>
    <div class="col-4 my-auto">
      <i class="el-icon-message"></i> {{ email || 'example@example.com' }}
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "ClientDetailsHeaderComponent",
    data: function () {
      return {
        companies: [],
        companyName: 'John Doe Incorporated',
        phone: '111-111-1111',
        email: 'jd@email.com',

      }
    },
    async created() {
      const companyList = await axios.get('/api/company');
      console.log('Client Details Header Created ', companyList.data);
      this.companies = companyList.data;
      this.setCompaniesList(companyList.data);
    },
    computed: {
      ...mapGetters(['returnCurrentActiveCompany'])
    },
    methods: {
      ...mapActions(['setCompaniesList', 'handleSelectedCompany']),
      handleCommand(command) {
        this.companyName = command[1];
        this.phone = command[2];
        this.email = command[3];
        this.handleSelectedCompany(command[0]);
      },
    },
    updated() {
      console.warn('ClientDetailsHeaderComponent Updated');
      if (this.returnCurrentActiveCompany !== null) {
        this.companyName = this.returnCurrentActiveCompany.name;
        document.getElementById('calendar_year_bsd').value = "";
        document.getElementById('calendar_year_ye').value = "";
        document.getElementById('calendar_year_fiy').value = "";
      }
    }
  }
</script>

<style scoped>

</style>
