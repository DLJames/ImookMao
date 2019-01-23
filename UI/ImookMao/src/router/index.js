import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  mode: 'history',
  routes: [
    {
      // path: '/good/:goodid/user/:name',//动态路由
      path: '/good',//for 嵌套路由
      name: 'GoodList',
      component: GoodList,
      children: [
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'image',
          name: 'image',
          component: Image
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
