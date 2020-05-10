
<template>
  <div>
    <div class="weweimatu">
      <img class="erweima" :src="erweimapic" />
    </div>
    <component-head :comname="comname"></component-head>
    <div class="babytopanelview">
      <div class="titleview">
        <van-image class="qlpic" fit="cover" :src="case_image" radius="12px" />
        <div class="qldetail">
          <div class="qlbt">{{columnm}}</div>
          <div class="qlnum">
            (已入群
            <span>{{remarks}}</span>人)
          </div>
        </div>
      </div>
      <div class="yabesses">
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
      <ul class="lanmulist">
        <li v-for="(item,index) in infolist" :key="index" v-show="index==currentTab">
          <div class="zijilist">
            <cube-scroll
              ref="scroll"
              :data="xia_list"
              direction="horizontal"
              class="horizontal-scroll-list-wrap zjdetails"
            >
              <div class="zjdetailes">
                <swiper :options="swiperOption" >
                  <swiper-slide
                   class="swiper-slide"
                      v-for="(items,indexs) in xia_list"
                      :key="indexs"
                      :name="indexs"
                      @click.native="listbtn(indexs)"
                      :class="[indexs==currentTabs?'zjdetail-active':'zjdetail']"
                  >
                  {{items.gc_name}}
                  </swiper-slide>
                </swiper>
             
              </div>
            </cube-scroll>
          </div>
        </li>
      </ul>
      <div class="erweimatext">长按扫码入群学习！</div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/crowd'></script>
<style lang="scss" scoped>
@import '../assets/scss/crowd.scss';
</style>