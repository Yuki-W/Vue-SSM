<!-- 门店信息1 -->
<template>
  <div class="store-info-step1">
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <h1 class="mui-title" v-cloak>门店信息（{{index}}/3）</h1>
      <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">开店帮助</a>
    </user-defined-header>

    <!-- 主要内容 -->
    <router-view
      @stepList1="getInfo1"
      :cateTips="isCate"
      :nameTips="isName"
      :phoneTips="isPhone"
      :shopNameTips="isPic"
      :logoTips="isLogo"
      :addrTips="isAddr"
      :envTips="isEnviroment"
    ></router-view>

    <!-- 底部选项卡 tabbar -->
    <footer class="footer-tabbar">
      <div class="btn-tabbar">
        <button class="save" v-if="isShow">保存草稿</button>
        <button class="prev" v-if="!isShow" @click="previous" :class="[isDisable?'show':'']">上一步</button>
        <button class="next" @click="next" :class="[isDisable?'disable':'']">下一步</button>
      </div>
    </footer>
  </div>
</template>

<script>
import header from "../mobile/comment/Header";
export default {
  components: {
    userDefinedHeader: header
  },
  data() {
    //这里存放数据
    return {
      isShow: true,
      isDisable: false, //控制【下一步】按钮是否隐藏
      index: 1, //标题栏内容，表示当前是第几步操作
      isCate: false,
      isName: false,
      isPhone: false,
      isPic: false, //
      isLogo: false,
      isEnviroment: false,
      isAddr: false,
      list: {}
    };
  },
  methods: {
    getInfo1(e) {
      if(e === undefined){
        this.isCate=this.isAddr=this.isLogo=this.isPic=this.isEnviroment=this.isPhone=true
      }else{
      let mainCate = e.mainCate;
      let address = e.address;
      let logo = e.logo;
      let shopName = e.shopName;
      let enviroment = e.enviroment;
      let managName = e.managName;
      let phone = e.phone;
      this.isCate = mainCate === '请选择经营品类' ? true : false;
      this.isAddr = address === '标记店铺地址' ? true : false;
      this.isLogo = logo === '' ? true : false;
      this.isPic = shopName === '' ? true : false;
      this.isEnviroment = enviroment === '' ? true : false;
      this.isName = managName === '' ? true : false;
      this.isPhone = phone === '' ? true : false;
      }

    },
    check1() {
      // console.log(this.list);
    },
    // 【下一步】按钮
    next() {
      // console.log(this.list);
      this.getInfo1();

      // if (this.index < 2) {
      //   this.index++;
      //   this.msg = "上一步";
      //   this.isShow = false;
      // } else {
      //   this.index = 3;
      //   this.isDisable = !this.isDisable;
      // }
      // this.$router.push({ name: "step" + this.index });

      // let cateList = JSON.parse(sessionStorage.getItem("cateList"));
    },
    //【上一步】按钮
    previous() {
      this.index--;
      this.$router.push({ name: "step" + this.index });
      if (this.index === 2) {
        this.isDisable = !this.isDisable;
      } else if (this.index === 1) {
        this.isShow = !this.isShow;
        this.index = 1;
      }
    }
  }
};
</script>
<style lang='' scoped>
.store-info-step1 {
  margin-bottom: 55px;
  overflow: hidden;
}
.footer-tabbar {
  width: 100%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  padding: 10px 20px;
  background-color: #f7f7f7;
  box-shadow: 3px -2px 6px #ccc;
}
.btn-tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-tabbar button {
  width: 48%;
  border-radius: 20px;
}
.btn-tabbar .next,
.btn-tabbar .prev {
  background-color: #007aff;
  color: #fff;
}
.btn-tabbar .next.disable {
  display: none;
}
.btn-tabbar .prev.show {
  width: 100%;
}
</style>