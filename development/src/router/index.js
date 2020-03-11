import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Index.vue')
  },
  {
    path: '/recent',
    name: 'Recent',
    component: () => import(/* webpackChunkName: "recent" */ '../views/Recent.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "pricing" */ '../views/Pricing.vue')
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Register.vue'),
    children: [
      {
        path: ':step/:email/:hash',
        props: {test: true},
        component: () => import(/* webpackChunkName: "users" */ '../views/users/Register.vue')
      }
    ]
  },
  {
    path: '/user/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Logout.vue')
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Login.vue')
  },
  {
    path: '/gallery/:category/:id?',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "galleries" */ '../views/Gallery.vue'),
    meta: {
      title: ""
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
        // , offset: { x: 0, y: 10 }
      }
    }
    else if (savedPosition) return savedPosition;
    else return {x: 0, y: 0}
  }
})

export default router
