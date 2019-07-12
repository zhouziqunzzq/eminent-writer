import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
