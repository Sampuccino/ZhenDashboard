<template>
  <div class="col-12">
    <div class="row bg-white p-4 mb-3">
      <div class="col-5">
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
        associatedTo: {company_id: '', company_name: ''},
        companyName: 'Select a company',
        phone: 'phone number',
        email: 'email address',

      }
    },
    async created() {
      const companyList = await axios.get('/api/company');
      const {data} = await axios.get('/association');

      this.associatedTo.company_id = data.company_id;
      this.associatedTo.company_name = data.company_name;

      // Filter out if NOT Admin to Assigned Company
      if (this.returnActiveUser.status !== 'Admin') {
          const found = companyList.data.findIndex((obj => obj.id === data.company_id));
          this.companies = [companyList.data[found]];
          console.warn('Filtering Done ', this.companies);
      } else {
          this.companies = companyList.data;
      }

      this.setCompaniesList(companyList.data);
      this.setCompanyAssociation(data);

    },
    computed: {
      ...mapGetters(['returnCurrentActiveCompany', 'returnActiveUser'])
    },
    methods: {
      ...mapActions(['setCompaniesList', 'handleSelectedCompany', 'setCompanyAssociation']),
      handleCommand(command) {
        this.companyName = command[1];
        this.phone = command[2];
        this.email = command[3];
        this.handleSelectedCompany(command[0]);
      },
      reformatDate(d) {
        return d.split('-');
      },
    },
    updated() {
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
          document.getElementById('profile-address').value = this.returnCurrentActiveCompany.address;

          document.getElementById('ps_company').value = this.returnCurrentActiveCompany.payroll_provider_company_name;
          document.getElementById('ps_individual').value = this.returnCurrentActiveCompany.payroll_provider_individual_name;
          document.getElementById('ps_email').value = this.returnCurrentActiveCompany.payroll_provider_email;
          document.getElementById('ps_phone').value = this.returnCurrentActiveCompany.payroll_provider_phone;
          document.getElementById('trs_company').value = this.returnCurrentActiveCompany.tax_provider_company_name;
          document.getElementById('trs_individual').value = this.returnCurrentActiveCompany.tax_provider_individual_name;
          document.getElementById('trs_email').value = this.returnCurrentActiveCompany.tax_provider_email;
          document.getElementById('trs_phone').value = this.returnCurrentActiveCompany.tax_provider_phone;
        }, 1000)

      }
    }
  }
</script>

<style scoped>

</style>
