<!-- 登录模块 -->
<template>
  <div class>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label for>
          <!-- 图标 -->
          <slot name="icons"></slot>
        </label>
        <!-- 输入框 -->
        <slot name="input-normal"></slot>
        <!-- 清除按钮 -->
        <slot name="btn-clear1"></slot>
        <!-- 其它操作按钮 -->
        <slot name="btn-operate"></slot>
      </div>

      <div class="mui-input-row">
        <label for>
          <!-- 图标 -->
          <slot name="icons2"></slot>
        </label>
        <!-- 输入框 -->
        <slot name="input-special"></slot>
        <slot name="btn-clear"></slot>
      </div>
      <!-- 登录按钮 -->
      <slot name="btn-login"></slot>
    </form>
  </div>
</template>

<script>
export default {};
</script>
<style lang='' scoped>
.mui-input-group {
  margin: 0 10px;
  background-color: #fff0;
}
.mui-input-row label {
  width: 20%;
}
.mui-input-row input {
  float: none;
}
.clears {
  font-size: 20px;
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 30px;
  width: 38px;
  height: 38px;
  text-align: center;
  color: #999;
}
.btn-login {
  width: 100%;
  margin-top: 10px;
  background-color: #d1d1d9;
  color: #fff;
  padding-top: 8px;
  padding-bottom: 8px;
}

.btn-operate {
  display: inline-block;
  width: 20%;
  font-size: 12px;
  color: #d1d1d9;
  background-color: #9e9e9e;
  text-align: center;
  line-height: 30px;
  height: 30px;
  margin: 5px 0;
  border-radius: 5px;
  position: absolute;
  right: 0;
}
</style>