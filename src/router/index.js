import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Detail from '@/views/Detail/index.vue'
import Search from '@/views/Search/index.vue'
import CartList from '@/views/CartList/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:Layout,
      children:[
        {
          path: '',
          component:Home,
        },
        {
          path: 'search/:search',
          component:Search,
          //props: true
        },
        {
          path: 'category/:category',
          component:Category,
        },
        {
          path: 'detail/:productId',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        }
      ]
    },
    {
      path: '/login',
      component:Login
    }
  ],
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
