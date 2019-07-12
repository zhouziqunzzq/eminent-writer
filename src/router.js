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
      path: '/duilian/text',
      name: 'duilian-text',
      component: () => import('./views/duilian/GenText.vue')
    },
    {
      path: '/duilian/photo',
      name: 'duilian-photo',
      component: () => import('./views/duilian/GenPhoto.vue')
    },
    {
      path: '/duilian/result',
      name: 'duilian-result',
      component: () => import('./views/duilian/GenResult.vue')
    },
    // poem
    {
      path: '/poem/text',
      name: 'poem-text',
      component: () => import('./views/poem/GenText.vue')
    },
    {
      path: '/poem/photo',
      name: 'poem-photo',
      component: () => import('./views/poem/GenPhoto.vue')
    },
    {
      path: '/poem/settings',
      name: 'poem-settings',
      component: () => import('./views/poem/GenSettings.vue')
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
