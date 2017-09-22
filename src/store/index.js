import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    uid: localStorage.getItem(config.USER_ID_KEY) || null,
    registrationId: localStorage.getItem(config.REGISTRATION_ID_KEY) || null,
    auth: null,
    authenticating: false
  },
  strict: debug
})
