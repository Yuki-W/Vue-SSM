<!-- 上传图片 -->
<template>
  <div v-show="showPopup" class="uploadPic">
    <!-- 这里是要展示的内容 -->
    <div class="main">
      <form class="main-txt" enctype="multipart/form-data" method="post">
        <strong>注意事项</strong>
        <p>·需拍出完整门匾、门框（建议正对门店2米处拍摄）</p>
        <img :src="imgPath[index]" @click="showPic" />
        <input type="file" v-show="showUpload" value="上传文件" id="logo-img-file" @change="getPicFile" multiple/>
        <label for="logo-img-file" v-show="showUpload" class="mui-btn mui-btn-primary">上传文件</label>
      </form>
      <div class="icon">
        <span class="mui-icon mui-icon-close" @click="closePopup"></span>
      </div>
    </div>
    <!-- 这是半透明背景层 -->
    <div class="over"></div>

    <div v-show="isShowPic">
      <div class="pic-main">
        <!-- 缩略大图 -->
        <img :src="imgPath[index]" alt />
      </div>
      <!-- 这是半透明背景层 -->
      <div class="cover" @click="DisabPic"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["popup", "filePopup", "item"],
  watch: {
    //监听父组件传递过来的值，并将值赋值给 v-show
    popup(val) {
      this.showPopup = val;
    },
    filePopup(val) {
      this.showUpload = val;
    },
    item(val) {
      this.index = val;
    }
  },
  data() {
    //这里存放数据
    return {
      showPopup: this.popup, //控制弹出层的显示和隐藏
      isShowPic: false, // 表示缩略图不显示
      showUpload: this.filePopup,
      index: this.item, //标识当前是哪一项
      imgPath: [
        "http://shadow.elemecdn.com/faas/napos-kaidian/static/img/ex-front.b2cc2c4.png",
        "https://shadow.elemecdn.com/lib/kd-resource@0.1.0/indoor-pic.jpeg"
      ],
      picFile: ""
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
    },
    getPicFile(even) {
      //点击上传图片按钮，改变图片路径
      console.log("前端准备提交文件了");
      let name = this.index === 0? "门脸图":"店内环境图"
      let file = even.target.files[0];//获取文件资源
      let formData = new FormData()
      formData.append('name',name)
      formData.append('file',file)
      console.log(file)
      this.$axios.post("/api/fileUpload",formData).then(result => {
        // console.log(result);
        if(result.data.flag){
          let info={}
          if(this.index === 0){
              info = {logo:result.data.message}
            }else{
              info = {enviroment:result.data.message}
            }
            this.$store.commit('updateInfo',info)
          this.closePopup()
        }
      })
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
.main-txt > label {
  width: 100%;
  margin-top: 20px;
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