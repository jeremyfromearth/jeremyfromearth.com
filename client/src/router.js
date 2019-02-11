import Vue from 'vue'
import Router from 'vue-router'
import About from './components/About'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Main from './components/Main'
import Projekte from './components/Projekte'
import Work from './components/Work'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/about',
      name: 'About', 
      component: About
    }, {
      path: '/blog',
      name: 'Blog',
      component: Blog,
      children: [{
        path: ':slug',
        name: 'Post',
        component: Blog
      }]
    }, {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }, {
      path: '/',
      name: 'Main',
      component: Main,
    }, {
      path: '/projekte', 
      name: 'Projekte',
      component: Projekte
    }, {
      path: '/work',
      name: 'Work', 
      component: Work
    }
  ],
});
