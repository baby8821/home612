import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login')
    },
    {
      path: "/home",
      name: "home",
      component: () => import('@/views/home'),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next()
        } else {
          next("/login")
        }
      }
    },
    {
      path: "/memory",
      name: "memory",
      component: () => import('@/views/memory'),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next()
        } else {
          next("/login")
        }
      }
    },
    {
      path: "/introduce",
      name: "introduce",
      component: () => import('@/views/introduce'),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next()
        } else {
          next("/login")
        }
      }
    },
    {
      path: "/story",
      name: "story",
      component: () => import('@/views/story'),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next()
        } else {
          next("/login")
        }
      }
    }, {
      path: "/area",
      name: "area",
      component: () => import('@/views/area'),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next()
        } else {
          next("/login")
        }
      }
    }
  ]
})

export default router