import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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

// 解决重复点击路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
