import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/lk',
    name: 'account',
    meta: {
      auth: false,
      admOnly: false,
    },
    component: () => import("../views/Account.vue"),
  },
  {
    path: '/numbers',
    name: 'admin',
    meta: {
      auth: true,
      admOnly: true,
    },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: '/',
    name: 'login',
    meta: {
      auth: false,
      admOnly: false,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/continue',
    name: 'continue',
    meta: {
      auth: false,
      admOnly: false,
    },
    component: () => import("../views/Continue.vue"),
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      auth: false,
      admOnly: false,
    },
    component: () => import("../views/Error.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const req = to.matched.some(record => record.meta.auth);
  const admOnly = to.matched.some(record => record.meta.admOnly);

  let auth = false;
  let str = document.cookie;
  if (document.cookie) {
   
    if (str.indexOf("email") != -1) {
      auth = true;
    }
  }
  if (req && !auth) {
    next("/")
  } else if (admOnly && str.indexOf("stat=2") == -1) {
    next("/lk");
  } else {
    next()
  }

})


export default router