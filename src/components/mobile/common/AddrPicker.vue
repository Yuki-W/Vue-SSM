<!-- 城市三级联动 公共组件 -->
<template>
  <div class>
    <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="close">
      <mt-picker :slots="addrList" valueKey="name" @change="onValuesChange"></mt-picker>
      <div class="btn-operate">
        <div class="btn">
          <a class="btn-cancel" @click="operate(1)">取消</a>
          <a class="btn-submit" @click="operate(2)">确定</a>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {
  GetProvinces,
  Getcities,
  Getareas
} from "../../../lib/outFile/js/handleAddr";
export default {
  props: ["result"],
  data() {
    //这里存放数据
    return {
      close: false,
      popupVisible: false,
      addrList: [
        {
          // 一级 省
          flex: 1,
          values: GetProvinces(),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          className: "slot2"
        },
        {
          // 二级 市
          flex: 1,
          values: Getcities("11"),
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          className: "slot4"
        },
        {
          // 三级 区/县
          flex: 1,
          values: Getareas("1101"),
          className: "slot5",
          textAlign: "center"
        }
      ],
      region: "北京市 - 北京市 - 东城区", //默认地址初始值（解决不滚动时选择无效问题）
      regionInit: false,
      popupVisible: this.result, //控制 picker 的显示和隐藏
      oldRegion: ""
    };
  },
  watch: {
    result(val) {
      // 解决 val传过来的值为false的错误情况
      this.popupVisible = true;
    }
  },
  methods: {
    operate(index) {
      this.popupVisible = false;
      if (index === 1) { //取消按钮
        this.oldRegion = "省 - 市 - 区/县";
        this.$emit("getRegion", this.oldRegion);
      } else { //确认按钮
        this.region = this.region;
        this.$emit("getRegion", this.region);
      }
    },
    onValuesChange(picker, values) {
      //城市三级联动
      if (this.regionInit) {
        if (values[0] && values[1] && values[2]) {
          this.region = `${values[0]["name"]} - ${values[1]["name"]} - ${
            values[2]["name"]
          }`;

          // console.log(this.region);

          //给市、县赋值
          let area = "";
          if (values[0].name == "北京市") {
            area = "1101";
          } else if (values[0].name == "天津市") {
            area = "1201";
          } else {
            area = values[1]["code"];
          }
          picker.setSlotValues(1, Getcities(values[0]["code"]));
          picker.setSlotValues(2, Getareas(area));

          //   传递给父组件的 被选中的数据 【格式：省 - 市 - 区/县】
          this.$emit("getRegion", this.region);
        } else {
          console.log("数据不全");
        }
      } else {
        this.regionInit = true;
      }
      // console.log(this.regionInit);
    }
  }
};
</script>
<style >
.mint-popup-bottom,
.pop {
  width: 100%;
}
.picker-slot.picker-slot-center:nth-child(2n-1) {
  font-size: 14px;
}
.btn-operate {
  position: fixed;
  background-color: #eeebeb;
  bottom: 180px;
  width: 100%;
}
.btn {
  display: flex;
  justify-content: space-between;
}
.btn > a {
  color: #007aff;
  margin: 10px 20px;
}
</style>