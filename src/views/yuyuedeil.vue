<template>
    <div class="vmyueyue">
               <div class="back" >
                   <div class="icon" @click="back"></div>
               </div>
               <div class="listvm">
                    <div class="title">费用
                      <span class="gray">(包含制档费)</span>
                    </div>
                    <div class="yellow">￥20</div>
               </div>
               <div class="listvm">
                    <div class="title">挂号医生</div>
                    <div class="bulue">徐文娜</div>
               </div>
               <div class="listvm" @click="clicktime">
                    <div class="title">预约时间</div>
                    <div class="datetime" v-if="!selcetime">请选择时间段></div>
                    <div class="datetime" v-else>{{selcetime}}</div>
               </div>
               <div class="listvm">
                    <div class="title">就诊人姓名</div>
                    <input v-model="vname" class="text" placeholder="请输入就诊人姓名"/>
               </div>
               <div class="listvm">
                    <div class="title">就诊人年龄</div>
                    <input v-model="vage" class="text" placeholder="请输入就诊人年龄"/>
               </div>
               <div class="listvm">
                    <div class="title">联系电话</div>
                    <input v-model="vphone" class="text" placeholder="请输入联系方式"/>
               </div>
               <div class="listwt">
                    <div class="title">问题描述</div>
                    <textarea v-model="zzms" class="contentzzms" placeholder="请描述就诊人详细问题及情况，方便进一步就诊"></textarea>
               </div>
               <div class="paybotun" @click="gopayvm">去支付</div>
               <van-popup v-model="istime" position="bottom" round>
               <div class="datetimevm">
                     <div class="title">请选择预约时间段</div>
                     <time-selector @selectTime="selectTime"></time-selector>
               </div>
               
                </van-popup>
         </div>
</template>
<script>
import Vue from 'vue';
import timeSelector from '@/components/datatime';
import {
  Popup,
  Field,
  Dialog
} from 'vant';

import yuyueapi from "@/api/yuyueapi";
Vue.use(Popup).use(Field).use(Dialog);
export default {
  components: {
    timeSelector
  },
   data() {
     return {
       key: this.$store.state.key.value,
       selcetime: '',
       vname: '',
       vage: '',
       vphone: '',
       zzms: '',
       istime: false
     }
   },
   methods:{
      back(){
        this.$router.go(-1);
      },
      clicktime() {
      if (this.istime) {
        this.istime = false
      } else {
        this.istime = true
      }
    },
    selectTime(val) {
      this.selcetime = val;
      this.istime = false
    },
    gopayvm() {
      if (this.vname.length < 1) {
        Dialog.alert({
          message: '名字不能为空',
        }).then(() => {
          // on close
        });
      }else if(this.vphone.length < 11) {
        Dialog.alert({
          message: '请填写正确的电话号码',
        }).then(() => {
          // on close
        });
      }else if(!this.selcetime) {
        Dialog.alert({
          message: '请选择时间',
        }).then(() => {
          // on close
        });
      }else{
        yuyueapi.yuyue(this.vname, this.vphone, this.vage, this.selcetime, this.zzms, 20, 1, this.key).then(res => {
          //window.location.href='http://m.yijiaobao.com.cn/wap/#/yuyuepay?pay_sn=' + res.data.datas.pay_sn
          this.$router.push({
            name: 'yuyuepay',
            query: {
              pay_sn: res.data.datas.pay_sn
            }
          })
        })
      }
    },
   }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/yuyue.scss';
</style>