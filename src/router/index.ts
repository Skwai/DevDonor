import Vue from 'vue'
import Router from 'vue-router'

import CreateProject from '../pages/CreateProject.vue'
import HomePage from '../pages/Home.vue'
import ViewProject from '../pages/ViewProject.vue'
import About from '../pages/About.vue'
import Volunteer from '../pages/Volunteer.vue'
import EditProject from '../pages/EditProject.vue'
import DeleteProject from '../pages/DeleteProject.vue'

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
      path: '/project/:projectId',
      name: 'ViewProject',
      component: ViewProject,
      children: [
        {
          path: 'delete',
          name: 'DeleteProject',
          component: DeleteProject
        },
        {
          path: 'volunteer',
          name: 'Volunteer',
          component: Volunteer
        },
        {
          path: 'edit',
          name: 'EditProject',
          component: EditProject
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
