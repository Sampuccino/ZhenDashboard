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
      state.allCompanyEvents.data.unshift(payload);
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
    }
  }
})
