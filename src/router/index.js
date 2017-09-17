import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'projects',
      path: '/',
      component: Projects
    },
    {
      name: 'project',
      path: '/project/:projectId',
      component: Project
    }
  ]
})
