<template>
  <div class="content">
     <div class="topback">
      <div class="commonbackpic" @click="back"></div>
    </div>
    <div class="lesson">
          <div class="ltext">
             <div class="title">提现</div>
             <div class="tgjx">
              2020-05-20
             </div>
          </div>
          <div class="rprice">-10</div>
       </div>
       <div class="lesson">
          <div class="ltext">
             <div class="title">提现</div>
             <div class="tgjx">
              2020-05-20
             </div>
          </div>
          <div class="rprice">-10</div>
       </div>
       
  </div>
</template>
<script src='../assets/js/withdraw'></script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  background: #fff;
}
.topback {
  width: 100%;
  height: 60px;
  display: flex;
  background: #fff;
  align-items: center;
  position: relative;
  .commonbackpic {
    width: 24px;
    height: 24px;
    background: url('../assets/image/back.png');
    background-size: 100% 100%;
    margin: 0 0 0 16px;
    z-index: 99;
  }
  .commontitlename {
    padding: 20px 16px 0 0;
    width: 100%;
    font-size: 14px;
    color: #666666;
    text-align: right;
    text-indent: 16px;
  }
}
.lesson{
   width: 323px;
   margin: 12px auto;
   display: flex;
   flex-direction: row;
   .ltext{
     width: 90%;
     .title{
       font-size: 16px;
       color: #333333;
       font-weight: bold;
       line-height: 24px;
     }
     .tgjx{
        font-size: 13px;
        color: #999999;
        line-height: 30px;
     }   
   }
   .rprice{
     width: 39px;
     color: #FF6633;
     font-size: 24px;
     font-weight: bold;
     text-align: right;
     align-self:center;
   }
}
</style>