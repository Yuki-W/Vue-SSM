<!-- 门店信息1 -->
<template>
  <div class="store-info-step1">
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <h1 class="mui-title" v-cloak>门店信息（1/3）</h1>
      <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">开店帮助</a>
    </user-defined-header>

    <!-- 主要内容 -->
    <div class>
      <!-- 经营品类 -->
      <div class="list">
        <div class="list-item">
          <span class="title">经营品类</span>
          <routerLink to="/category" class="right-item" tag="div">
            <div class="item-content">
              {{mainCate}}
              <br />
              {{minorCate}}
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
            <div class="hide" :class="{'tips':cateTips}">请选择您的经营品类</div>
          </routerLink>
        </div>
      </div>
      <div class="list">
        <!-- 店铺地址 -->
        <div class="list-item">
          <span class="title">店铺地址</span>
          <div class="right-item">
            <div class="item-content" @click.prevent="getAddrPick">
              {{address}}
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
            <div class="hide" :class="{'tips':addrTips}">请标记店铺地址</div>
          </div>
        </div>

        <!-- 城市三级联动 -->
        <picker :result="popupVisible" @getRegion="getAddr"></picker>

        <!-- 门牌号 -->
        <div class="list-item border">
          <p class="title">
            门牌号
            <br />
            <span>(非必填)</span>
          </p>
          <div class="right-item">
            <input
              type="text"
              placeholder="详细地址 例：5号楼101室"
              v-model="addrCode"
              @blur="handleCommit(1)"
            />
          </div>
        </div>
      </div>

      <div class="list">
        <!-- 门脸图 -->
        <div class="list-item">
          <span class="title">门脸图</span>
          <div class="right-item">
            <div class="item-content">
              <div>
                <span>
                  需拍出完整门匾、门框
                  <a class="example" @click="showPopup(0)">示例图</a>
                </span>

                <div
                  class="upload"
                  @click="showPopup(0,true)"
                  :class="[logo === undefined? '':'hideStyle']"
                >
                  <img :src="logo" alt :class="[logo===undefined?'hideimg':'']" />
                </div>
              </div>
              <!-- 弹窗功能 -->
              <pop-pic :popup="isPopup" :filePopup="isShowUpload" @close="closePopup" :item="index"></pop-pic>
            </div>
            <div class="hide" :class="{'upload-pic-tips':logoTips}">请上传门脸图</div>
          </div>
        </div>
        <!-- 门店牌匾名称 -->
        <div class="list-item border item-input">
          <span class="title input-title">门店牌匾名称</span>
          <div class="right-item">
            <input
              type="text"
              placeholder="需与门脸图牌匾一致"
              v-model="shopName"
              @input="reqCheck(4)"
              @blur="handleCommit(2)"
            />
            <div class="hide" :class="{'input-tips':shopNameTips}">当前项不能为空</div>
          </div>
        </div>
      </div>

      <!-- 店内环境图 -->
      <div class="list">
        <div class="list-item">
          <span class="title">店内环境图</span>
          <div class="right-item">
            <div class="item-content">
              <div>
                <span>
                  需真实反映用餐环境
                  <a class="example" @click="showPopup(1)">示例图</a>
                </span>

                <div
                  class="upload"
                  @click="showPopup(1,true)"
                  :class="[enviroment === undefined? '':'hideStyle']"
                >
                  <img :src="enviroment" alt :class="[enviroment===undefined?'hideimg':'']" />
                </div>
              </div>
              <pop-pic :popup="isPopup" :filePopup="isShowUpload" @close="closePopup" :item="index"></pop-pic>
            </div>
            <div class="hide" :class="{'upload-pic-tips':envTips}">请上传店内环境图</div>
          </div>
        </div>
      </div>

      <!-- 联系人 -->
      <div class="list">
        <div class="list-item item-input">
          <span class="title input-title">联系人</span>
          <div class="right-item">
            <input
              type="text"
              placeholder="请填写门店经营者姓名"
              v-model="managName"
              @input="reqCheck(6)"
              @blur="handleCommit(3)"
            />
            <div class="hide" :class="{'input-tips':nameTips}">{{msg}}</div>
          </div>
        </div>
        <!-- 联系电话 -->
        <div class="list-item border item-input">
          <span class="title input-title">联系电话</span>
          <div class="right-item">
            <!-- 将来谁用手机号注册，该手机号默认自动填入下面的输入框 -->
            <input type="tel" :placeholder="telephone" disabled />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部选项卡 tabbar -->
    <footer class="footer-tabbar">
      <div class="btn-tabbar">
        <button class="save">保存草稿</button>
        <!-- <button class="prev" v-show="!isShow" @click="previous" :class="[isDisable?'show':'']">上一步</button> -->
        <button class="next" @click="next">下一步</button>
      </div>
    </footer>
  </div>
