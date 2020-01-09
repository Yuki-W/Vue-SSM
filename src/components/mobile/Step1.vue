<!-- 门店信息第一步 -->
<template>
  <div class>
    <!-- 经营品类 -->
    <div class="list">
      <div class="list-item">
        <span class="title">经营品类</span>
        <routerLink to="/category" class="right-item" tag="div">
          <div class="item-content" :class="{'curText':isCurText}">
            {{mainCate}}
            <br />
            {{minorCate}}
            <!-- {{getMainCate}}<br>{{getMinorCate}} -->
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

              <div class="upload" @click="showPopup(0,true)" :class="[logo === undefined? '':'hideStyle']">
                <img :src="logo" alt  :class="[logo===undefined?'hideimg':'']"/>
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
          <input type="text" placeholder="需与门脸图牌匾一致" v-model="shopName" @blur="handleCommit(2)" />
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

              <div class="upload" @click="showPopup(1,true)" :class="[enviroment === undefined? '':'hideStyle']">
                
                <img :src="enviroment" alt :class="[enviroment===undefined?'hideimg':'']"/>
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
          <input type="text" placeholder="请填写门店经营者姓名" v-model="managName" @blur="handleCommit(3)" />
          <div class="hide" :class="{'input-tips':nameTips}">当前项不能为空</div>
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
</template>

<script>
import picker from "../../components/mobile/common/AddrPicker";
import popPic from "../mobile/common/UploadPic";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    picker,
    popPic
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
      isPopup: false,
      isShowUpload: false, // 不点击文件上传不显示
      index: 0, //标识被选中的是第几个弹出窗，默认 0代表门脸图；1代表店内环境图
      // imageFile:"",//图片路径
      mainCate: "", //请选择经营品类
      minorCate: "",
      isCurText: false,
      address: "省 - 市 - 区/县", //标记店铺地址
      addrCode: "", //门牌号
      logo: "", //门脸图
      shopName: "", //门店牌匾名称
      enviroment: "", //店内环境图
      managName: "", //联系人
      telephone: "", //联系人电话
      popupVisible: false,
      shopLists: {} //店铺信息数组，将来要传给 store
    };
  },
  created() {
    this.getShopInfo;
    this.info();
    this.shopLists.telephone = this.telephone;
  },
  methods: {
    info() {
      this.shopLists = this.getShopInfo;
    },
    //打开弹窗
    showPopup(i, falg) {
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
    getShopInfo:function(newVal,oldVal){
      console.log(`当前对象:${newVal},旧值：${oldVal}`)
    }
  },
  computed: {
    currentTel() {
      //获取当前手机号
      return this.$store.getters.getCurrTel;
    },
    getShopInfo() {
      // console.log('执行一次');
      //初始化数据
      let object = this.$store.getters.filterShop(); //获取当前店铺信息
      console.log(object);
      this.telephone = object.telephone;
      this.managName = object.managName;
      this.address =
        object.address === undefined ? "省 - 市 - 区/县" : object.address;
      this.addrCode = object.addrCode;
      this.shopName = object.shopName;

      if (object.cateLists) {
        this.mainCate = object.cateLists[0].name;
        if (object.cateLists.length > 1) {
          this.minorCate = object.cateLists[1].name;
        }
      } else {
        this.mainCate = "请选择经营品类别";
      }
      this.logo = object.logo
      this.enviroment = object.enviroment
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
.upload>img.hideimg{
  display: none;
}

/* 经营品类 内容样式 */
.right-item > .item-content.curText {
  font-size: 12px;
}
</style>