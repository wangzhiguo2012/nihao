import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import LayoutIndex from '@/views/layout' // /index.vue是可以省略的
import HomeIndex from '@/views/home'
import VideoIndex from '@/views/video'
import store from '@/store/index.js'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: Login
},
{
  path: '/',
  component: LayoutIndex,
  // 嵌套路由
  // 当访问http://localhost:8080/#/user 时
  //   把UserIndex组件放在 LayoutIndex组中的router-view中去
  children: [{
    path: '',
    component: HomeIndex
  },
  {
    path: '/user',
    component: () => import('@/views/user/index')
  },
  {
    path: '/video',
    component: VideoIndex
  }
  ]
},
{
  path: '/search',
  component: () => import('@/views/search/index')
},
{
  path: '/search',
  name: 'search',
  component: () => import('../views/search/index.vue')
},
{
  path: '/search/result',
  name: 'searchResult',
  component: () => import('../views/search/result.vue')
},
{
  path: '/article/:id',
  component: () => import('@/views/article/index')
},
{
  path: '/user/profile',
  name: 'userProfile',
  component: () => import('@/views/user/profile.vue')

},
{
  path: '/user/chat',
  component: () => import('@/views/user/chat')
}

]
const router = new VueRouter({
  routes
})
router.beforeEach(function (to, form, next) {
  if (to.path.startsWith('/user')) {
    if (store.state.tokenInfo.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          backto: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
