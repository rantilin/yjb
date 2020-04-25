
<template>
  <div>
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{comname}}</div>
        <div class="delview">
          <cube-button class="del" @click="delbtn"></cube-button>
        </div>
      </div>
    </div>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" v-if="recordlist!=0" ref="scroll">
        <div class="titlestate" v-if="jt.length>0">今天</div>
        <ul class="comules" v-if="jt.length>0">
          <li
            class="comli"
            v-for="(item,index) in jt"
            :key="index"
            @click="goclass(item.room_id,item.room_state)"
          >
            <van-image class="compic" fit="cover" :src="item.goods_image" radius="12px" />
            <div class="comdetail">
              <div class="comname">{{item.goods_name}}</div>
              <div class="text">已学至{{item.centage}}%</div>
            </div>
          </li>
        </ul>
        <div class="titlestate" v-if="zt.length>0">昨天</div>
        <ul class="comules" v-if="zt.length>0">
          <li
            class="comli"
            v-for="(item,index) in zt"
            :key="index"
            @click="goclass(item.room_id,item.room_state)"
          >
            <van-image class="compic" fit="cover" :src="item.goods_image" radius="12px" />
            <div class="comdetail">
              <div class="comname">{{item.goods_name}}</div>
              <div class="text">已学至{{item.centage}}%</div>
            </div>
          </li>
        </ul>
        <div class="titlestate" v-if="gz.length>0">更早</div>
        <ul class="comules" v-if="gz.length>0">
          <li
            class="comli"
            v-for="(item,index) in gz"
            :key="index"
            @click="goclass(item.room_id,item.room_state)"
          >
            <van-image class="compic" fit="cover" :src="item.goods_image" radius="12px" />
            <div class="comdetail">
              <div class="comname">{{item.goods_name}}</div>
              <div class="text">已学至{{item.centage}}%</div>
            </div>
          </li>
        </ul>
      </cube-scroll>
      <div class="nocntetview" v-if="recordlist==0">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="nocontent" />
          </div>
          <div class="nocontenttext">暂无学习记录</div>
        </div>
      </div>
      <!-- nocntetview -->
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/learningrecord'></script>

<style lang="scss" scoped>
@import "../assets/scss/learningrecord.scss";
</style>