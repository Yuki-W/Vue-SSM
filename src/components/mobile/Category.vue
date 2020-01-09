<!-- 经营品类 -->
<template>
  <div class>
    <user-defined-header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" slot="header-left"></a>
      <h1 class="mui-title" v-cloak>经营品类</h1>
    </user-defined-header>

    <!-- 类别分区 -->
    <div class="content-tabbar">
      <p>请必选一个主营分类，选填一个次营分类</p>
      <div class="tabbar">
        <a class="main-tab" :class="{'active':isActive}" @click.prevent="change(1)">主营分类</a>
        <a class="minor-tab" :class="{'active':!isActive}" @click.prevent="change(2)">
          次营分类
          <span style="font-size:10px">(选填)</span>
        </a>
      </div>
    </div>
    <div id="main-content" class="content">
      <div class="item" v-for="(item,index) in categories" :key="index">
        <h1>{{item.type_name}}</h1>
        <ul>
          <li
            :class="{'active':item1.id === curIndex,'disable':item1.id===oldIndex}"
            v-for="(item1,i) in item.categoriesList"
            :key="i"
            @click="btnMain(item1)"
          >{{item1.name}}</li>
        </ul>
      </div>
    </div>
    <!-- Toast 消息提示框 -->
    <toast ref="child"></toast>

    <!-- 底部按钮 -->
    <footer class="footer-tabbar">
      <div class="btn-tabbar">
        <button class="mui-btn mui-btn-danger" :class="{'submit':isSubmit}" @click="submit">确定</button>
      </div>
    </footer>
  </div>
</template>

<script>
import header from "../mobile/common/Header";
import toast from "../mobile/common/Toast";
export default {
  components: {
    userDefinedHeader: header,
    toast
  },
  data() {
    //这里存放数据
    return {
      curIndex: 0, //当前被点击的选项
      oldIndex: 0, //前一次被点击的选项
      temp: 0, //中间变量，用来实现数据切换
      isActive: true,
      isSubmit: false, //切换确认按钮样式。默认未选中分类
      categories: [], //所有分类的列表数组
      map: [] //保存当前选中项
    };
  },
  created() {
    this.getCategory();
    this.change(1);

    //设置第一次进入页面时，默认选中上一次选择的选项值
   
    let shopList = this.$store.getters.filterShop(); // 获取当前店铺信息
    let cateArray = shopList.cateLists; // 当前店铺的经营类别信息
    if (cateArray !== null) {
      this.isSubmit = true;
      for (let i = 0; i < cateArray.length; i++) {
        this.map.push(cateArray[i])
        i % 2 === 0
          ? (this.curIndex = cateArray[i].id)
          : (this.oldIndex = cateArray[i].id);
      }
    }
  },
  //方法集合
  methods: {
    //获取经营品类详情
    getCategory() {
      this.$axios.get("/api/selAllCate").then(result => {
        // console.log(result);
        if (result.status === 200) {
          this.categories = result.data;
        }
      });
    },
    btnMain(item) {
      if (this.isActive) {
        //表示在主营页面进行操作
        item.major = 1;
        if (this.curIndex === 0) {
          this.curIndex = item.id;
          this.map.push(item);
          this.isSubmit = true;
        } else if (this.curIndex === item.id) {
          //取消操作
          this.curIndex = this.oldIndex = 0;
          this.map.splice(0, this.map.length);
          this.isSubmit = false;
        } else {
          this.map.shift();
          this.curIndex = item.id;
          this.map.unshift(item);
          this.isSubmit = true;
        }
      } else {
        //次营
        item.major = 2;
        if (this.curIndex === 0) {
          this.curIndex = item.id;
          this.map.push(item);
          this.isSubmit = true;
        } else if (this.curIndex === item.id) {
          //取消操作
          this.map.pop();
          this.curIndex = 0;
          this.isSubmit = false;
        } else {
          this.map.pop();
          this.curIndex = item.id;
          this.map.push(item);
          this.isSubmit = true;
        }
      }
    },
    change(evl) {
      //实现数据的切换，只需要交换前一次和后一次点击时候的值
      //切换选项卡的类名
      this.temp = this.curIndex;
      this.curIndex = this.oldIndex;
      this.oldIndex = this.temp;
      if (evl === 1) {
        this.isActive = true;
      } else if (evl === 2) {
        this.isActive = false;
        if (this.oldIndex === 0) {
          this.$refs.child.toast("请先选择主营分类"); //父类通过 $refs 调用子类方法
          this.change(1);
        }
      }
      //切换确认按钮的样式
      this.curIndex === 0 ? (this.isSubmit = false) : (this.isSubmit = true);
    },
    submit() {
      if (this.map.length > 0) {
        // 提交 选中的经营类别对象给 store
        let info = {cateLists:this.map}
        this.$store.commit("updateInfo", info);
      }
      this.$router.push({ name: "step0" });
    }
  }
};
</script>
<style lang='' scoped>
.mui-control-item {
  /* 解决点击选项卡报错问题 */
  touch-action: none;
}
.content-tabbar {
  background-color: #fff;
  padding: 30px 0 10px;
}
.content-tabbar > p {
  padding-left: 20px;
  margin-bottom: 10px;
}
.tabbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabbar > a {
  width: 50%;
  text-align: center;
  padding: 8px 0;
  border-bottom: 2px solid #ffffff;
}
.tabbar > .active {
  border-color: #007aff;
  color: #007aff;
  pointer-events: none;
}

.content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 34px;
  /* display: none; */
}
.content.active {
  display: block;
}
.item {
  margin-bottom: 20px;
}
.item > h1 {
  font-size: 14px;
  font-weight: bolder;
}
.item > ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item ul > li {
  border: 1px solid #0000001a;
  border-radius: 20px;
  padding: 5px 0;
  width: 30%;
  text-align: center;
  box-sizing: border-box;
  margin: 10px 5px;
  font-size: 12px;
}
/* 选中按钮样式 */
.item ul > .active {
  border-color: #007aff69;
  color: #007aff;
  background-color: rgba(197, 227, 252, 0.46);
}
.item ul > .disable {
  color: #b6adadcf;
  background-color: #e0dddd;
  border-color: #e2e2e2cf;
  pointer-events: none; /* 阻止点击事件响应 */
}

/* 底部 */
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
  justify-content: center;
  align-items: center;
}
.btn-tabbar .mui-btn.mui-btn-danger {
  width: 60%;
  border-radius: 20px;
  background-color: #dd524d7d;
  border-color: #dd524d7d;
  pointer-events: none;
}
.btn-tabbar .mui-btn.mui-btn-danger.submit {
  background-color: #dd524d;
  border-color: #dd524d;
  pointer-events: auto;
}
</style>