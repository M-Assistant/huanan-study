import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: () => import(/* webpackChunkName: "index" */ '../views/Start.vue'),
    meta: {
      title: '赶鸭网',
      keepAlive: true
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "index" */ '../views/Menu.vue'),
    meta: {
      title: '赶鸭网-目录',
      keepAlive: true
    }
  },
  {
    path: '/:education/:subject',
    name: 'Learn',
    component: () => import(/* webpackChunkName: "index" */ '../views/Learn.vue'),
    meta: {
      title: '-',
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 前置路由钩子
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})

export default router
