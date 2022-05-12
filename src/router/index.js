import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Domů',
    component: Home
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  },
  {
    path: '/atomic',
    name: 'Atomic',
    component: () => import(/* webpackChunkName: "atomic" */ '../views/Atomic.vue')
  },
  {
    path: '/aether',
    name: 'Aether',
    component: () => import(/* webpackChunkName: "aether" */ '../views/Aether.vue')
  },
  {
    path: '/about',
    name: 'Informace',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Nastavení',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
