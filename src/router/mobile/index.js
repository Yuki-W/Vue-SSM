import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决 页面刷新后点击下一步按钮，报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../../components/mobile/Login")
    },
    {
      path: '/openShop',
      component: () => import("../../components/mobile/OpenShop")
    },
    {
      path: '/examplePic',
      component: () => import("../../components/mobile/ExamplePic")
    },
    {
      path: '/register',
      component: () => import("../../components/mobile/Register")
    },
    {
      path: '/applyShop',
      component: () => import("../../components/mobile/ApplyShop")
    },
    {
      path: '/storeInfo',
      component: () => import("../../components/mobile/StoreInfo"),
      // children: [{
      //     path: '/',
      //     name: 'step0',
      //     component: () => import("../../components/mobile/Step1")
      //   },
      //   {
      //     path: '/storeInfo/step1',
      //     name: 'step1',
      //     component: () => import("../../components/mobile/Step2")
      //   },
      //   {
      //     path: '/storeInfo/step2',
      //     name: 'step2',
      //     component: () => import("../../components/mobile/Step3")
      //   },
      // ]
    },
    {
      path:'/storeInfo2',
      name:'step2',
      component:()=>import("../../components/mobile/StoreInfo2")
    },
    {
      path: '/category',
      component: () => import("../../components/mobile/Category")
    }

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
