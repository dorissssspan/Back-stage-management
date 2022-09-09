import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/mock'
// 引入less样式重置
import './style/reset.less'


// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
