import Vue from 'vue'
import Router from 'vue-router'

import CreateProject from '../views/CreateProject.vue'
import HomePage from '../views/Home.vue'
import Project from '../views/Project.vue'

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
      name: 'Project',
      component: Project
    }
  ]
})
