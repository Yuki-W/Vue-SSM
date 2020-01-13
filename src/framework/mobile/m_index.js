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
import {
  Picker,
  Popup
} from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);

import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios; //把axios挂载到Vue的原型上

Vue.config.productionTip = false


let shop = JSON.parse(localStorage.getItem('shops') || '[]')
let currentId = JSON.parse(localStorage.getItem('currentId') || null)
let currentCate = JSON.parse(localStorage.getItem('currentCate' || null))
// vuex配置
const store = new Vuex.Store({ //创建仓库
  state: {
    // storeInfo: [{
    //   logo: '',
    //   enviroment: ''
    // }]
    currentId: currentId, //设置唯一标识每个店铺的标识，这个标识代表手机号
    shops: shop, //将开店信息用一个数组存储起来
    // 店铺对象设计为：
    // {categories:经营品类,address:店铺地址,addrCode:门牌号,logo:门脸图,shopName:门店牌匾名称,enviroment:店内环境图,managName:联系人,telephone:联系人电话}
  },
  mutations: {
    // mutations对象中的方法只能接收两个参数，并且第一个参数是固定值。
    // 所以第二个参数 要想实现传递多值，需要使用对象
    handleId(state, id) {
      state.currentId = id;
      localStorage.setItem('currentId', JSON.stringify(state.currentId));
    },
    addToShop(state, shopLists) { //点击下一步，添加店铺信息
      let flag = false;
      state.shops.some(item => {
        if (item.telephone === shopLists.telephone) {
          console.log("vuex 填入的手机号一致");
          flag = true;
          return true;
        }
      })
      if (!flag) {
        state.shops.push(shopLists)
      }

      localStorage.setItem('shops', JSON.stringify(state.shops));
    },
    updateInfo(state, infoList) { //修改表单信息 格式{name:""}
      state.shops.some((item, i) => {
        if (item.telephone === state.currentId) {
          // state.shops[i].cateLists = JSON.parse(JSON.stringify(map))
          console.log(`修改的信息：${infoList}`);
          for (let key in infoList) {
            if (key === "cateLists") {
              Vue.set(state.shops[i], key, JSON.parse(JSON.stringify(infoList[key])))
            } else {
              Vue.set(state.shops[i], key, infoList[key])
            }
          }
        }
      })
      localStorage.setItem('shops', JSON.stringify(state.shops));
    }
  },
  getters: {
    getCurrTel: (state) => {
      return state.currentId
    },
    filterShop: (state) => () => { //筛选出shops数组里面telephone = 当前ID的一项
      return state.shops.find(item => item.telephone === state.currentId)
    },
  }
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store // 挂载vuex到VM实例上
})
