import Vue from 'vue'
import Router from 'vue-router'

import CreateProject from '@/views/CreateProject'
import HomePage from '@/views/Home'
import Project from '@/views/Project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: '/create',
          name: 'CreateProject',
          component: CreateProject,
        },
        {
          path: '/project/:projectID',
          name: 'Project',
          component: Project
        }
      ]
    }
  ]
})
