import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenInfo: getItem('tokenInfo') || {}
  },
  mutations: {
    mSetTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      setItem('tokenInfo', tokenObj)
    }
  },
  actions: {},
  modules: {}
})
