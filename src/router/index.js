import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Detail from '@/views/Detail/index.vue'
import Search from '@/views/Search/index.vue'
import CartList from '@/views/CartList/index.vue'
import Register from '@/views/Register/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
import Management from '@/views/Management/index.vue'
import ManageProducts from '@/views/Management/components/Products.vue'
import ManageHome from '@/views/Management/components/Home.vue'
import ManageOrders from '@/views/Management/components/Orders.vue'
import ManageMembers from '@/views/Management/components/Members.vue'


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
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/register',
      component:Register
    },
    {
      path: '/management',
      component:Management,
      children:[
        {
          path: '',
          component:ManageHome
        },
        {
          path: 'products/:category',
          component:ManageProducts
        },
        {
          path: 'orders/:state',
          component:ManageOrders
        },
        {
          path: 'members',
          component:ManageMembers
        }
      ]
    }
  ],
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
