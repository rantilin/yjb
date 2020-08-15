import Vue from 'vue';
import common from "./common";
import groupapi from "@/api/groupclassApi";
import {
  Image,
  Swipe,
  SwipeItem,
  Popup,
  Loading
} from 'vant';
import {
  share_yp
} from './share';
import Lottie from "vue-lottie/src/lottie.vue";
import videoplay from '@/components/videoplay';
import classorder from '@/components/classorder';
Vue.use(Image).use(Swipe).use(SwipeItem).use(Popup).use(Loading);

export default {
  name: 'groupclass',
  components: {
    Lottie,
    videoplay,
    classorder
  },
  data() {
    return {
      classid: this.$route.query.classid,
      classtype: this.$route.query.state, //1是视频，2是音频
      key: this.$store.state.key.value,
      usersecret: this.$route.query.secret,
      groupswith: false, //参团还是开团
      options: {
        pullUpLoad: false
      },
      listdata: [], //拼团数据
      listuser: [], //用户轮播数据
      attention: false, //引导分享弹窗
      goods_image: '', //课程图片
      goods_name: '', //课程名称
      goods_price: 0, //课程价格
      //分享参数
      keyval: 1,
      
      url: process.env.VUE_APP_SERVICE_URLS,
      present: process.env.VUE_APP_SERVICE_URLS + "#/groupclass?classid=" + this.$route.query.classid + "&state="+this.$route.query.state ,

      goodsStatezj: 0, //是否开启章节
      
      videosrc: '', //视频地址
      goods_buytext: '', //按钮状态文字
      audiolist: '', //音频列表
      zjtext: '', //当前章节name
      zjid: '', //当前章节id
      videoalltime: '', //当前章节时间
      duration: '', //当前时间错
      remend: false,
      goods_images: '', //课程详情图片
      discountoption: 0, //金额
      secret: '', //拼团验证信息
      grouplistuser: [], //拼团列表信息
      groupnum: 0, //参团人数
      videolist: [], //视频列表
      chapterlist: [], //开启选集视频列表
      allvideolist: '', //开启选集后数据列表
      audiolist: '', //音频列表
      videosrc: "", //视频地址
      playindex: 0, //初始化默认播放下标为0,
      orderdata: [],
      ordershow: false,
      contactus: false,
    }
  },
  created() {
    if (this.key) {
      // if (this.$route.query.key) {
      //   this.key = this.$route.query.key
      // }
      if (this.usersecret == undefined) {
        this.groupswith = true
      } else {
        this.groupswith = false
      }
      this.getgroup()
      this.geiclass()
      if (this.usersecret == undefined) {
        this.kaituan()
      } else {
        this.getgourpuesr(this.usersecret)
      }
     } else{
     this.$router.push({
       path: '/login',
       query: {
           back: true
       }
    })
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getgroup() {
      groupapi.gourpdetail(this.key, this.classid).then(res => {
        this.listdata = res.data.datas
      }).catch(err => {
        if (err.message != "interrupt") {
          let errmsg = '请求失败';
          if (err.message.includes('timeout')) {
            errmsg = "请检查网络再刷新重试"
          }
          this.toast(errmsg);
        }
      });
      groupapi.gourpuser(this.key).then(res => {
        this.listuser = res.data.datas
      }).catch(err => {
        if (err.message != "interrupt") {
          let errmsg = '请求失败';
          if (err.message.includes('timeout')) {
            errmsg = "请检查网络再刷新重试"
          }
          this.toast(errmsg);
        }
      })

    },
    kaituan() {
      groupapi.gourpkt(this.key, this.classid).then(res => {
        this.getgourpuesr(res.data.datas.group_order_secret)
      }).catch(err => {
        if (err.message != "interrupt") {
          let errmsg = '请求失败';
          if (err.message.includes('timeout')) {
            errmsg = "请检查网络再刷新重试"
          }
          this.toast(errmsg);
        }
      });
    },
    getgourpuesr(secret) {
      groupapi.gourpktuser(this.key, secret).then(res => {
        this.grouplistuser = res.data.datas.order_info.group_combination
        let nopet = {
          member_avatar: '../assets/image/userdf.png',
        }
        let num = this.grouplistuser.length;
        this.groupnum = this.grouplistuser.length;
        if (this.grouplistuser.length < 10) {
          for (let index = 0; index < 10 - num; index++) {
            this.grouplistuser.push(nopet)
          }
        }
      }).catch(err => {
        if (err.message != "interrupt") {
          let errmsg = '请求失败';
          if (err.message.includes('timeout')) {
            errmsg = "请检查网络再刷新重试"
          }
          this.toast(errmsg);
        }
      });
    },
    geiclass() {
      groupapi.loginvideodetail(this.key, this.classid, this.classtype).then(res => {
        this.orderdata =  res.data.datas
        this.goods_image = res.data.datas.brief.goods_image;
        this.goods_name = res.data.datas.brief.goods_name;
        this.goods_price = res.data.datas.brief.goods_price;
        this.goodsStatezj = res.data.datas.brief.goods_state_zj;
        if (parseInt(this.goodsStatezj) == 0) {
          this.videolist = res.data.datas.details
          this.allvideolist = this.videolist
          this.videosrc = this.videolist[0].video_address
          this.zjtext = this.videolist[0].courseware
          this.zjid = this.videolist[0].vo_id
          this.videoalltime = this.videolist[0].durations
          this.duration = this.videolist[0].duration
          this.audiolist = this.videolist.filter(item => item.gm == 1 || item.freession == 1)
        } else {
          this.chapterlist = res.data.datas.details.data
          this.videosrc = this.chapterlist[0].chapter_text[0].video_address
          this.zjtext = this.chapterlist[0].chapter_text[0].courseware
          this.zjid = this.chapterlist[0].chapter_text[0].vo_id
          this.playindex = this.chapterlist[0].chapter_text[0].vo_id
          this.allvideolist = res.data.datas.details.wu
         
          for (let iterator of this.chapterlist) {
            this.videolist = [...this.videolist, ...iterator.chapter_text]
          }
          this.videolist = [...this.videolist, ...this.allvideolist]
          this.audiolist = this.videolist.filter(item => item.gm == 1 || item.freession == 1)
        }


        
      }).catch(err => {
        if (err.message != "interrupt") {
          let errmsg = '请求失败';
          if (err.message.includes('timeout')) {
            errmsg = "请检查网络再刷新重试"
          }
          this.toast(errmsg);
        }
      });
    },
    list6() {
      if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        share_yp(this.keyval, this.classid, this.listdata.share_title, this.listdata.share_image, this.listdata.share_describes, this.url, this.present);
      }
    },
    recommend() {
      for (let i in this.videolist) {
        if (this.videolist[i].gm == 1) {
          this.remend = true;
        }
      }
    },
    scrollcheck() {
      this.$refs.scroll.enable();
    },
    orderpop(){
       this.ordershow=true
    },
    gomywallet(){
      this.$router.push({
        path: '/Mywallet'
    })
    },
    contactpop(){
      this.contactus=true
    }
  },
  mounted() {
    
    this.$nextTick(() => {
      this.$refs.scroll.refresh();
    });
  },
};