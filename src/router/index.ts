import Vue from 'vue'
import Router from 'vue-router'

import CreateProject from '../pages/CreateProject.vue'
import HomePage from '../pages/Home.vue'
import ViewProject from '../pages/ViewProject.vue'
import About from '../pages/About.vue'
import Volunteer from '../pages/Volunteer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: ViewProject,
      children: [
        {
          path: 'volunteer',
          name: 'Volunteer',
          component: Volunteer
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
