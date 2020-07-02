import Vue from 'vue';
import common from '@/assets/js/common'
import mywalletapi from "@/api/MywalletApi";
import {
  Popup
} from 'vant';
Vue.use(Popup);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);

export default {
  data() {
    return {
      key: this.$store.state.key.value,
      datalist: [],
      loding: true
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    back() {
      this.$router.push({
        name: 'mywallet',
      })
    },
    getlist() {
      mywalletapi.deposit(this.key).then(res => {
         this.datalist = res.data.datas
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
    }
  },
};