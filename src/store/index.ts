// https://github.com/utahta/vue-vuex-typescript-example/blob/master/src/store/modules/counter.ts
// https://github.com/Anonyfox/vuex-store-module-example

import Vuex, { ActionTree, Module, Store } from 'vuex'
import Vue from 'vue'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import State from './state'

Vue.use(Vuex)

export default new Store({
  actions,
  getters,
  mutations,
  state: new State()
})
