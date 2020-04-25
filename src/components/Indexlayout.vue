<template>
  <div class="swiperview" @click="viewclick()">
    <van-image class="swiperimg" fit="cover" :src="src" radius="6px" />
    <div class="swipertitle">{{title}}</div>
    <div class="swipernum">
      <slot name="swiperprice"></slot>
      <div class="num">{{num}}</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Image } from "vant";
Vue.use(Image);
export default {
  name: "indexlayout",
  props: ["src", "title", "num"],
  data() {
    return {};
  },
  methods: {
    viewclick() {
      this.$emit("click");
    }
  },
  watch: {},
  created() {}
};
</script>
<style lang='scss' scoped>
.swiperview {
  width: 100%;
  float: left;
  .swiperimg {
    width: 100%;
    float: left;
    height: 105px;
    border-radius: 6px;
  }
  .swipertitle {
    width: 100%;
    float: left;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
    line-height: 18px;
  }
  .swipernum {
    width: 100%;
    float: left;
    margin-top: 8px;
    .swiperprice {
      float: left;
      font-size: 13px;
      font-weight: bold;
      margin-right: 12px;
    }
    .num {
      float: left;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>

