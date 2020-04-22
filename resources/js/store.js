import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    intro: 'Welcome to Application Container',
    selectedMenu: 2
  },
  getters: {
    returnIntro: state => {
        return state.intro;
    },
    returnSelectedMenu: state => {
      return state.selectedMenu;
    }
  },
  mutations: {
    setSelectedMenu:  (state, payload) => {
      state.selectedMenu = payload.selected;
    }
  },
  actions: {
    setSelectedMenu: (context, payload) => {
      context.commit('setSelectedMenu', {selected: parseInt(payload)})
    }
    // async queueCsvTemplateFiles(context) {
    //   let result = await axios.get('/files');
    //   context.commit("queueCsvTemplateFiles", result.data);
    // }
  }
})
