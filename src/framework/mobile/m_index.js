// 移动端 入口文件
import Vue from 'vue'
import App from './App'
import router from '@/router/mobile/index'

// 导入MUI
import '../../lib/mui/css/mui.min.css'
import '../../lib/mui/js/mui.min.js'

// 初始化CSS样式
import '../../assets/style/init.css'

// 全局引入 vuex，所有组件都可以使用这个仓储
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需导入 mintUI
import { Picker,Popup } from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);

import axios from 'axios'
// axios.defaults.baseURL='http://localhost:8080/SSM_demo';//配置根路径
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;//把axios挂载到Vue的原型上

Vue.config.productionTip = false


// vuex配置
const store = new Vuex.Store({
  state:{ 
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
