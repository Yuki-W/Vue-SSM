<!-- 上传图片 -->
<template>
  <div v-show="showPopup" class="uploadPic">
    <!-- 这里是要展示的内容 -->
    <div class="main">
      <div class="main-txt">
        <strong>注意事项</strong>
        <p>·需拍出完整门匾、门框（建议正对门店2米处拍摄）</p>
        <img
          :src="imgPath[1]"
          @click="showPic"
        />
        <input type="file" v-show="showUpload" value="上传文件" id="logo-img-file" />
        <label for="logo-img-file" v-show="showUpload" class="mui-btn mui-btn-primary">上传文件</label>
      </div>
      <div class="icon">
        <span class="mui-icon mui-icon-close" @click="closePopup"></span>
      </div>
    </div>
    <!-- 这是半透明背景层 -->
    <div class="over"></div>

    <div v-show="isShowPic">
      <div class="pic-main">
        <!-- 缩略大图 -->
        <img
          :src="imgPath[1]"
          alt
        />
      </div>
      <!-- 这是半透明背景层 -->
      <div class="cover" @click="DisabPic"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["popup", "filePopup"],
  watch: {
    //监听父组件传递过来的值，并将值赋值给 v-show
    popup(val) {
      this.showPopup = val;
    },
    filePopup(val) {
      this.showUpload = val;
    }
  },
  data() {
    //这里存放数据
    return {
      showPopup: this.popup, //控制弹出层的显示和隐藏
      isShowPic: false, // 表示缩略图不显示
      showUpload: this.filePopup,
      imgPath:["http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png","https://shadow.elemecdn.com/lib/kd-resource@0.1.0/indoor-pic.jpeg"]
    };
  },
  methods: {
    showPic() {
      this.isShowPic = true;
    },
    DisabPic() {
      this.isShowPic = false;
    },
    // 点击删除按钮，关闭弹窗
    closePopup() {
      this.showPopup = false;
      //   子组件向父组件传值，告诉其已经关闭了
      this.$emit("close", this.showPopup);
    }
  }
};
</script>
<style lang='' scoped>
.main {
  position: fixed;
  left: 15%;
  top: 25%;
  width: 70%;
  z-index: 1000;
  box-sizing: border-box;
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
.main-txt > input[type="file"] {
  display: none;
}
.main-txt>label{
    width: 100%;
    margin-top: 20px
}

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

.over,
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  background-color: rgb(22, 21, 21);
}
.over {
  z-index: 999;
}
.cover {
  z-index: 1001;
}
</style>