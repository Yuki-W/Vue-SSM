<!-- 申请开店 -->
<template>
  <div class="apply-shop">
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <h1 class="mui-title">申请开店</h1>
      <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">开店帮助</a>
    </user-defined-header>

    <!-- 主要内容 -->
    <div class="main">
      <materials></materials>
    </div>

    <!-- 底部选项卡 tabbar -->
    <footer class="footer-tabbar">
      <div class="read-me">
        <input type="checkbox" v-model="checked" />
        我已阅读并同意
        <a>《平台线上开店说明》</a>
      </div>
      <routerLink to="/storeInfo" class="ready" :class="[checked?'show':'']" tag="button">我准备好了</routerLink>
    </footer>
  </div>
</template>

<script>
import header from "../mobile/comment/Header";
import materials from "../mobile/comment/Materials";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    userDefinedHeader: header,
    materials
  },
  data() {
    return {
      checked: false
    };
  }
};
</script>
<style lang='' scoped>
.main {
  margin-bottom: 80px;
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
.footer-tabbar .ready {
  width: 100%;
  font-size: 16px;
  background-color: #8bc4fc;
  border: 0;
  border-radius: 10px;
  color: #fff;
}
.read-me {
  margin-bottom: 10px;
}
.ready.show {
  background-color: #007aff;
}
</style>