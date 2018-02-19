import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './app-components'

Vue.config.productionTip = false

// tslint:disable-next-line
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
