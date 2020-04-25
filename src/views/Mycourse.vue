
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="optionbar">
          <div class="vanttab">
        <van-tabs
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
      <!-- vanttab -->
    </div>
    <!-- optionbar -->
    <div class="videoclasspanelview">
      <div class="paneview" v-show="0==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll1" v-if="videolist!=null">
          <ul class="comul">
            <li
              class="comli"
              v-for="(item,index) in videolist"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
              @click="goclass(item.goods_id)"
            >
              <div
                class="compic"
                :style="{background:'url('+item.goods_image+') center /cover no-repeat'}"
              >
                <div class="complay"></div>
                <div class="duration">
                  <div class="spshichang">{{item.sc_unm}}</div>
                </div>
              </div>
              <div class="comdetail">
                <div class="comname">{{item.goods_name}}</div>
              </div>
            </li>
          </ul>
          <!-- comul -->
        </cube-scroll>
        <div class="nocntetview" v-if="videolist==null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无视频课程</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="1==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll2" v-if="audiolist!=null">
          <ul class="comuls">
            <li
              class="comli"
              v-for="(item,index) in audiolist"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
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
              </div>
            </li>
          </ul>
          <!-- comul -->
        </cube-scroll>
        <div class="nocntetview" v-if="audiolist==null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无音频课程</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/mycourse'></script>

<style lang="scss" scoped>
@import "../assets/scss/mycourse.scss";
</style>