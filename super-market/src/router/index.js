import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Layout from '@/views/layout/Index.vue'
import Home from '@/views/layout/Home.vue'
import Category from '@/views/layout/Category.vue'
import Cart from '@/views/layout/Cart.vue'
import User from '@/views/layout/User.vue'

const Login = () => import('@/views/login/Index.vue')
const Search = () => import('@/views/search/Index.vue')
const Pay = () => import('@/views/pay/Index.vue')
const ProductDetail = () => import('@/views/productDetail/Index.vue')
const SearchList = () => import('@/views/search/list.vue')
const Myorder = () => import('@/views/myorder/Index.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/searchlist', component: SearchList },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/cart', component: Cart },
      { path: '/user', component: User },
      { path: '/category', component: Category }
    ]
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: Myorder
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/myorder']

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