</template>

<script>
import header from "../mobile/common/Header";
import picker from "../../components/mobile/common/AddrPicker";
import popPic from "../mobile/common/UploadPic";
export default {
  components: {
    userDefinedHeader: header,
    picker,
    popPic
  },
  data() {
    //这里存放数据
    return {
      isPopup: false,
      isShowUpload: false, // 不点击文件上传不显示
      index: 0, //标识被选中的是第几个弹出窗，默认 0代表门脸图；1代表店内环境图

      // isCurText: false,
      mainCate: "", //请选择经营品类
      minorCate: "",
      address: "省 - 市 - 区/县", //标记店铺地址
      addrCode: "", //门牌号
      logo: "", //门脸图
      shopName: "", //门店牌匾名称
      enviroment: "", //店内环境图
      managName: "", //联系人
      telephone: "", //联系人电话
      popupVisible: false,

      cateTips: false,
      addrTips: false,
      logoTips: false,
      shopNameTips: false,
      envTips: false,
      nameTips: false,
      msg:'当前项不能为空',
      shopLists: {} //店铺信息数组，将来要传给 store
    };
  },
  created() {
    this.getShopInfo;
    this.info();
  },
  methods: {
    next() {
      
      for(let i = 1;i<7;i++){
        this.reqCheck(i)
      }
      
      if(!this.cateTips && !this.addrTips && !this.logoTips && !this.shopNameTips && !this.envTips && !this.nameTips){
        //验证通过
        console.log("验证通过");
      }else{
        //验证不通过
        console.log("验证不通过");
      }
    },
    reqCheck(item) {
      switch (item) {
        case 1:
          if(this.mainCate === '请选择经营品类别'){
            this.cateTips = true
          }else{
            this.cateTips = false
          }
          break;
        case 2:
          if(this.address === '省 - 市 - 区/县'){
            this.addrTips = true
          }else{
            this.addrTips = false
          }
          break;
        case 3:
          if(this.logo === null || this.logo.length === 0){
            this.logoTips = true
          }else{
            this.logoTips = false
          }
          break;
        case 4:
          if (this.shopName === "" || this.shopName === undefined) {
            this.shopNameTips = true;
          }else{
            this.shopNameTips = false
          }
          break;
        case 5:
          if(this.enviroment === null || this.enviroment.length === 0){
            this.envTips = true
          }else{
            this.envTips = false
          }
          break;
        case 6:
          var ren = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
          console.log(this.managName.length);
          if (this.managName === "" || this.managName === undefined) {
            this.nameTips = true;
            this.msg='当前项不能为空'
          }else if(!ren.test(this.managName)){
            this.nameTips = true;
            this.msg = '姓名只能是纯汉字'
          }else{
            this.nameTips = false
          }
          if(this.managName.length<2){
            this.nameTips = true
            this.msg = '姓名至少为两个汉字'
          }
          break;
      }
    },
    info() {
      this.shopLists = this.getShopInfo;
    },
    //打开弹窗
    showPopup(i, falg) {
      if(i === 0){
        this.logoTips = false
      }else{
        this.envTips = false
      }
      if (falg) {
        //显示上传图片弹窗
        this.isShowUpload = true;
      } else {
        //显示示例图弹窗
        this.isShowUpload = false;
      }
      this.index = i;
      this.isPopup = true;
    },
    //子组件传递给父组件的事件，用来关闭弹出窗
    closePopup(val) {
      this.isPopup = val;
      
    },
    handleCommit(item) {
      //输入框失去焦点后，提交 数据到 store
      let info = {};
      switch (item) {
        case 1: //门牌号
          info = { addrCode: this.addrCode };
          break;
        case 2: //牌匾名称
          info = { shopName: this.shopName };
          break;
        case 3: //联系人
          info = { managName: this.managName };
          break;
      }
      this.$store.commit("updateInfo", info);
    },
    // 控制城市三级联动弹窗打开
    getAddrPick() {
      this.addrTips = false
      this.popupVisible = !this.popupVisible;
    },
    // 获取店铺地址
    getAddr(val) {
      this.address = val;
      let info = { address: this.address };
      this.$store.commit("updateInfo", info);
    }
  },
  watch: {
    getShopInfo:{ //如果不加该函数，图片预览效果出不来。
      handler:function(newVal,oldVal){
        console.log(newVal);
        console.log(oldVal);
      },
      deep:true
    }
  },
  computed: {
    currentTel() {
      //获取当前手机号
      return this.$store.getters.getCurrTel;
    },
    getShopInfo() {
      //初始化数据
      let object = this.$store.getters.filterShop(); //获取当前店铺信息
      console.log(`初始化数据,${object}`);
      this.telephone = object.telephone;
      this.managName = object.managName;
      this.address =
        object.address === undefined ? "省 - 市 - 区/县" : object.address;
      this.addrCode = object.addrCode;
      this.shopName = object.shopName;

      if (object.cateLists) {
        this.mainCate = `主营：${object.cateLists[0].name}`;

        if (object.cateLists.length > 1) {
          this.minorCate = `次营：${object.cateLists[1].name}`;
        }
      } else {
        this.mainCate = "请选择经营品类别";
      }
      this.logo = object.logo === undefined ? "" : `/srcURL${object.logo}`;
      this.enviroment =
        object.enviroment === undefined ? "" : `/srcURL${object.enviroment}`;
      return object;
    }
  }
};
</script>
<style lang='' scoped>
.list {
  margin: 10px 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0;
  margin-left: 15px;
}
.right-item {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.right-item .hide.tips,
.right-item .hide.input-tips {
  color: red;
}
.right-item .hide {
  color: #fff;
  font-size: 10px;
  line-height: 14px;
}
.right-item .upload-pic-tips {
  color: #007aff;
  font-size: 10px;
}
.right-item .input-tips {
  text-align: right;
  margin-right: 27px;
}

.list-item .mui-icon {
  margin-right: 20px;
}
.list-item .title {
  width: 30%;
  color: #333;
  padding-top: 3px;
}
.list-item .title.input-title {
  padding-top: 10px;
}
.list-item .title > span {
  font-size: 10px;
}
.list-item .item-content,
.list-item input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list .list-item.border {
  border-top: 1px solid #0000000d;
}
.list-item input {
  border: 0;
  padding: 10px 0 0;
  font-size: 14px;
  height: 30px;
  margin-bottom: 0;
}
input[type="tel"] {
  margin-bottom: 14px;
}
.item-content .example {
  position: absolute;
  right: 15px;
  color: #007aff;
}
.item-input {
  padding: 0;
}
/* 上传样式 */
.upload {
  width: 50px;
  height: 50px;
  border: 1px solid #007aff;
  margin-top: 5px;
  background: url("../../assets/images/add.png") no-repeat 50% 50%;
  box-sizing: border-box;
}
.upload.hideStyle {
  border: none;
}
.upload > img {
  display: block;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
}
.upload > img.hideimg {
  display: none;
}

/* 经营品类 内容样式 */
/* .right-item > .item-content.curText {
  font-size: 12px;
} */

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