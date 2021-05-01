import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/lk',
    name: 'account',
    meta: {auth: true},
    component: () => import("../views/Account.vue"),
  },
  {
    path: '/numbers',
    name: 'admin',
    meta: {auth: true},
    component: () => import("../views/Admin.vue"),
  },
  {
    path: '/',
    name: 'login',
    // meta: {auth: false},
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/continue',
    name: 'continue',
    component: () => import("../views/Continue.vue"),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import("../views/Error.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

