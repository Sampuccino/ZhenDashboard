import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    intro: 'Welcome to Application Container',
    selectedMenu: 2,
    companies: [],
    company: {},
    companyRaD: [],
    companyForm: [],
    creditsAvailable: 0,
    creditsClaimed: 0,
    creditsReceived: 0,
  },
  getters: {
    returnIntro: state => {
        return state.intro;
    },
    returnSelectedMenu: state => {
      return state.selectedMenu;
    },
    returnTotalCompanyCreditsAvailable: state => {
      // credit_available:
      const creditsAvailableArr = [];
      const creditsArr = state.companyRaD.forEach( c => { creditsAvailableArr.push(parseFloat(c.credit_available)) });
      return creditsAvailableArr.reduce((a,b) => a+b,0) || 5;
    },
    returnTotalCompanyCreditsClaimed: state => {
      // credit_claimed:
      const creditsClaimedArr = [];
      const creditsArr = state.companyRaD.forEach( c => { creditsClaimedArr.push(parseFloat(c.credit_claimed)) });
      return creditsClaimedArr.reduce((a,b) => a+b,0) || 3;
    },
    returnTotalCompanyCreditsReceived: state => {
      // credit_received:
      const creditsReceivedArr = [];
      const creditsArr = state.companyRaD.forEach( c => { creditsReceivedArr.push(parseFloat(c.credit_received)) });
      return creditsReceivedArr.reduce((a,b) => a+b,0) || 1;
    },
    returnThreeChartDataPieces: () => {
      return [this.returnTotalCompanyCreditsAvailable, this.returnTotalCompanyCreditsClaimed, this.returnTotalCompanyCreditsReceived]
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
      /* Filtering done based on ein payload */
      state.company = state.companies.filter( c => {
        return c.ein === payload;
      });

      // Set company R&D
      state.companyRaD = state.company[0].research_and_development;

      console.warn('Mutation handleSelectedCompany ', state.company)

    }
  },
  actions: {
    setSelectedMenu: (context, payload) => {
      context.commit('setSelectedMenu', {selected: parseInt(payload)})
    },
    setCompaniesList: (context, payload) => {
      context.commit('setCompaniesList', payload);
    },
    handleSelectedCompany: (context, payload) => {
      context.commit('handleSelectedCompany', payload);
    }
  }
})
