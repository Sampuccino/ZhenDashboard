<template>
  <div class="col-12">
    <div class="row bg-white p-4 mb-3">
      <div class="col-3">
        <el-dropdown @command="handleCommand" class="mt-2">
        <span class="btn-link">
          <b id="activeName">{{ companyName || 'Company List' }}</b> <i class="el-icon-arrow-down el-icon--right"></i>
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
      <div class="col-2 my-auto">
        <el-button type="text" @click="deleteCompany" class="text-danger">Delete Company</el-button>
      </div>

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
      ...mapActions(['setCompaniesList', 'handleSelectedCompany', 'onDeleteCompany']),
      handleCommand(command) {
        this.companyName = command[1];
        this.phone = command[2];
        this.email = command[3];
        this.handleSelectedCompany(command[0]);
      },
      reformatDate(d) {
        return d.split('-');
      },
      deleteCompany() {
        this.$confirm('This will permanently delete the company. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {

          this.$message({
            type: 'success',
            message: 'Delete completed'
          });

          // Commit to Store & Request
          this.onDeleteCompany(this.returnCurrentActiveCompany);

        }).catch((err) => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });

          console.error(err);
        });
      }
    },
    updated() {
      console.warn('ClientDetailsHeaderComponent Updated');
      if (this.returnCurrentActiveCompany !== null) {
        this.companyName = this.returnCurrentActiveCompany.name;
        // Empty the Setup Pickers
        // document.getElementById('calendar_year_bsd').value = "";
        // document.getElementById('calendar_year_ye').value = "";
        // document.getElementById('calendar_year_fiy').value = "";

        // Populate Profile
        setTimeout(() => {
          document.getElementById('profile-cn').value = this.returnCurrentActiveCompany.name;
          document.getElementById('profile-taxid').value = this.returnCurrentActiveCompany.ein;
          const bsd = this.reformatDate(this.returnCurrentActiveCompany.business_start_date);
          const ye = this.reformatDate(this.returnCurrentActiveCompany.business_first_year_end_date);
          const fiy = this.reformatDate(this.returnCurrentActiveCompany.first_income_year);
          // const od = this.reformatDate(this.returnCurrentActiveCompany.override_date);
          document.getElementById('calendar_year_bsd').value = `${bsd[1]}-${bsd[2]}-${bsd[0]}`;
          document.getElementById('calendar_year_ye').value = `${ye[1]}-${ye[2]}-${ye[0]}`;
          document.getElementById('calendar_year_fiy').value = `${fiy[1]}-${fiy[2]}-${fiy[0]}`;
          document.getElementById('calendar_year_od').value = '';
          document.getElementById('profile-email').value = this.returnCurrentActiveCompany.email;
          document.getElementById('profile-phone').value = this.returnCurrentActiveCompany.phone;
          document.getElementById('profile-officer').value = this.returnCurrentActiveCompany.officer;
          document.getElementById('profile-company').innerText = this.returnCurrentActiveCompany.company_type;
        }, 1000)

      }
    }
  }
</script>

<style scoped>

</style>
