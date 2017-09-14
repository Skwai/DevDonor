import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state: {
    pitches: [
      {
        organizationLogo: 'https://c402277.ssl.cf1.rackcdn.com/photos/9031/images/original/WWF_25mm_no_tab.png',
        organizationName: 'World Wildlife Fund',
        organizationRegion: 'Worldwide',
        description: 'Web app to show pets up for adoption',
        createdAt: '2017-01-01'
      },
      {
        organizationLogo: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/04/oxfam-charity-logo-design-uk.png',
        organizationName: 'Oxfam',
        organizationRegion: 'Australia',
        description: 'Web app to show pets up for adoption',
        createdAt: '2017-01-01'
      },
      {
        organizationLogo: 'https://www.spellbrand.com/images/blog/images/united-nations-childrens-fund-logo-design-trend.jpg',
        organizationName: 'UNICEF',
        organizationRegion: 'Australia',
        description: 'Web app to show pets up for adoption',
        createdAt: '2017-01-01'
      }
    ]
  },
  strict: debug
})
