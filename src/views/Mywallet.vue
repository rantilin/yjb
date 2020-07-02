<template>
  <div class="content">
    <div class="topback">
      <div
        class="commonbackpic"
        @click="back"
      ></div>
      <div
        class="commontitlename"
        @click="gowithdraw"
      >提现记录</div>
    </div>
    <cube-scroll
        class="classpanels"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
    <div class="warn">
      <div class="pricetile">可提现金额(元)</div>
      <div class="price">{{parsetotal.toFixed(2)}}</div>
      <div class="warncow">
        <div class="item">
          <p class="p1">推广总收入</p>
          <p class="p2">￥{{total_price.toFixed(2)}}</p>
        </div>
        <div class="item">
          <p class="p1">近一月收入</p>
          <p class="p2">￥{{lately_price.toFixed(2)}}</p>
        </div>
      </div>
    </div>
    <div class="warntext">
      {{notetext}}
    </div>
    <div v-if="datalist.length>0">
    <div
      v-for="(item,index) in datalist"
      :key="index" 
    >
    <template v-if="index < pagecount">
      <div class="lesson">
      <div class="ltext">
        <div class="title">{{item.tg_name}}-{{item.tg_type_name}}</div>
        <div class="tgjx">
          <span>推广奖金</span>
          <span class="time">{{item.create_time}}</span>
        </div>
      </div>
      <div class="rprice">+{{item.tg_state}}</div>
      </div>
      </template>
    </div>
   </div>
   <div class="offlesson" v-else>
        暂无提现项目
   </div>
    </cube-scroll>
    <div class="withdraw">
      <div
        class="buttom"
        @click="popdraw"
      >提现</div>
    </div>
   
    <van-popup v-model="ispop">
      <div class="wxpop">
        <div class="wxewm">
          <img
            :src="imgcode"
          >
        </div>
        <div class="wxtext">
          <p>长按识别二维码</p>
          <p>添加小助理即可完成提现申请啦~</p>
        </div>
      </div>
    </van-popup>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/mywallet'></script>
<style lang="scss" scoped>
@import '../assets/scss/mywallet.scss';
</style>