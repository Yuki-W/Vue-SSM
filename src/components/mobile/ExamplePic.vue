<!-- 开店申请材料图片示例 -->
<template>
  <div>
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <span class="header-close" slot="header-close">关闭</span>
      <h1 class="mui-title">开店申请</h1>
      <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" slot="header-right">开店帮助</a>
    </user-defined-header>

    <materials></materials>
  </div>
</template>

<script>
// 引入自定义组件
import header from "../mobile/comment/Header";
import materials from '../mobile/comment/Materials'
export default {
  data() {
    return {};
  },
  components: {
    userDefinedHeader: header,
    materials
  }
};
</script>

<style lang="" scoped>

/* .pic-main h1 {
  text-align: center;
  font-size: 18px;
  padding: 20px 0 16px;
  background-color: #fff;
}
.mui-table-view .mui-media-object {
  width: 120px;
  height: 90px;
  max-width: 120px;
}
.mui-table-view .mui-media,
.mui-table-view .mui-media-body,
.mui-ellipsis {
  overflow: auto;
}
.mui-ellipsis {
  font-size: 12px;
  line-height: 20px;
  white-space: normal;
} */
</style>