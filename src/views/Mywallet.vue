<template>
    <div class="content">
      <div class="topback">
      <div class="commonbackpic" @click="back"></div>
      <div class="commontitlename" @click="gowithdraw">提现记录</div>
    </div>
       <div class="warn">
          <div class="pricetile">可提现金额(元)</div>
          <div class="price">864.00</div>
          <div class="warncow">
             <div class="item">
               <p class="p1">推广总收入</p>
               <p class="p2">￥360.00</p>
             </div>
             <div class="item">
               <p class="p1">近一月收入</p>
               <p class="p2">￥504.00</p>
             </div>
          </div>
       </div>
       <div class="warntext">
         金额达到8元后可以提现，提现成功后，3个工作日内返还到微信钱包
       </div>
       <div class="lesson">
          <div class="ltext">
             <div class="title">增高课程</div>
             <div class="tgjx">
               <span>推广奖金</span>
               <span class="time">2020-05-20</span>
             </div>
          </div>
          <div class="rprice">+10</div>
       </div>
       <div class="lesson">
          <div class="ltext">
             <div class="title">增高课程</div>
             <div class="tgjx">
               <span>推广奖金</span>
               <span class="time">2020-05-20</span>
             </div>
          </div>
          <div class="rprice">+10</div>
       </div>
       <div class="withdraw">
         <div class="buttom">提现</div>
       </div>
    </div>
</template>
<script src='../assets/js/mywallet'></script>
<style lang="scss" scoped>
@import "../assets/scss/mywallet.scss";
</style>