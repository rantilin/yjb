<template>
  <div class="content">
      <div class="back" >
        <div class="icon" @click="back"></div>
        </div>
       <div class="expense">
            <div class="title">费用<span class="zkprice">（包含制档费）</span></div>
            <div class="price">{{vmdata.order_amount}}</div>
       </div>
       <div class="paystext">支付方式</div>
       <div class="pushchange">
            <cube-button class="pushchanges" data-current="1" @click="switchNav($event)">
              <div class="paypic"></div>
              <div class="paytext">微信支付</div>
              <div :class="[payway==1?'changestyle-active':'changestyle']"></div>
            </cube-button>
            <cube-button class="pushchanges" data-current="2" @click="switchNav($event)">
              <div class="paypics"></div>
              <div class="paytext">支付宝支付</div>
              <div :class="[payway==2?'changestyle-active':'changestyle']"></div>
            </cube-button>
            
          </div>
        <div class="paybotun" @click="gobuy">立即支付</div>
  </div>
</template>
<script>
import Vue from 'vue';
import yuyueapi from "@/api/yuyueapi";
import yuyuepay from "@/assets/js/yuyuepay";
export default {
  
  data() {
    return {
      pay_sn: this.$route.query.pay_sn,
      key: this.$store.state.key.value,
      payway: '1', //1代表微信，2代表支付宝 3代表卡密支付
      vmdata:{},
    }
  },
  created () {
    if(this.key){
       this.indate();
    }else{
      this.$router.go(-1);
    }
  },
  methods:{
      indate(){
         yuyueapi.order(this.pay_sn,this.key).then(res=>{
                this.vmdata = res.data.datas;
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
      back(){
         this.$router.go(-1);
      },
      switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (this.payway == cur) {
                return false;
            } else {
                this.payway = cur;
            }
      },
      gobuy(){
          switch (this.payway) {
                case '1':
                    // 在微信里面
                    yuyuepay.wxpay(this.key, this.pay_sn, '中童挂号', 20, 0, 'yjbgh');
                    break;
                case '2':
                     yuyuepay.zfb(this.key, this.pay_sn, '中童挂号', 20, 0, 'yjbgh');
                    break;
                case '3':

                    break;
                default:
                    console.log(123);
            }
      }
  }
};
</script>
<style lang="scss" scoped>

.content{
  width: 100%;
  height: 100vh;
  background: #fff;
  box-sizing: border-box;
  padding: 0 16px;
}
  .back{
     width: 100%;
     height: 44px;
     display: flex;
     align-items: center;
     .icon{
      width: 24px;
      height: 24px;
      background: url('../assets/image/back.png');
      background-size: 100% 100%;
      margin: 0 0 0 0;
      z-index: 99;
     }
   }
   .expense{
       width: 100%;
       box-sizing: border-box;
       padding: 0 8px;
       margin-top: 30px;
       .title{
           color: #333333;
           font-size: 14px;
           font-weight: bold;
           .zkprice{
             color: #666666;
             font-size: 13px;
           }
       }
       .price{
          margin-top: 10px;
          color: #FFAD34;
          font-size: 30px;
          font-weight: bold;
          line-height: 50px;
          border-bottom: #D8D8D8 solid 1px;
       }
   }
.paystext{
   margin: 100px auto 10px auto;
   font-size: 14px;
   color: #333333;
   font-weight: bold;
   text-indent: 10px;
}
.pushchange {
    width: 95%;
    margin: auto;
    box-sizing: border-box;
    .pushchanges {
        padding: 0;
        background-color: transparent;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .paypic {
            width: 30px;
            height: 30px;
            background: url("../assets/image/wx.png");
            background-size: 100% 100%;
        }
        .paypics {
            width: 30px;
            height: 30px;
            background: url("../assets/image/zfb.png");
            background-size: 100% 100%;
        }
        .paykami {
            width: 30px;
            height: 30px;
            background: url("../assets/image/kami.png");
            background-size: 100% 100%;
        }
        .paytext {
            margin-left: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #333333;
        }
        .changestyle {
            margin-left: auto;
            border-radius: 50%;
            border: 1px solid #979797;
            width: 21px;
            height: 21px;
        }
        .changestyle-active {
            margin-left: auto;
            border-radius: 50%;
            width: 21px;
            height: 21px;
            background: url("../assets/image/pitchon.png");
            background-size: 100% 100%;
            animation: scale 0.3s;
        }
    }
}
.paybotun{
  width: 343px;
  font-size: 16px;
  color: #fff;
  line-height: 45px;
  background: #3398FF;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  margin: 140px auto 0 auto;
}
</style>