<template>
  <div class="swiperview" @click="viewclick()">
      <div class="image">
          <van-image class="swiperimg" fit="cover" :src="src" radius="6px" />
      </div>
    
    
    <div class="swipernum">
        <div class="title">
            <div class="swipertitle">{{title}}</div>
        </div>
        <div class="num">
            <slot name="swiperprice"></slot>
            <div class="num">{{num}}</div>
        </div>
      
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Image } from "vant";
Vue.use(Image);
export default {
  name: "indexlayout1",
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
  display: flex;
.image{
    width: 40%;
    .swiperimg {
    width: 90%;
    float: left;
    height: 65px;
    border-radius: 6px;
  }
}
  
  
  .swipernum {
    width: 65%;
    display: flex;
    flex-wrap: wrap;
    

    .title{
        width: 100%;
        .swipertitle {
    width: 95%;
    float: left;
    color: #333333;
    font-size: 13px;
    font-weight: bold;
    
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    line-height: 18px;
  }
    }
    .num{
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
}
</style>

