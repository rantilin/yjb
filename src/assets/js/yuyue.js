import Vue from 'vue';
import {
  Popup,
  Field,
  Dialog
} from 'vant';
Vue.use(Popup).use(Field).use(Dialog);
import {
  share_yp
} from './share';
export default {
  
  data() {
    return {
      key: this.$store.state.key.value,
      options: {
        pullDownRefresh: false,
        pullUpLoad: {
          stop: 0,
          txt: {
            more: '努力刷新中~',
            noMore: '已经滑到底啦~'
          }
        }
      },
      bgcolor: {
        background: '#fff',
      },
      isbottom: false,
      istime: false,
      ismoretext: false,
      keyval: 1,
      indexlogo: 'http://m.yijiaobao.com.cn/data/upload/shop/waybill/fengx.png',
      titlename: "徐文娜-门诊主任-成都中童儿童康复医院-线上问诊预约挂号",
      desc: "专家擅长自闭谱系障碍，智力发育障碍，注意力缺陷多动障碍，发育性语言障碍，发育性学习障碍，大运动发育迟缓，脑瘫，发育性运动共济障碍等的评估和诊断，制定个体化康复治疗方案及督导康复干预。~",
      url: process.env.VUE_APP_SERVICE_URLS,
      present: process.env.VUE_APP_SERVICE_URLS + "#/yuyue",
    }
  },
  created() {
    document.title='成都中童儿童康复医院-线上问诊预约挂号';
    if (!this.key) {
      this.$router.push({
        path: '/login',
        query: {
          back: true
        }
      })
    }
    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
      share_yp(this.keyval, null, this.titlename, this.indexlogo, this.desc, this.url, this.present);
    }
  },
 
  methods: {
    scrollcheck() {

    },
    more(){
       if(this.ismoretext){
        this.ismoretext=false;
       }else{
        this.ismoretext=true;
       }
    },
    yuyuepup() {
       this.$router.push({
         name:'yuyuedeil'
       })
    },
    back() {
      this.isbottom = false
    },
    videostop(val){
      switch (val) {
        case 1:
          console.log(val)
          document.getElementById('myVideo2').pause()
          break;
        case 2:
          document.getElementById('myVideo1').pause()
            break;
        default:
          break;
      }
    }

  },
};