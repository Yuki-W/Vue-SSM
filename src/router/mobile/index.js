import Vue from 'vue'
import Router from 'vue-router'
import Login from '../../components/mobile/Login'
import OpenShop from '../../components/mobile/OpenShop'
import ExamplePic from '../../components/mobile/ExamplePic'
import Register from '../../components/mobile/Register'
import ApplyShop from '../../components/mobile/ApplyShop'
import StoreInfo from '../../components/mobile/StoreInfo'
import Step1 from '../../components/mobile/Step1'
import Step2 from '../../components/mobile/Step2'
import Step3 from '../../components/mobile/Step3'
import Category from '../../components/mobile/Category'

Vue.use(Router)

// 解决 页面刷新后点击下一步按钮，报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

let router = new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path:'/login',name:'login',component:Login},
    {path:'/openShop',component:OpenShop},
    {path:'/examplePic',component:ExamplePic},
    {path:'/register',component:Register},
    {path:'/applyShop',component:ApplyShop},
    {path:'/storeInfo',component:StoreInfo,children:[
      {path:'/',name:'step0',component:Step1},
      {path:'/storeInfo/step1',name:'step1',component:Step2},
      {path:'/storeInfo/step2',name:'step2',component:Step3},
    ]},
    {path:'/category',component:Category}
    
  ]
})

router.beforeEach((to, from, next) => {
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = '/p_index.html#/'
    return
  }
  next()
})
export default router