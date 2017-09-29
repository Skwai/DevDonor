import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'
import actions from './actions/'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    projects: {},
    countries: {},
    skills: {},
    users: {},
    organizations: {},

    uid: localStorage.getItem(config.USER_ID_KEY) || null,
    auth: null,
    authenticating: false,
    notification: null
  },
  strict: debug
})
