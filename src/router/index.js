import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from "nprogress"; // 引入进度条动画
import 'nprogress/nprogress.css';  // 引入进度条样式

// 进度条动画配置
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false // 是否显示加载ico
});

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  redirect: '/home',
  component: () => import('../views/Main.vue'),
  children: [
      {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    },
    {
      path: '/mall',
      name: 'mall',
      component: () => import('../views/mall')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User')
    },
    {
      path: '/page1',
      name: 'page1',
      component: () => import('../views/other/PageOne.vue')
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('../views/other/PageTwo.vue')
    }
  ]
},
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next)=>{
  // 加载进度条动画
  NProgress.start();
  store.commit('getToken')
  const token = store.state.user.token
  // token不存在 并且 当前页不等于登录页
  if(!token && to.name !== 'login'){
    next({ path:'/login'})
  //  token存在且访问登录页
  } else if (token && to.name == 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

router.afterEach(()=>{
  // 关闭进度条动画
  NProgress.done();
})

// 解决重复点击路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
