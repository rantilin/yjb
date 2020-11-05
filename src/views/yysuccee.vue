<template>
  <div class="content">
    <div class="back" >
        <div class="icon" @click="back"></div>
        </div>
    <div class="iconsuccee"></div>
    <div class="yytext">预约成功</div>
    <div class="pagecontent">
        <div class="list">
          <div class="title">就诊人姓名：</div>
          <div>{{vmdata.buyer_name}}</div>
        </div>
        <div class="list">
          <div class="title">预约时间：</div>
          <div>{{vmdata.member_yuyue}}</div>
        </div>
        <div class="qrlist">
          <img src="http://m.yijiaobao.com.cn/data/upload/shop/waybill/jianq.jpg" class="qrcore" alt="" >
        </div>
      
        <div class="listlast">请截图保存此页面，到微信扫码添加医助微信 我们会为您安排与医生的线上问诊</div>
    </div>
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
       vmdata:{},
     }
   },
   created () {
      this.indate();
   },
   methods:{
     back(){
       this.$router.go(-1);
     },
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
     
   }
}
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
.iconsuccee{
    margin: 88px auto 10px auto;
    width: 60px;
    height: 60px;
    background: url('../assets/image/yyicon.png');
    background-size: 100% 100%;
}
.yytext{
    font-size: 24px;
    color: #3398FF;
    text-align: center;
    line-height: 60px;
}
.pagecontent{
   width: 100%;
   margin-top: 40px;
   box-sizing: border-box;
   padding: 0 40px;
   .list{
       width: 100%;
       display: flex;
       justify-content: space-between;
       color: #333333;
       font-size: 14px;
       line-height: 30px;
       .title{
            font-weight: bold;
       }
   }
   
   .listlast{
     font-size: 13px;
     color: #666666;
     margin: 20px auto;
     text-align: center;
     line-height: 20px;
   }
   .qrlist{
     width: 124px;
     height: 124px;
     margin: 20px auto;
   }
   .qrcore{
     width: 124px;
     height: 124px;
   }
}
</style>