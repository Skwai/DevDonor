import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import config from '@/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    auth: localStorage.getItem(config.AUTH_STORAGE_KEY) || null
  },
  strict: debug
})
