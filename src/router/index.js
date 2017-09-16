import Vue from 'vue'
import Router from 'vue-router'
import Pitches from '@/components/Pitches'
import Pitch from '@/components/Pitch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'pitches',
      path: '/',
      component: Pitches
    },
    {
      name: 'pitch',
      path: '/pitch/:pitchId',
      component: Pitch
    }
  ]
})
