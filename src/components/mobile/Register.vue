<!-- 商家注册/登录 -->
<template>
  <div class="login-home">
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <h1 class="mui-title">商家注册</h1>
    </user-defined-header>

    <div class="register-main">
      <!-- LOGO -->
      <div class="register-top">
        <img src="../../assets/images/person.jpg" class="logo" />
        <h1>商家版</h1>
      </div>
      <form action>
        <section class="form-item">
          <input
            type="tel"
            maxlength="11"
            placeholder="请输入手机号"
            v-model="number"
            @keyup="handleInput"
          />
          <div class="btn txt" :class="[isDisable?'disable':'']">获取验证码</div>
        </section>
        <section class="form-item">
          <input type="tel" maxlength="6" placeholder="验证码" />
        </section>
        <routerLink to="/applyShop" type="button" class="mui-btn mui-btn-primary">注册/登录</routerLink>
      </form>
      <div class="tips">未注册手机号将自动为您注册</div>
    </div>

    <!-- 底部 -->
    <div class="footer">©2008-2019 ele.me, All Rights Reserved.</div>
  </div>
</template>

<script>
import header from "../mobile/comment/Header";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    userDefinedHeader: header
  },
  data() {
    //这里存放数据
    return {
      number: "",
      isDisable: true
    };
  },
  methods: {
    handleInput() {
      //输入监听事件
      if (this.number.length === 11) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    }
  }
};
</script>
<style lang='' scoped>
.login-home {
  background-color: #fff;
}
.register-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 36px;
  margin-right: 36px;
  margin-top: 25%;
}
.register-top {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}
.register-top .logo {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  margin: 10px auto;
}
.register-top h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 10px 0 20px;
}
.form-item {
  position: relative;
  margin-bottom: 16px;
  height: 44px;
  font-size: 14px;
  background-color: #fff;
}
.form-item input {
  width: 100%;
  height: 100%;
  left: 0;
  padding-left: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #303133;
}
.form-item .btn.txt {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 44px;
  padding: 0 16px;
  color: #1989fa;
}
.form-item .btn.txt.disable {
  color: #c0c4cc;
}
.mui-btn.mui-btn-primary {
  width: 100%;
  background-color: #8bc4fc;
  margin-top: 10px;
  border: 0;
  border-radius: 5px;
  padding: 10px 0;
}
.tips {
  margin: 10px 0;
  font-size: 16px;
  color: #909399;
}
.footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* font-size: 12px; */
  color: #c0c4cc;
  padding: 20px 0;
}
</style>