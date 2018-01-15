// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './app-components'

Vue.config.productionTip = false

/* tslint:disable-next-line */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
