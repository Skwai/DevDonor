// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueMoment from 'vue-moment'
import VueClip from 'vue-clip'

import App from '@/App'
import router from '@/router'
import store from '@/store'

import filters from '@/filters'
import '@/components'

Vue.use(VueFire)
Vue.use(VueMoment)
Vue.use(VueClip)
Vue.use(filters)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
