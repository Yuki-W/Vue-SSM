<!-- 开店详情介绍 -->
<template>
  <div>
    <!-- 公共的 Header区域 -->
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <span class="header-close" slot="header-close">关闭</span>
      <h1 class="mui-title">开店申请</h1>
      <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" slot="header-right">开店帮助</a>
    </user-defined-header>

    <div class="main">
      <!-- 我要开店 -->
      <div class="shop">
        <div class="shop-title">
          <h1>开店/入驻·一站式在线管理</h1>
          <h2>轻松实现销量用户双增长</h2>
        </div>
        <ul class="shop-crad">
          <li>
            <p>
              <strong>24</strong>小时
            </p>
            <p>极速开店</p>
          </li>
          <li>
            <p>
              <strong>340</strong>万
            </p>
            <p>优质商家</p>
          </li>
          <li>
            <p>
              <strong>2000</strong>城市
            </p>
            <p>全国覆盖</p>
          </li>
          <li>
            <p>
              <strong>2.6</strong>亿
            </p>
            <p>累计用户</p>
          </li>
        </ul>
        <div class="open-shop-btn">
          <routerLink to="/register" type="button" class="mui-btn mui-btn-primary" tag="button">我要开店</routerLink>
        </div>
      </div>
      <!-- 开店流程 -->
      <div class="step">
        <h1>开店流程</h1>
        <ul>
          <li>
            <img src="../../assets/images/steps1.png" alt />
            <span>提交申请</span>
          </li>
          <li>
            <img src="../../assets/images/steps2.png" alt />
            <span>审核签约</span>
          </li>
          <li>
            <img src="../../assets/images/steps3.png" alt />
            <span>录入菜单</span>
          </li>
          <li>
            <img src="../../assets/images/steps4.png" alt />
            <span>门店上线</span>
          </li>
        </ul>
      </div>
      <!-- 常见问题 -->
      <div class="common-question">
        <h1>常见问题</h1>
        <ul>
          <li>
            <span class="question-title">1.平台上开店是如何收费的？</span>
            <span class="main-content">在平台上开店本身不收取任何费用。您可通过【开店申请】页面点击【我要开店】按钮，根据开店流程，待审核通过后完成线上开店即可。</span>
            <span class="other-content">需收费项目：团购、代金券、广告、新店营销等营销业务，每个地区的费用会根据不同地区经济发展情况有所不同。</span>
            <span class="other-content">如您已提交开店申请，请您耐心等待审核。</span>
          </li>
          <li>
            <span class="question-title">2.申请开店需要哪些材料？</span>
            <span class="main-content">门脸照片、店内照片、门店logo、身份证照片、营业执照、餐饮服务许可证（或其他食品流通许可证等有效证件）。</span>
            <routerLink to="/examplePic" class="btn-txt" tag="span">查看图片示例</routerLink>
          </li>
          <li>
            <span class="question-title">3.开店审核需要多久？</span>
            <span class="main-content">提交申请后，1~3个工作日内将会有市场经理线下审核店铺信息，如超时未处理，您可直接联系市场经理。</span>
          </li>
          <li>
            <span class="question-title">4.提交申请后，如何查询审核结果？</span>
            <span class="main-content">您可通过该平台 查看当前审核状态。</span>
          </li>
          <li>
            <span class="question-title">5.店铺之前无效了，可以重新上线吗？</span>
            <span class="main-content">可以，实体店双证齐全可直接点击【我要开店】按钮申请开店。</span>
          </li>
          <li>
            <span class="question-title">6.无实体店或单证可以上线吗？</span>
            <span class="main-content">不可以，网上开店必须有线下实体门店，并且需要准备好营业执照与餐饮服务许可证（或其他类许可证等)。</span>
          </li>
        </ul>
      </div>
      <!-- 已入驻 -->
      <div class="hosted">
        <h1>他们已入驻，你呢？</h1>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../mobile/common/Header";
export default {
  data() {
    return {};
  },
  components: {
    userDefinedHeader: header
  }
};
</script>

<style lang="" scoped>
.step,.common-question,.hosted {
  height: 100%;
  padding: 20px;
}
.step h1,.common-question h1,.hosted h1 {
  text-align: center;
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
}

/* 我要开店 */
.shop {
  height: 100%;
  background-color: black;
}
.shop-title {
  padding: 20px 0 20px;
  margin-bottom: 20px;
}
.shop h1,
.shop h2 {
  text-align: center;
  padding: 5px 0;
  color: white;
}
.shop h1 {
  font-size: 16px;
}
.shop h2 {
  font-size: 14px;
}
.shop-crad {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 40px;
}
.shop-crad li {
  width: 120px;
  box-sizing: border-box;
  margin-bottom: 25px;
}
.shop-crad li:nth-child(2n) {
  margin-left: 40px;
}
.shop-crad li > p:first-child {
  color: yellow;
  font-size: 14px;
}
.shop-crad li strong {
  font-size: 34px;
  letter-spacing: 0;
  font-family: Fjalla One;
  margin-right: 5px;
}
.shop-crad li > p:last-child {
  font-size: 10px;
  color: aliceblue;
}
.open-shop-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0 30px;
}
.open-shop-btn button {
  font-size: 16px;
}
/* 开店流程 */

.step ul {
  display: flex;
  justify-content: space-around;
  align-self: stretch;
}
.step ul > li {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
}
.step li > img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
.step li > span {
  font-size: 14px;
}

/* 常见问题 */
.common-question {
  /* height: 100px; */
  background-color: #fff;
}
.common-question ul>li{
  width: 100%;
  margin: 10px 0 20px;
  display: flex;
  flex-direction: column;
}
.common-question .question-title{
  font-size: 16px;
  color: #000;
}
.common-question .main-content,.common-question li .btn-txt{
  margin-top: 8px;
  margin-left: 15px;
}
.common-question .other-content{
  margin-left: 15px;
}
.common-question li .btn-txt{
  color: #1989fa;
  cursor: pointer;
}

/* 已入驻 */
.hosted {
  height: 100%;
  background-color: #eff4f7;
}
.hosted>h1{
  margin-bottom: 32px;
}
.hosted ul{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.hosted ul>li{
  width: 45px;
  height: 45px;
  background-color: blueviolet
}
</style>