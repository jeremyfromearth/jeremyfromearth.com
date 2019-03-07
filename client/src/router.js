import Vue from 'vue'
import Router from 'vue-router'
import About from './components/About'
import Contact from './components/Contact'
import Linx from './components/Linx'
import Main from './components/Main'
import Projekte from './components/Projekte'
import Worx from './components/Worx'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/about',
      name: 'About', 
      component: About
    }, {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }, {
      path: '/linx', 
      name: 'Linx', 
      component: Linx
    }, {
      path: '/',
      name: 'Main',
      component: Main,
    }, {
      path: '/projekte', 
      name: 'Projekte',
      component: Projekte
    }, {
      path: '/worx',
      name: 'Worx', 
      component: Worx
    }
  ],
});
