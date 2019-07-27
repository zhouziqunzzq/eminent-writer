import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // home
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // duilian
    {
      path: '/duilian/home',
      name: 'duilian-home',
      component: () => import('./views/duilian/GenHome.vue')
    },
    {
      path: '/duilian/result',
      name: 'duilian-result',
      component: () => import('./views/duilian/GenResult.vue')
    },
    // poem
    {
      path: '/poem/home',
      name: 'poem-home',
      component: () => import('./views/poem/GenHome.vue')
    },
    {
      path: '/poem/result',
      name: 'poem-result',
      component: () => import('./views/poem/GenResult.vue')
    },
    // guwen
    {
      path: '/guwen/text',
      name: 'guwen-text',
      component: () => import('./views/guwen/GenText.vue')
    },
    {
      path: '/guwen/photo',
      name: 'guwen-photo',
      component: () => import('./views/guwen/GenPhoto.vue')
    },
    {
      path: '/guwen/result',
      name: 'guwen-result',
      component: () => import('./views/guwen/GenResult.vue')
    }
  ]
})
