// https://github.com/utahta/vue-vuex-typescript-example/blob/master/src/store/modules/counter.ts
// https://github.com/Anonyfox/vuex-store-module-example

import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import State from './State'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Store({
  actions,
  getters,
  mutations,
  state: new State()
})
