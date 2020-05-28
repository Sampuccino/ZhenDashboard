import Vue from "vue";
import Vuex from "vuex"
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    intro: 'Welcome to Application Container',
    selectedMenu: 2,
    companies: [], // Array of Objects
    company: {},
    companyRaD: [], // Array of Objects
    companyForms: [], // Array of Objects,
    allCompanyEvents: [], // Array of Objects
    creditsAvailable: 0,
    creditsClaimed: 0,
    creditsReceived: 0,
    calculationStartDate: '1/1/1000',
    fiscalCalendarCalculations: {}

  },
  getters: {
    returnIntro: state => {
        return state.intro;
    },
    returnSelectedMenu: state => {
      return state.selectedMenu;
    },
    returnCurrentActiveCompany: state => {
      return (Object.keys(state.company).length === 0) ? null : state.company;
    },
    returnCurrentActiveCompanyAsArray: state => {
      return (Object.keys(state.company).length === 0) ? null : [state.company];
    },
    returnAllCompanies: state => {
      return state.companies;
    },
    returnCompanyNameAndEID: state => {
      return (Object.keys(state.company).length === 0) ? [] : [state.company.name, state.company.ein] ;
    },
    returnActiveCompanyResearchAndDevelopmentData: state => {
      return state.companyRaD;
    },
    returnActiveCompanyAlerts: state => {
      return state.allCompanyEvents;
    },
    returnTotalCompanyCreditsAvailable: state => {
      if (state.companyRaD.length) {
        console.log('You have credits!');
        // credit_available:
        const creditsAvailableArr = [];
        const creditsArr = state.companyRaD.forEach( c => { (parseFloat(c.credit_available)) ? creditsAvailableArr.push(parseFloat(c.credit_available)) : '' });
        return creditsAvailableArr.reduce((a,b) => a+b,0) || 0.00;
      }

      console.log('NO! credits!');
      return 0;
    },
    returnTotalCompanyCreditsRemaining: state => {
      if (state.companyRaD.length) {
        console.log('Getter returnTotalCompanyCreditsRemaining!');
        return parseFloat(state.companyRaD[state.companyRaD.length - 1].credit_available).toFixed(2);
      }
      return 0;
    },
    returnTotalCompanyCreditsClaimed: state => {
      if (state.companyRaD.length) {
      // credit_claimed:
        const creditsClaimedArr = [];
        const creditsArr = state.companyRaD.forEach( c => {  (parseFloat(c.credit_claimed)) ? creditsClaimedArr.push(parseFloat(c.credit_claimed)) : '' });
        return creditsClaimedArr.reduce((a,b) => a+b,0) || 0.00;
      }

      return 0;
    },
    returnTotalCompanyCreditsReceived: state => {
      if (state.companyRaD.length) {
      // credit_received:
        const creditsReceivedArr = [];
        const creditsArr = state.companyRaD.forEach( c => { (parseFloat(c.credit_received)) ? creditsReceivedArr.push(parseFloat(c.credit_received)) : '' });
        return creditsReceivedArr.reduce((a,b) => a+b,0) || 0.00;
      }

      return 0;
    },
    returnTotalCompanyCreditsAmount: state => {
      if (state.companyRaD.length) {
        console.log('You have credits!');
        // credit_available:
        const creditsAmountArr = [];
        const creditsArr = state.companyRaD.forEach( c => { (parseFloat(c.credit_amount)) ? creditsAmountArr.push(parseFloat(c.credit_amount)) : '' });
        return creditsAmountArr.reduce((a,b) => a+b,0) || 0.00;
      }

      console.log('NO Total Credits!');
      return 0;
    },
    returnLastYearClaimablePayroll: state => {
      // console.warn('returnLastYearClaimablePayroll ', state.company);
      return state.company.final_date_payroll_claim || Date.now();
    },
    returnCalculationStartDate: state => {
      return state.calculationStartDate;
    },
    returnFiscalTypeCalculations: state => {
      return state.fiscalCalendarCalculations;
    },
    returnFiscalYearEnd: state => {
      return state.fiscalCalendarCalculations.year_end_date || 'n/a';
    },
    returnFirstIncomeYear: state => {
      return state.fiscalCalendarCalculations.first_income_year || 'n/a';
    },
    returnFinalYearPayrollClaimable: state => {
      return state.fiscalCalendarCalculations.last_year_payroll_claimable || 'n/a';
    },
    returnCompanyForms: state => {
      return state.companyForms;
    },
    returnStoredCompanyEvents: state => {
      return state.allCompanyEvents;
    }

  },
  mutations: {
    setSelectedMenu:  (state, payload) => {
      state.selectedMenu = payload.selected;
    },
    setCompaniesList: (state, payload) => {
      state.companies = payload;
    },
    handleSelectedCompany: (state, payload) => {
      /* Filtering done based on ein payload. Returns a Array with object inside */
      const c = state.companies.filter( c => {
        return c.ein === payload;
      });

      state.company = c[0];

      // Set company R&D
      state.companyRaD = c[0].research_and_development || [];

      //Set company Forms
      state.companyForms = c[0].forms || [];

      //Set company Alerts
      state.allCompanyEvents = c[0].alerts || [];

      // Update Header Name
      document.getElementById('activeName').innerText = state.company.name;

      console.warn('Mutation handleSelectedCompany ', state.company)
    },
    setCalendarYearCalculation: (state, payload) => {
      // Store date selected to perform calculations on
      state.calculationStartDate = payload.date;
      state.fiscalCalendarCalculations = payload.calculations; /* type Object */
    },
    storeNewCompanySetup: (state, payload) => {
      // Add R&D & Forms Keys
      // payload.research_and_development = payload.forms = [];
      console.warn('New Company ', payload);

      state.companies.push(payload);

      // Set company R&D blank
      state.companyRaD = [];
      //Set company Forms blank
      state.companyForms = [];
    },
    requestLatestCompanyEvents: (state, payload) => {
      state.allCompanyEvents = payload;
    },
    storeNewSingleCompanyAlert: (state, payload) => {
      state.allCompanyEvents.unshift(payload);
    },
    updateExistingCompanyObject: (state, payload) => {
      // companies
      // company
      state.company = payload;
      const currentCompanyIndex = state.companies.findIndex(( obj => obj.id === payload.id));
      state.companies.splice(currentCompanyIndex,1,payload);
    },
    updateCompanyWithNewCreditAndForm: (state, payload) => {
      console.log('Mutation updateCompanyWithNewCreditAndForm & Form ', payload);
      state.companyRaD.push(payload[0]);
      state.companyForms.push(payload[1]);
    },
    updateCompanyFormsWithUpdatedCompany: (state, payload) => {
      // Filter for Form Index,
      // Replace @ index
      const currentFormIndex = state.companyForms.findIndex(( obj => obj.id === payload.id));
      console.log('updateCompanyFormsWithUpdatedCompany ', currentFormIndex);
      state.companyForms.splice(currentFormIndex,1,payload);
    },
    deleteResearchRecord: (state, payload) => {
      // Use payload to remove R&D record from State
      const currentRDIndex = state.companyRaD.findIndex(( obj => obj.id === payload.id));
      state.companyRaD.splice(currentRDIndex,1);
    },
    onUpdateResearchAndDevelopmentCredit: (state, payload) => {
      const currentFormIndex = state.companyRaD.findIndex(( obj => obj.id === payload.id));
      state.companyRaD.splice(currentFormIndex,1,payload);
    },
    onDeleteCompany: (state, payload) => {
      console.warn('Now Deleting Company ', payload);
      const currentCompanyIndex = state.companies.findIndex(( obj => obj.id === payload.id));
      state.companies.splice(currentCompanyIndex,1);
      // Reset State
      state.company = {};
      state.companyRaD = [];
      state.companyForms = [];
      state.creditsAvailable = 0;
      state.creditsClaimed = 0;
      state.creditsReceived = 0;
      state.allCompanyEvents = [];
      // Update Header Name
      document.getElementById('activeName').innerText = 'John Doe Incorporated'
    },
    onDeleteCompanyMessage: (state, payload) => {
      // Delete from state
      const currentEvIndex = state.allCompanyEvents.findIndex(( obj => obj.id === payload.id));
      state.allCompanyEvents.splice(currentEvIndex,1);
    },
    onDeleteCompanyForm: (state, payload) => {
      // Remove file from state
      const currentCompanyIndex = state.companyForms.findIndex(( obj => obj.id === payload.id));
      state.companyForms.splice(currentCompanyIndex,1, payload);
    }
  },
  actions: {
    setSelectedMenu: (context, payload) => {
      context.commit('setSelectedMenu', {selected: parseInt(payload)})
    },
    setCompaniesList: (context, payload) => {
      console.warn('Action setCompaniesList ', payload);
      context.commit('setCompaniesList', payload);
    },
    handleSelectedCompany: (context, payload) => {
      context.commit('handleSelectedCompany', payload);
    },
    setCalendarYearCalculation: async (context, payload) => {
      const calculations = await axios.post(`/api/company/claim-calculation/${payload.date}/${payload.endDate}`);
      context.commit('setCalendarYearCalculation', {date: payload.date, calculations: calculations.data});
    },
    storeNewCompanySetup: (context, payload) => {
      context.commit('storeNewCompanySetup', payload);
    },
    requestLatestCompanyEvents: async (context) => {
      const requestedEvents = await axios.get('/api/company/events');
      console.log('requestLatestCompanyEvents ', requestedEvents.data);
      context.commit('requestLatestCompanyEvents', requestedEvents.data);
    },
    requestPaginatedLatestCompanyEvents: async (context, payload) => {
      const nextSetResults = await axios.get(payload);
      console.log('requestPaginatedLatestCompanyEvents ', nextSetResults);
    },
    storeNewSingleCompanyAlert: (context, payload) => {
      context.commit('storeNewSingleCompanyAlert', payload);
    },
    updateExistingCompanyObject: (context, payload) => {
      console.warn('Action updateExistingCompanyObject ', payload);
      context.commit('updateExistingCompanyObject', payload);
    },
    updateCompanyWithNewCreditAndForm: (context, payload) => {
      context.commit('updateCompanyWithNewCreditAndForm', payload);
    },
    updateCompanyFormsWithUpdatedCompany: (context, payload) => {
      context.commit('updateCompanyFormsWithUpdatedCompany', payload); // Form Object
    },
    deleteResearchRecord: async (context, payload) => {
      const deletedRecord = await axios.delete(`/api/company/delete-credit/${payload}`);
      context.commit('deleteResearchRecord', payload); // Form Object
    },
    onUpdateResearchAndDevelopmentCreditReceived: async (context, payload) => {
      const record = await axios.put(`/api/company/update-rdc/${payload.id}`, {credit_received: payload.received});
      context.commit('onUpdateResearchAndDevelopmentCredit', record.data); // Form Object
    },
    onUpdateResearchAndDevelopmentCreditAmount: async (context, payload) => {
      const record = await axios.put(`/api/company/update-rdc/${payload.id}`, {credit_amount: payload.amount});
      context.commit('onUpdateResearchAndDevelopmentCredit', record.data); // Form Object
    },
    onUpdateResearchAndDevelopmentCreditClaimed: async (context, payload) => {
      const record = await axios.put(`/api/company/update-rdc/${payload.id}`, {credit_claimed: payload.claimed});
      context.commit('onUpdateResearchAndDevelopmentCredit', record.data); // Form Object
    },
    onDeleteCompany: async (context, payload) => {
      // Delete Request
      await axios.delete(`/api/company/${payload.id}`);
      context.commit('onDeleteCompany', payload);
    },
    onDeleteCompanyMessage: async (context, payload) => {
      await axios.delete(`/api/company/events/${payload.id}`, payload);
      context.commit('onDeleteCompanyMessage', payload); // Form Object
    },
    onDeleteCompanyForm: async (context, payload) => {
      let key = (!('file_one_url' in payload)) ? payload.file_two_url : payload.file_one_url;
      console.log('Action: onDeleteCompanyForm ', key);
      const record = await axios.post(`/api/company/form/${payload.id}`, {
        selected: payload.selected,
        f: key
      });
      context.commit('onDeleteCompanyForm', record.data);
    }

  }
})
