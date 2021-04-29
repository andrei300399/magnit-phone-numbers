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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = true; //проверить, есть ли этот пользователь
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser){
    next('/')
  } else {
    next()
  }
})

export default router