import Vue from 'vue';
import common from '@/assets/js/common'
import mywalletapi from "@/api/MywalletApi";
import { Popup } from 'vant';
Vue.use(Popup);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);

export default {
  name: 'mywallet',
  data() {
    return {
      key:this.$store.state.key.value,
      datalist: [],
      parsetotal: 0,
      generalizeprice: [],
      lately_price: 0,
      total_price: 0,
      notetext: '',
      xd_price: 0,
      imgcode: '',
      ispop: false,
      loding: true,
      options: {
        pullDownRefresh:false,
        pullUpLoad: {
          stop: 0,
          txt: {
            more: '努力刷新中~',
            noMore: '已经滑到底啦~'
          }
        }
      },
      pagecount: 5,
    }
  },
  created () {
    this.info()
  },
  methods: {
    back() {
      this.$router.push({
        name: 'mine',
      })
    },
    info(){
      this.getinfo()
      this.getgeneralize()
      this.getnotice()
    },
    gowithdraw() {
      this.$router.push({
        name: 'withdraw',
      })
    },
    getinfo() {
      mywalletapi.walist(this.key).then(res => {
        if(res.data.datas){
         this.datalist = res.data.datas.info
         this.parsetotal = res.data.datas.sum_price
        }else{
          this.datalist = []
          this.parsetotal = 0
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
    getgeneralize(){
      mywalletapi.constprice(this.key).then(res=>{
         this.lately_price = res.data.datas.lately_price
         this.total_price = res.data.datas.total_price
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
    getnotice(){
      mywalletapi.notice(this.key).then(res=>{
        this.notetext = res.data.datas.briefs
        this.xd_price = res.data.datas.xd_price
        this.imgcode = res.data.datas.case_image
        this.loding = false
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
    popdraw(){
      if(this.parsetotal > this.xd_price){
       if(this.ispop){
          this.ispop = false
       }else{
          let promotion_id =''
          for (const i in this.datalist) {
            promotion_id += this.datalist[i].id + ','
          }
         
           mywalletapi.postdeposit(this.key,promotion_id.substring(0, promotion_id.length-1),this.parsetotal).then(res=>{
                 if(res.data.datas == 1){
                    this.ispop = true
                    this.info()
                 }else{
                   this.toast(`网络错误`)
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
          
       }
      }else{
        this.toast(`金额必须大于${this.xd_price}元,才能提现`)
      }
    },
    onPullingUp(){
        if(this.pagecount < this.datalist.length){
         
          setTimeout(() => {
            this.$refs.scroll.forceUpdate(true);
           this.pagecount = this.pagecount + 5
           this.$refs.scroll.refresh()
          }, 1500);
        }else{
          this.$refs.scroll.refresh()
          this.$refs.scroll.forceUpdate();
        }
    }
  },
};