import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenInfo: getItem('tokenInfo') || {},
    photo: ''
  },
  mutations: {
    mSetTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      setItem('tokenInfo', tokenObj)
    },
    mUpdateToken (state, newToken) {
      state.tokenInfo.token = newToken
      setItem('tokenInfo', state.tokenInfo)
    },
    mClearTokenInfo (state) {
      state.tokenInfo = {}
      setItem('tokenInfo', state.tokenInfo)
    },
    mSetPhoto (state, newPhotoUrl) {
      state.photo = newPhotoUrl
    }
  },
  actions: {},
  modules: {}
})
