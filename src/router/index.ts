import Vue from 'vue'
import Router from 'vue-router'

import CreateProject from '../pages/CreateProject.vue'
import HomePage from '../pages/Home.vue'
import ViewProject from '../pages/ViewProject.vue'
import About from '../pages/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/create',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/project/:projectID',
      name: 'ViewProject',
      component: ViewProject
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
