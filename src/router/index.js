import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Logout from '@/components/Logout'
import Project from '@/components/Project'

Vue.use(Router)

const router = new Router({
  scrollBehavior () {
    console.log(...arguments)
    return { x: 0, y: 0 }
  },
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'project',
      path: '/project/:projectId',
      component: Project
    },
    {
      name: 'logout',
      path: '/logout',
      component: Logout
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
