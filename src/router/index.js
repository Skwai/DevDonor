import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Project from '@/components/Project'
import Profile from '@/components/Profile'
import Volunteer from '@/components/Volunteer'
import ProjectForm from '@/components/ProjectForm'
import OrganizationRegister from '@/components/OrganizationRegister'

Vue.use(Router)

const router = new Router({
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
      name: 'browse',
      path: '/browse',
      component: Home
    },
    {
      name: 'projectForm',
      path: '/project/:projectForm',
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
      name: 'register',
      path: '/orgnizations/create',
      component: OrganizationRegister
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
