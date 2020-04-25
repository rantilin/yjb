

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
        <cube-scroll class="videoclasspanels" ref="scroll1" v-if="videolist.length>0">
          <ul class="comul">
            <li
              class="comli"
              v-for="(item,index) in videolist"
              :key="index"
              @touchstart="touch(item.id)"
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
                <div class="num">
                  <div
                    class="price"
                    v-if="item.goods_promotion_price>0"
                  >￥{{item.goods_promotion_price}}</div>
                  <div class="pricemianfei" v-else>限时免费</div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="videolist.length==0">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无视频</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="1==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll2" v-if="audiolist.length > 0">
          <ul class="comuls">
            <li
              class="comli"
              v-for="(item,index) in audiolist"
              :key="index"
              @touchstart="touch(item.id)"
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
                <div class="num">
                  <div class="price">￥{{item.goods_promotion_price}}</div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="audiolist.length == 0">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无音频</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <!-- <div class="paneview" v-show="2==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll3" v-if="this.wzlist!= null">
          <ul class="comules">
            <li
              class="comli"
              v-for="(item,index) in wzlist"
              :key="index"
              @touchstart.prevent="touchs(item.id)"
              @touchend.prevent="cleartimes()"
              @click="gowenzhang(item.wledge_id)"
            >
              <div
                class="compic"
                :style="{background:'url('+item.thumbnail+') center /cover no-repeat'}"
              ></div>
              <div class="comdetail">
                <div class="comname">{{item.atitle}}</div>
                <div class="text">{{item.abstract}}</div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="this.wzlist== null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无文章</div>
          </div>
        </div>
      </div> -->
    </div>
    <component-loading v-if="loding" />
  </div>
</template>

<script src='../assets/js/mycollect'></script>

<style lang="scss" scoped>
@import "../assets/scss/mycollect.scss";
</style>