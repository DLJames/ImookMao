import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  getters: {

  },
  mutations: {
    setNickName (state, from) {
      state.nickName = from;
    },
    setCartCount (state, from) {
      state.cartCount += from;
    },
    initCartCount (state, from) {
      state.cartCount = from;
    }
  },
  actions: {

  }
})
