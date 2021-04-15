import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/account',
    name: 'account',
    component: () => import("../views/Account.vue"),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("../views/Admin.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router