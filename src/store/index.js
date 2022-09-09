import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import menu from './menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    username: '',
    authority: ''
  },
  getters: {},
  mutations: {
    CollapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {
    user,
    menu
  }
})
