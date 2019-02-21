import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  mode: 'history',
  routes: [
    {
      // path: '/good/:goodid/user/:name',//动态路由
      path: '/',//for 嵌套路由
      name: 'GoodList',
      component: GoodList,
    }
  ]
})
