import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main'
import Projects from '@/views/Projects'

Vue.use(Router)

const router = new Router({
  routes: [{
    component: Main,
    name: 'main',
    path: '/',
    children: [{
      component: Projects,
      name: 'projects',
      path: '/projects/:id',
      props: route => {
        return {
          project_id: route.params.id
        }
      }
    }]
  }, {
    name: 'external',
    component: Main,
    path: '/'
  }]
})

router.beforeEach((to, from, next) => {
  if(to.name === 'external') {
    if(to.params.url) {
      window.open(to.params.url, '_blank').focus()
    }
    return false
  }

  next()
})

export default router
