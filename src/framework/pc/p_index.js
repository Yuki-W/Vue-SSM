// PC端 入口文件
import Vue from 'vue'
import App from './App'
import router from '../../router/pc/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
