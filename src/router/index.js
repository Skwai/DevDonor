import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import About from '@/components/About'
import NotFound from '@/components/NotFound'
import Project from '@/components/Project'
import Profile from '@/components/Profile'
import Volunteer from '@/components/Volunteer'
import ProjectForm from '@/components/ProjectForm'
import UserProjects from '@/components/UserProjects'
import OrganizationForm from '@/components/OrganizationForm'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'createOrganization',
      path: '/organization/create',
      component: OrganizationForm
    },
    {
      name: 'organization',
      path: '/organization/:organizationId',
      component: OrganizationForm
    },
    {
      name: 'createProject',
      path: '/project/create',
      component: ProjectForm
    },
    {
      name: 'project',
      path: '/project/:projectId',
      component: Project
    },
    {
      name: 'volunteer',
      path: '/volunteer/:userId',
      component: Volunteer
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'userProjects',
      path: '/projects',
      component: UserProjects
    },
    {
      name: '404',
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
