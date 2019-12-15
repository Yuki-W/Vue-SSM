<!-- 门店信息第一步 -->
<template>
  <div class>
    <!-- 经营品类 -->
    <div class="list">
      <div class="list-item">
        <span class="title">经营品类</span>
        <routerLink to="/category" class="right-item" tag="div">
          <div class="item-content" :class="{'curText':isCurText}">
            {{mainMsg}}
            <br />
            {{minorMsg}}
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
          <div class="item-content" @click="getAddrPick">
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
          <input type="text" placeholder="详细地址 例：5号楼101室" v-model="addrCode" />
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
                <a class="example" @click="showPopup">示例图</a>
              </span>

              <div class="upload" @click="showUpload">
                <img :src="logo" alt />
              </div>
            </div>
            <!-- 弹窗功能 -->
            <div v-show="popup">
              <!-- 这里是要展示的内容 -->
              <div class="main">
                <div class="main-txt">
                  <strong>注意事项</strong>
                  <p>·需拍出完整门匾、门框（建议正对门店2米处拍摄）</p>
                  <img
                    src="http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png"
                    @click="showPic"
                  />
                  <button v-show="isShowUpload" type="button" class="mui-btn mui-btn-primary">上传文件</button>
                </div>
                <div class="icon">
                  <span class="mui-icon mui-icon-close" @click="closePopup"></span>
                </div>
              </div>
              <!-- 这是半透明背景层 -->
              <div class="over"></div>
            </div>
            <!-- 缩略图 -->
            <div v-show="isShowPic">
              <div class="pic-main">
                <!-- 缩略大图 -->
                <img
                  src="http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png"
                  alt
                />
              </div>
              <!-- 这是半透明背景层 -->
              <div class="cover" @click="DisabPic"></div>
            </div>
          </div>
          <div class="hide" :class="{'upload-pic-tips':logoTips}">请上传门脸图</div>
        </div>
      </div>
      <!-- 门店牌匾名称 -->
      <div class="list-item border item-input">
        <span class="title input-title">门店牌匾名称</span>
        <div class="right-item">
          <input type="text" placeholder="需与门脸图牌匾一致" v-model="shopName" />
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
                <a class="example" @click="showPopup">示例图</a>
              </span>

              <div class="upload" @click="showUpload">
                <img :src="enviroment" alt />
              </div>
            </div>
            <!-- 弹窗功能 -->
            <div v-show="popup">
              <!-- 这里是要展示的内容 -->
              <div class="main">
                <div class="main-txt">
                  <strong>注意事项</strong>
                  <p>·需真实反映用餐环境（收银台、用餐桌椅等）</p>
                  <img
                    src="http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png"
                    @click="showPic"
                  />
                  <button v-show="isShowUpload" type="button" class="mui-btn mui-btn-primary">上传文件</button>
                </div>
                <div class="icon">
                  <span class="mui-icon mui-icon-close" @click="closePopup"></span>
                </div>
              </div>
              <!-- 这是半透明背景层 -->
              <div class="over"></div>
            </div>
            <!-- 点击缩略小图，查看大图 -->
            <div v-show="isShowPic">
              <div class="pic-main">
                <!-- 缩略大图 -->
                <img
                  src="http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png"
                  alt
                />
              </div>
              <!-- 这是半透明背景层 -->
              <div class="cover" @click="DisabPic"></div>
            </div>
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
          <input type="text" placeholder="请填写门店经营者姓名" v-model="managName" />
          <div class="hide" :class="{'input-tips':nameTips}">当前项不能为空</div>
        </div>
      </div>
      <!-- 联系电话 -->
      <div class="list-item border item-input">
        <span class="title input-title">联系电话</span>
        <div class="right-item">
          <!-- 将来谁用手机号注册，该手机号默认自动填入下面的输入框 -->
          <input type="tel" maxlength="11" placeholder="请填写门店经营者联系电话" v-model="phone" />
          <div class="hide" :class="{'input-tips':phoneTips}">当前项不能为空</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import picker from '../../components/mobile/comment/AddrPicker'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    picker
  },
  props: {
    cateTips: Boolean,
    nameTips: Boolean,
    phoneTips: Boolean,
    shopNameTips: Boolean,
    logoTips: Boolean,
    addrTips: Boolean,
    envTips: Boolean
  },
  data() {
    //这里存放数据
    return {
      popup: false, //表示不显示弹窗
      isShowPic: false, // 表示缩略图不显示
      isShowUpload: false, // 不点击文件上传不显示
      mainMsg: "", //请选择经营品类
      minorMsg: "",
      isCurText: false,
      address: "省 - 市 - 区/县", //标记店铺地址
      addrCode: "", //门牌号
      logo: "", //门脸图
      shopName: "", //门店牌匾名称
      enviroment: "", //店内环境图
      managName: "", //联系人
      phone: "", //联系人电话
      map: {},
      popupVisible:false
    };
  },
  created() {
    this.getCategor();
  },
  //方法集合
  methods: {
    //开启弹窗
    showPopup() {
      this.popup = true;
      this.isShowUpload = false;
    },
    //关闭弹窗
    closePopup() {
      this.popup = false;
    },
    //显示缩略图
    showPic() {
      this.isShowPic = true;
    },
    //隐藏缩略大图
    DisabPic() {
      console.log("点击");
      this.isShowPic = false;
    },
    //文件上传
    showUpload() {
      this.isShowUpload = true;
      this.popup = true;
    },
    //经营品类
    getCategor() {
      // 获取经营类别。
      // 思路：因为选择类别页面的按钮如果未选中任何值不会发生跳转，也不会存储。所以不用判断，通过它跳转过来的界面必有值
      // 但是，在刚进入当前页面时要去判断是否存储有值
      let cateList = JSON.parse(sessionStorage.getItem("cateList"));

      if (cateList !== null && cateList.length > 0) {
        this.mainMsg = "主营：" + cateList[0].name;
        if (cateList.length > 1) {
          this.minorMsg = "次营：" + cateList[1].name;
        }
      } else {
        this.mainMsg = "请选择经营品类";
      }
    },
    // 控制城市三级联动弹窗打开
    getAddrPick(){
      this.popupVisible=!this.popupVisible
    },
    // 获取店铺地址
    getAddr(val){
      this.address = val
    }
  },
  updated() {
    //页面内容被修改后，使用键值对形式存入数组
    this.$set(this.map, "mainCate", this.mainMsg);
    this.$set(this.map, "minorCate", this.minorMsg);
    this.$set(this.map, "address", this.address);
    this.$set(this.map, "addrCode", this.addrCode);
    this.$set(this.map, "logo", this.logo);
    this.$set(this.map, "shopName", this.shopName);
    this.$set(this.map, "enviroment", this.enviroment);
    this.$set(this.map, "managName", this.managName);
    this.$set(this.map, "phone", this.phone);

    this.$emit("stepList1", this.map);
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

/* 弹窗样式 */
.main {
  position: fixed;
  left: 15%;
  top: 25%;
  width: 70%;

  z-index: 1000;
  box-sizing: border-box;
}
.over,
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  /* z-index: 999; */
  background-color: rgb(22, 21, 21);
}
.over {
  z-index: 999;
}
.cover {
  z-index: 1001;
}
.main-txt {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}
.main-txt > strong {
  font-size: 14px;
}
.main-txt > p {
  font-size: 12px;
  margin: 10px 0 15px;
}
.main-txt > img {
  width: 100%;
}
.main-txt > button {
  width: 100%;
  margin-top: 10px;
}
.main .mui-icon.mui-icon-close {
  color: #fff;
  text-align: center;
  margin-top: 10px;
  margin-right: 0;
}
.icon {
  display: flex;
  justify-content: center;
  margin: 0 33px;
  box-sizing: border-box;
}

/* 缩略大图 */
.pic-main {
  width: 100%;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 1002;
  background-color: red;
}
.pic-main > img {
  width: 100%;
}

/* 经营品类 内容样式 */
.right-item > .item-content.curText {
  font-size: 12px;
}

/* 三级联动样式 */
</style>