// https://github.com/utahta/vue-vuex-typescript-example/blob/master/src/store/modules/counter.ts
// https://github.com/Anonyfox/vuex-store-module-example

import Vuex, { ActionTree, Module, Store } from 'vuex'
import Vue from 'vue'

import State from './state'
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
