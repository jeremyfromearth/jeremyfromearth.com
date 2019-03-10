import Vue from 'vue'
import Router from 'vue-router'
import Linx from './components/Linx'
import Main from './components/Main'
import Projects from './components/Projects'
import Work from './components/Work'
import Worx from './components/Worx'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/linx', 
      name: 'Linx', 
      component: Linx
    }, {
      path: '/',
      name: 'Main',
      component: Main,
    }, {
      path: '/projects', 
      name: 'Projects',
      component: Projects
    }, {
      path: '/worx',
      name: 'Worx', 
      component: Worx,
      children: [{
        path: ':id', 
        component: Work
      }]
    }, {
      path: '/worx/:slug', 
      name: 'Work',
      component: Worx
    }
  ],
});
