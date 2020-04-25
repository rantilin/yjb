
<template>
  <div>
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{comname}}</div>
      </div>
    </div>
    <div class="yabess">
      <div class="vanttab">
        <van-tabs
          v-model="active"
          animated
          :color="vantab.color"
          :background="vantab.background"
          :line-width="vantab.linewidth"
          :line-height="vantab.lineheight"
          :title-active-color="vantab.activecolor"
          :title-inactive-color="vantab.defaultcolor"
          :swipe-threshold="vantab.swipethreshold"
          :border="vantab.border"
          :swipeable="vantab.swipeable"
          @click="pitchtab"
        >
          <van-tab v-for="item in vantab.list" :title="item" :key="item"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="babytopanelview">
      <cube-scroll
        class="babytopanels"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
        v-if="yplist!=null"
      >
        <ul class="comul">
          <li
            class="comli"
            v-for="(item,index) in yplist"
            :key="index"
            @click="goaudio(item.goods_id)"
          >
            <div
              class="compic"
              :style="{background:'url('+item.goods_image+') center /cover no-repeat'}"
            >
              <div class="duration">
                <div class="headset"></div>
                <div class="shuliang">{{item.sc_unm}}</div>
              </div>
            </div>
            <div class="comdetail">
              <div class="comname">{{item.goods_name}}</div>
              <div class="num">
                <div class="listen">{{item.goods_click}}人在听</div>
              </div>
            </div>
          </li>
        </ul>
        <!-- comul -->
      </cube-scroll>
      <div class="nocntetview" v-if="yplist==null">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="nocontent" />
          </div>
          <div class="nocontenttext">此栏目下暂无音频</div>
        </div>
      </div>
      <!-- nocntetview -->
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/babyto'></script>
<style lang="scss" scoped>
@import "../assets/scss/babyto.scss";
</style>