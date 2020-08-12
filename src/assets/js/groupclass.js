import Vue from 'vue';
import common from "./common";
import groupapi from "@/api/ClassApi";
import {Image, Swipe, SwipeItem } from 'vant';
import VueRouter from 'vue-router';
Vue.use(Image).use(Swipe).use(SwipeItem);

export default {
  data() {
    return {
      id: this.$route.query.id,
      options: {
        pullUpLoad: false
      },
      swiperOption: {
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 300000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
      }
    }
  },
  created() {},
  methods: {
    back() {
        this.$router.go(-1);
        
    },
    datalist(){
      groupapi.gourpdetail(this.id).then(res=>{

      })
    },
    scrollcheck() {
      this.$refs.scroll.enable();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroll.refresh();
    });
  },
};