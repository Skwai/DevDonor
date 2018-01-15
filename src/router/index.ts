import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home.vue'
import CreateProjectPage from '@/pages/CreateProject.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: '-active',
  linkExactActiveClass: '-exact',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: '/create',
          name: 'CreateProject',
          component: CreateProjectPage
        }
      ]
    }
  ]
})
