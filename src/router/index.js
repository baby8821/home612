import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import('@/views/mypage')
    },
    {
      path: "/memory",
      name: "memory",
      component: () => import('@/views/memory'),
    },
    {
      path: "/introduce",
      name: "introduce",
      component: () => import('@/views/introduce'),
    },
    {
      path: "/article",
      name: "article",
      component: () => import('@/views/article'),
    }, {
      path: "/area",
      name: "area",
      component: () => import('@/views/area'),
    }
  ]
})

export default router