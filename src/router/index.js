/*
 * @Description: 路由配置
 * @Author: 李鸿智
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  //首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  //错误页面
  {
    path: '/error',
    name: 'Error',
    component: () => import('../components/Error.vue')
  },
  //个人信息
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  //全部商品
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/Goods.vue'),
  },
  //商品详情
  {
    path: '/goods/details',
    name: 'Details',
    component: () => import('../views/Details.vue')
  },
  //我上架的
  {
    path: '/sale',
    name: 'Sale',
    component: () => import('../views/Sale.vue')
  },
  //添加我上架的
  {
    path: '/sale/addSale',
    name: 'AddSale',
    component: () => import('../views/AddSale.vue')
  },
  //关于我们
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  //购物车
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  //收藏
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collect.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  //订单页面
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  //订单详情
  {
    path: '/order/orderDetails',
    name: 'OrderDetails',
    component: () => import('../views/OrderDetails.vue')
  },
  //结算页面
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  }
]

const router = new Router({
  // base: '/',
  // mode: 'history',
  routes
})

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
