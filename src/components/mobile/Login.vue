<!-- 登录页面 -->
<template>
  <div>
    <!-- 引入公共的 Header组件 -->
    <user-defined-header>
      <h1 class="mui-title">登录</h1>
      <routerLink
        to="/openShop"
        class="mui-btn mui-btn-blue mui-btn-link mui-pull-right"
        slot="header-right"
      >我要开店</routerLink>
    </user-defined-header>

    <!-- 主体 内容区域 -->
    <div class="mui-content">
      <div style="padding: 10px 10px;">
        <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item mui-active" href="#item1">账号密码登录</a>
          <a class="mui-control-item" href="#item2">手机验证登录</a>
        </div>
      </div>
      <div>
        <div id="item1" class="mui-control-content mui-active">
          <comm-login>
            <span class="mui-icon mui-icon-person" slot="icons"></span>
            <input type="text" class="mui-input-clear" placeholder="请输入账号" slot="input-normal" />
            <span class="mui-icon mui-icon-locked" slot="icons2"></span>
            <input
              type="password"
              class="mui-input-password"
              placeholder="请输入密码"
              v-model="password"
              @input="handleInput"
              slot="input-special"
            />
            <span
              class="mui-icon mui-icon-clear clears"
              v-show="show"
              @click="btnClear"
              slot="btn-clear"
            ></span>
            <button type="button" class="btn-login mui-btn" slot="btn-login">登录</button>
          </comm-login>

          <a href="#popover" class="question">登录遇到问题？</a>
        </div>
        <div id="item2" class="mui-control-content">
          <comm-login>
            <span class="mui-icon mui-icon-person" slot="icons"></span>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="password"
              @input="handleInput"
              slot="input-normal"
            />
            <span
              class="mui-icon mui-icon-clear clears"
              v-show="show"
              @click="btnClear"
              slot="btn-clear1"
            ></span>
            <a slot="btn-operate" class="btn-operate">获取验证码</a>
            <span class="mui-icon mui-icon-locked" slot="icons2"></span>
            <input type="text" class="mui-input-clear" placeholder="请输入验证码" slot="input-special" />
            <button type="button" class="btn-login mui-btn" slot="btn-login">登录</button>
          </comm-login>
        </div>
      </div>

      <!-- 弹出菜单框 -->
      <div id="popover" class="mui-popover">
        <div class="animated popover-operate">
          <div class="popover-forget">
            <button type="button">忘记密码</button>
            <button type="button">忘记账号和密码</button>
          </div>
          <div class="popover-cancel">
            <button type="button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../mobile/comment/Header";
import commLogin from "../mobile/comment/CommLogin";
export default {
  name: "login",
  components: {
    userDefinedHeader: header,
    commLogin
  },
  data() {
    //这里存放数据
    return {
      show: false,
      password: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleInput() {
      //处理密码框输入
      if (this.password !== "") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    btnClear() {
      //点击删除按钮，清空所有内容
      this.password = "";
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
.mui-control-item {
  /* 解决点击选项卡报错问题 */
  touch-action: none;
}
#item2 .clears {
  right: 70px;
}
#item2 input {
  width: 60%;
}

.question {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: black;
  font-size: 12px;
}

/* 弹出菜单框 */
#popover {
  bottom: 5%;
  top: auto !important;
  background-color: #fff0;
  width: 98%;
  margin: 0 1%;
  left: auto !important;
}
#popover > .mui-popover-arrow,
#popover > .mui-popover-arrow.mui-bottom {
  display: none !important;
}
#popover .popover-operate {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.popover-operate button {
  width: 100%;
  border: 0;
  border-radius: 0;
  padding: 15px 0;
  background-color: #fff;
  color: #007aff;
}
.popover-operate .popover-forget {
  margin-bottom: 20px;
}
.popover-operate .popover-forget > button:first-child {
  border-bottom: 1px solid black;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.popover-operate .popover-forget > button:last-child {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.popover-operate .popover-cancel > button {
  border-radius: 10px;
}
</style>