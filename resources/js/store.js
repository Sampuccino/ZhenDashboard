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
    companyChecklist: [],
    powerAttorneyStatementWorkForms: [], // Array of Objects,
    allCompanyEvents: [], // Array of Objects
    creditsAvailable: 0,
    creditsClaimed: 0,
    creditsReceived: 0,
    calculationStartDate: '1/1/1000',
    fiscalCalendarCalculations: {},
    // For Custom Form Uploading Info
    formMeta: {
      id: '',
      fileColumn: ''
    },

    /* Interactive Form */
    title: 'Welcome to our Multiform!',
    employerIdentificationNumber: 'XXXXXXXXX',
    name: '',
    tradeName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    foreignCountryName: '',
    foreignCountryProvince: '',
    foreignCountryZip: '',
    reportForThisQuarter: 1,
    calendarYear: '',
    form941Line5AColumn2: 0.00,
    form941Line5BColumn2: 0.00,
    form8974Line12: 0.00,
    formScheduleBTaxLiabilityMonthOne: 0,
    formScheduleBTaxLiabilityMonthTwo: 0,
    formScheduleBTaxLiabilityMonthThree: 0,
    formScheduleBTotalQuarterLiability: 0,

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
      return (Object.keys(state.company).length === 0) ? [] : [state.company.name, state.company.ein];
    },
    returnActiveCompanyResearchAndDevelopmentData: state => {
      return state.companyRaD;
    },
    returnActiveCompanyAlerts: state => {
      return state.allCompanyEvents;
    },
    returnTotalCompanyCreditsAvailable: state => {
      if (state.companyRaD.length) {
        const creditsAvailableArr = [];
        const creditsArr = state.companyRaD.forEach(c => {
          (parseFloat(c.credit_available)) ? creditsAvailableArr.push(parseFloat(c.credit_available)) : ''
        });
        return creditsAvailableArr.reduce((a, b) => a + b, 0) || 0.00;
      }

      return 0;
    },
    returnTotalCompanyCreditsRemaining: state => {
      if (state.companyRaD.length) {
        return parseFloat(state.companyRaD[state.companyRaD.length - 1].credit_available).toFixed(2);
      }
      return 0;
    },
    returnTotalCompanyCreditsClaimed: state => {
      if (state.companyRaD.length) {
        // credit_claimed:
        const creditsClaimedArr = [];
        const creditsArr = state.companyRaD.forEach(c => {
          (parseFloat(c.credit_claimed)) ? creditsClaimedArr.push(parseFloat(c.credit_claimed)) : ''
        });
        return creditsClaimedArr.reduce((a, b) => a + b, 0) || 0.00;
      }

      return 0;
    },
    returnTotalCompanyCreditsReceived: state => {
      if (state.companyRaD.length) {
        // credit_received:
        const creditsReceivedArr = [];
        const creditsArr = state.companyRaD.forEach(c => {
          (parseFloat(c.credit_received)) ? creditsReceivedArr.push(parseFloat(c.credit_received)) : ''
        });
        return creditsReceivedArr.reduce((a, b) => a + b, 0) || 0.00;
      }

      return 0;
    },
    returnTotalCompanyCreditsAmount: state => {
      if (state.companyRaD.length) {
        const creditsAmountArr = [];
        const creditsArr = state.companyRaD.forEach(c => {
          (parseFloat(c.credit_amount)) ? creditsAmountArr.push(parseFloat(c.credit_amount)) : ''
        });
        return creditsAmountArr.reduce((a, b) => a + b, 0) || 0.00;
      }

      return 0;
    },
    returnLastYearClaimablePayroll: state => {
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
    },
    returnTitle: state => {
      return state.title;
    },
    returnEmployerIdentificationNumber: state => {
      return state.employerIdentificationNumber;
    },
    returnName: state => {
      return state.name;
    },
    returnTradeName: state => {
      return state.tradeName;
    },
    returnAddress: state => {
      return state.address;
    },
    returnCity: state => {
      return state.city;
    },
    returnState: state => {
      return state.state;
    },
    returnZip: state => {
      return state.zip;
    },
    returnForeignName: state => {
      return state.foreignCountryName;
    },
    returnForeignProvince: state => {
      return state.foreignCountryProvince;
    },
    returnForeignZip: state => {
      return state.foreignCountryZip;
    },
    returnCalendarYear: state => {
      return state.calendarYear;
    },
    returnQuarterSelected: state => {
      return parseInt(state.reportForThisQuarter);
    },
    returnForm941Line5AColumn2: state => {
      return state.form941Line5AColumn2;
    },
    returnForm941Line5BColumn2: state => {
      return state.form941Line5BColumn2;
    },
    returnForm8974Line12: state => {
      return state.form8974Line12;
    },
    returnScheduleBMonthOneTaxLiability: state => {
      return state.formScheduleBTaxLiabilityMonthOne
    },
    returnScheduleBMonthTwoTaxLiability: state => {
      return state.formScheduleBTaxLiabilityMonthTwo
    },
    returnScheduleBMonthThreeTaxLiability: state => {
      return state.formScheduleBTaxLiabilityMonthThree
    },
    returnScheduleBQuarterTotalTaxLiability: state => {
      return state.formScheduleBTotalQuarterLiability
    },
    returnFormInitiatedMeta: state => {
      return state.formMeta;
    },
    returnPowerAttorneyStatementWorkForms: state => {
      return state.powerAttorneyStatementWorkForms;
    },
    returnCompanyChecklist: state => {
      return state.companyChecklist
    }

  },
  mutations: {
    setSelectedMenu: (state, payload) => {
      state.selectedMenu = payload.selected;
    },
    setCompaniesList: (state, payload) => {
      state.companies = payload;
    },
    handleSelectedCompany: (state, payload) => {
      /* Filtering done based on ein payload. Returns a Array with object inside */
      const c = state.companies.filter(c => {
        return c.ein === payload;
      });

      state.company = c[0];

      // Set company R&D
      state.companyRaD = c[0].research_and_development || [];

      //Set company Forms
      state.companyForms = c[0].forms || [];

      //Set company Alerts
      state.allCompanyEvents = c[0].alerts || [];

      state.powerAttorneyStatementWorkForms = c[0].attorneystatements || [];

      state.companyChecklist = c[0].checklists || [];

      // Update Header Name
      document.getElementById('activeName').innerText = state.company.name;
    },
    setCalendarYearCalculation: (state, payload) => {
      // Store date selected to perform calculations on
      state.calculationStartDate = payload.date;
      state.fiscalCalendarCalculations = payload.calculations; /* type Object */
    },
    storeNewCompanySetup: (state, payload) => {
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
      const currentCompanyIndex = state.companies.findIndex((obj => obj.id === payload.id));
      state.companies.splice(currentCompanyIndex, 1, payload);
    },
    updateCompanyWithNewCreditAndForm: (state, payload) => {
      state.companyRaD.push(payload[0]);
      state.companyForms.push(payload[1]);
    },
    updateCompanyFormsWithUpdatedCompany: (state, payload) => {
      // Filter for Form Index,
      // Replace @ index
      const currentFormIndex = state.companyForms.findIndex((obj => obj.id === payload.id));
      state.companyForms.splice(currentFormIndex, 1, payload);
    },
    deleteResearchRecord: (state, payload) => {
      // Use payload to remove R&D record from State
      const currentRDIndex = state.companyRaD.findIndex((obj => obj.id === payload.id));
      state.companyRaD.splice(currentRDIndex, 1);
    },
    onUpdateResearchAndDevelopmentCredit: (state, payload) => {
      const currentFormIndex = state.companyRaD.findIndex((obj => obj.id === payload.id));
      state.companyRaD.splice(currentFormIndex, 1, payload);
    },
    onDeleteCompany: (state, payload) => {
      const currentCompanyIndex = state.companies.findIndex((obj => obj.id === payload.id));
      state.companies.splice(currentCompanyIndex, 1);
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
      const currentEvIndex = state.allCompanyEvents.findIndex((obj => obj.id === payload.id));
      state.allCompanyEvents.splice(currentEvIndex, 1);
    },
    onDeleteCompanyForm: (state, payload) => {
      // Remove file from state
      const currentCompanyIndex = state.companyForms.findIndex((obj => obj.id === payload.id));
      state.companyForms.splice(currentCompanyIndex, 1, payload);
    },
    updateEIN: (state, payload) => {
      state.employerIdentificationNumber = payload.employerIdentificationNumber;
    },
    updateName: (state, payload) => {
      state.name = payload.name;
    },
    updateTradeName: (state, payload) => {
      state.tradeName = payload.tradeName;
    },
    updateAddress: (state, payload) => {
      state.address = payload.address;
    },
    updateCity: (state, payload) => {
      state.city = payload.city;
    },
    updateState: (state, payload) => {
      state.state = payload.state;
    },
    updateZip: (state, payload) => {
      state.zip = payload.zip;
    },
    updateForeignCountryName: (state, payload) => {
      state.foreignCountryName = payload.foreignCountryName;
    },
    updateForeignCountryProvince: (state, payload) => {
      state.foreignCountryProvince = payload.foreignCountryProvince;
    },
    updateForeignCountryZip: (state, payload) => {
      state.foreignCountryZip = payload.foreignCountryZip;
    },
    updateCalendarYear: (state, payload) => {
      state.calendarYear = payload.calendarYear;
    },
    updateQuarterRadio: (state, payload) => {
      state.reportForThisQuarter = parseInt(payload.radioSelected);
    },
    storeForm941Line5AColumn2: (state, payload) => {
      state.form941Line5AColumn2 = parseFloat(payload.amount);
    },
    storeForm941Line5BColumn2: (state, payload) => {
      state.form941Line5BColumn2 = parseFloat(payload.amount);
    },
    storeForm8974Line12: (state, payload) => {
      state.form8974Line12 = parseFloat(payload.amount);
    },
    storeFormScheduleBTaxLiabilityMonthOne: (state, payload) => {
      state.formScheduleBTaxLiabilityMonthOne = parseFloat(payload.amount);
    },
    storeFormScheduleBTaxLiabilityMonthTwo: (state, payload) => {
      state.formScheduleBTaxLiabilityMonthTwo = parseFloat(payload.amount);
    },
    storeFormScheduleBTaxLiabilityMonthThree: (state, payload) => {
      state.formScheduleBTaxLiabilityMonthThree = parseFloat(payload.amount);
    },
    storeFormScheduleBTotalQuarterLiability: (state, payload) => {
      state.formScheduleBTotalQuarterLiability = parseFloat(payload.amount);
    },
    storeFormInitiatedMeta: ((state, payload) => {
      state.formMeta = {...payload};
    }),
    storeNewPowerAttorneyOrWorkStatementObject: (state, payload) => {
      state.powerAttorneyStatementWorkForms.push(payload);
    },
    deletePowerAttorneyOrWorkStatementObject: (state, payload) => {
      // Delete
      const currentAttorneyIndex = state.powerAttorneyStatementWorkForms.findIndex((obj => obj.id === payload));
      state.powerAttorneyStatementWorkForms.splice(currentAttorneyIndex, 1);
    },
    updateCompanyChecklistItem: async (state, payload) => {

      console.warn('Item ID ', payload);

      const currentCLItemIndex = state.companyChecklist.findIndex((obj => obj.id === payload));

      // Update Checklist Object
      if (state.companyChecklist[currentCLItemIndex].completed === 0)
        state.companyChecklist[currentCLItemIndex].completed = 1;
      else
        state.companyChecklist[currentCLItemIndex].completed = 0;

      await axios.put(`api/company/checklist/${payload}`, {
        completed: Number.parseInt(state.companyChecklist[currentCLItemIndex].completed)
      });
    },
    onSubmitNewChecklistItem: (state, payload) => {
      state.companyChecklist.push(payload);
    },
    onDeleteChecklistID: (state, payload) => {
      const currentCLIIndex = state.companyChecklist.findIndex((obj => obj.id === payload));
      state.companyChecklist.splice(currentCLIIndex, 1);
    }
  },
  actions: {
    setSelectedMenu: (context, payload) => {
      context.commit('setSelectedMenu', {selected: parseFloat(payload)})
    },
    setCompaniesList: (context, payload) => {
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
      context.commit('requestLatestCompanyEvents', requestedEvents.data);
    },
    requestPaginatedLatestCompanyEvents: async (context, payload) => {
      const nextSetResults = await axios.get(payload);
    },
    storeNewSingleCompanyAlert: (context, payload) => {
      context.commit('storeNewSingleCompanyAlert', payload);
    },
    updateExistingCompanyObject: (context, payload) => {
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
      const record = await axios.post(`/api/company/form/${payload.id}`, {
        selected: payload.selected,
        f: key
      });
      context.commit('onDeleteCompanyForm', record.data);
    },
    updateEIN: (context, payload) => {
      context.commit('updateEIN', {employerIdentificationNumber: payload})
    },
    updateName: (context, payload) => {
      context.commit('updateName', {name: payload})
    },
    updateTradeName: (context, payload) => {
      context.commit('updateTradeName', {tradeName: payload})
    },
    updateAddress: (context, payload) => {
      context.commit('updateAddress', {address: payload})
    },
    updateCity: (context, payload) => {
      context.commit('updateCity', {city: payload})
    },
    updateState: (context, payload) => {
      context.commit('updateState', {state: payload})
    },
    updateZip: (context, payload) => {
      context.commit('updateZip', {zip: payload})
    },
    updateForeignCountryName: (context, payload) => {
      context.commit('updateForeignCountryName', {foreignCountryName: payload})
    },
    updateForeignCountryProvince: (context, payload) => {
      context.commit('updateForeignCountryProvince', {foreignCountryProvince: payload})
    },
    updateForeignCountryZip: (context, payload) => {
      context.commit('updateForeignCountryZip', {foreignCountryZip: payload})
    },
    updateCalendarYear: (context, payload) => {
      context.commit('updateCalendarYear', {calendarYear: payload})
    },
    updateQuarterRadio: (context, payload) => {
      context.commit('updateQuarterRadio', {radioSelected: parseInt(payload)})
    },
    storeForm941Line5AColumn2: (context, payload) => {
      context.commit('storeForm941Line5AColumn2', {amount: parseFloat(payload)})
    },
    storeForm941Line5BColumn2: (context, payload) => {
      context.commit('storeForm941Line5BColumn2', {amount: parseFloat(payload)})
    },
    storeForm8974Line12: (context, payload) => {
      context.commit('storeForm8974Line12', {amount: parseFloat(payload)})
    },
    storeFormScheduleBTaxLiabilityMonthOne: (context, payload) => {
      context.commit('storeFormScheduleBTaxLiabilityMonthOne', {amount: parseFloat(payload)})
    },
    storeFormScheduleBTaxLiabilityMonthTwo: (context, payload) => {
      context.commit('storeFormScheduleBTaxLiabilityMonthTwo', {amount: parseFloat(payload)})
    },
    storeFormScheduleBTaxLiabilityMonthThree: (context, payload) => {
      context.commit('storeFormScheduleBTaxLiabilityMonthThree', {amount: parseFloat(payload)})
    },
    storeFormScheduleBTotalQuarterLiability: (context, payload) => {
      context.commit('storeFormScheduleBTotalQuarterLiability', {amount: parseFloat(payload)})
    },
    storeFormInitiatedMeta: (context, payload) => {
      context.commit('storeFormInitiatedMeta', payload) // { id: Number, fileColumn: 1 or 2 : Number }
    },
    storeNewPowerAttorneyOrWorkStatementObject: (context, payload) => {
      context.commit('storeNewPowerAttorneyOrWorkStatementObject', payload)
    },
    deletePowerAttorneyOrWorkStatementObject: async (context, payload) => {
      await axios.delete(`api/company/attorney-work/${payload}`);
      context.commit('deletePowerAttorneyOrWorkStatementObject', payload)
    },
    updateCompanyChecklistItem: (context, payload) => {
      context.commit('updateCompanyChecklistItem', payload)
    },
    onSubmitNewChecklistItem: async (context, payload) => {
      // Post new item
      // Pass on and insert into State @ top api/company/checklist
      const { data } = await axios.post('api/company/checklist', {...payload});
      context.commit('onSubmitNewChecklistItem', data);
    },
    onDeleteChecklistID: async (context, payload) => {
      await axios.delete(`api/company/checklist/${payload}`);
      context.commit('onDeleteChecklistID', payload);
    }

  }
})
