<template>
  <div>
    <div class="titletab">
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
          :ellipsis="false"
          v-model="avtiveindex"
        >
          <van-tab
            v-for="item in vantab.list"
            :title="item"
            :key="item"
          ></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="indexpanelview">
      <cube-scroll
        class="indexpanels"
        ref="scroll"
        :options="options"
        :scrollEvents="scrollEvents"
        @pulling-up="list5"
        @before-scroll-start="scrollnow"
      >
        <div class="swiper">
          <div class="swiper-container swiperbanner">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item,index) in  swiperlist"
                :key="index"
              >
                <van-image
                  class="swiperimg"
                  fit="cover"
                  :src="item.adv_pic"
                  radius="6px"
                  @click="gopage(item.adv_pic_url,avtiveindex)"
                />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="contentdetailindexs" v-if="avtiveindex==0 || avtiveindex==1 || avtiveindex==3">

          <classlist
            v-for="(item,index) in listdata"
            :key="index"
            :Classdata="item.data"
            :columnname="item.lm_name"
            :classnum="item.data.length"
            :avtiveindex="avtiveindex"
          ></classlist>
          <div v-if="avtiveindex==0 || avtiveindex==1 ">
            <recommend :recomdata="tjdata" :avtiveindex="avtiveindex" @tjmore="moreteb" :loding="tjispage"></recommend>
          </div>

        </div>
        <!-- contentdetailindexs -->
        <div
          class="contentdetailindex"
          v-if="avtiveindex==2"
        >
         <div class="classifytitle">
            <div class="classifyname">班级群</div>
          </div>
          <!-- classifytitle -->
          <div class="theclass">
            <div
              class="theclassview"
              v-for="(item,index) in  bjlist"
              :key="index"
              @click="group(item.goods_id,avtiveindex)"
            >
              <van-image class="theclassimg" fit="cover" :src="item.goods_image" radius="6px">
                <div class="stheclasstime">{{item.start}}-{{item.end}}</div>
              </van-image>
              <div class="theclasstitle">{{item.goods_name}}</div>
              <div class="theclassnum">
                <div
                  :class="[item.goods_price?'theclassprice':'theclassprices']"
                >￥{{item.goods_price}}</div>
                <div class="theclassnums">{{item.applicant}}人报名</div>
              </div>
            </div>
          </div>
        </div>
        <!-- contentdetailindex -->
      </cube-scroll>
    </div>
    <ComponentLoading v-if="loding" />
  </div>
</template>
<script src='../assets/js/index'></script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';
</style>
