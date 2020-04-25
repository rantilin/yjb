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
          v-model="avtiveindex"
        >
          <van-tab v-for="item in vantab.list" :title="item" :key="item"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="indexpanelview">
      <cube-scroll
        class="indexpanels"
        ref="scroll"
        :scrollEvents="scrollEvents"
        @before-scroll-start="scrollnow"
      >
        <div class="swiper">
          <div class="swiper-container swiperbanner">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in  swiperlist" :key="index">
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
        <div class="contentdetailindexs" v-if="avtiveindex==0">
          <div class="classifytitle">
            <div class="classifyname">普通儿科</div>
            <div class="morebtn" @click="classbtn(listdata.ptrk[0].column_id,1,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swipererke">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.ptrk"
                  :key="index"
                  style="width:auto"
                >
                  <div class="swiperviewerke">
                    <Indexlayout
                      @click="govideo(item.goods_id,avtiveindex)"
                      :src="item.goods_image"
                      :title="item.goods_name"
                      :num="number(item.goods_click)+'人在看'"
                    >
                      <div
                        v-if="item.goods_price==0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#21C891"
                      >免费</div>
                      <div
                        v-if="item.goods_price!=0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#ff6633"
                      >￥{{item.goods_price}}</div>
                    </Indexlayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
          <div class="classifytitle">
            <div class="classifyname">大咖专栏</div>
            <div class="morebtn" @click="classbtn(listdata.dkzl[0].column_id,2,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="daka">
            <div class="dakaview" v-for="(item,index) in  listdata.dkzl" :key="index">
              <Indexlayout
                @click="govideo(item.goods_id,avtiveindex)"
                :src="item.goods_image"
                :title="item.goods_name"
                :num="number(item.goods_click)+'人在看'"
              >
                <div
                  v-if="item.goods_price==0"
                  slot="swiperprice"
                  class="swiperprice"
                  style="color:#21C891"
                >免费</div>
                <div
                  v-if="item.goods_price!=0"
                  slot="swiperprice"
                  class="swiperprice"
                  style="color:#ff6633"
                >￥{{item.goods_price}}</div>
              </Indexlayout>
            </div>
          </div>
          <!-- daka -->
        </div>
        <!-- contentdetailindexs -->
        <div class="contentdetailindex" v-if="avtiveindex==1">
          <div class="classifytitle">
            <div class="classifyname">成绩提升</div>
            <div class="morebtn" @click="classbtn(listdata.cjts[0].column_id,3,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swipergrade">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.cjts"
                  :key="index"
                  style="width:auto;margin-right: 12px;"
                >
                  <div class="swiperviewgrade">
                    <Indexlayout
                      @click="govideo(item.goods_id,avtiveindex)"
                      :src="item.goods_image"
                      :title="item.goods_name"
                      :num="number(item.goods_click)+'人在看'"
                    >
                      <div
                        v-if="item.goods_price==0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#21C891"
                      >免费</div>
                      <div
                        v-if="item.goods_price!=0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#ff6633"
                      >￥{{item.goods_price}}</div>
                    </Indexlayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
          <div class="classifytitle">
            <div class="classifyname">宝宝看看</div>
            <div class="morebtn" @click="classbtn(listdata.bbkk[0].column_id,4,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swiperbaby">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.bbkk"
                  :key="index"
                  style="width:auto;margin-right: 12px;"
                >
                  <div class="swiperviewbaby">
                    <Indexlayout
                      @click="govideo(item.goods_id)"
                      :src="item.goods_image"
                      :title="item.goods_name"
                      :num="number(item.goods_click)+'人在看'"
                    >
                      <div
                        v-if="item.goods_price==0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#21C891"
                      >免费</div>
                      <div
                        v-if="item.goods_price!=0"
                        slot="swiperprice"
                        class="swiperprice"
                        style="color:#ff6633"
                      >￥{{item.goods_price}}</div>
                    </Indexlayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
          <div class="classifytitle">
            <div class="classifyname">宝宝听听</div>
            <div class="morebtn" @click="audiobtn(listdata.bbtt[0].column_id)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swiperlisten">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.bbtt"
                  :key="index"
                  style="width:auto;margin-right: 12px;"
                >
                  <div class="swiperviewlisten" @click="goaudio(item.goods_id,avtiveindex)">
                    <van-image
                      class="swiperlistenimg"
                      fit="cover"
                      :src="item.goods_image"
                      radius="6px"
                    >
                      <div class="swiperlistenplay">
                        <div class="swiperlistenplayimg"></div>
                        <div class="swiperlistennum">{{number(item.goods_click)}}</div>
                      </div>
                      <div class="swiperlistenmengceng"></div>
                    </van-image>
                    <div class="swiperlistentitle">{{item.goods_name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
        </div>
        <!-- contentdetailindex -->
        <div class="contentdetailindexs" v-if="avtiveindex==2">
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
          <!-- theclass -->
        </div>
        <!-- contentdetailindexs -->
        <div class="contentdetailindex" v-if="avtiveindex==3">
          <div class="classifytitle">
            <div class="classifyname">健康公开课</div>
            <div class="morebtn" @click="classbtn(listdata.jkgkk[0].column_id,5,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swiperhealthopenclass">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.jkgkk"
                  :key="index"
                  style="width:auto;margin-right: 12px;"
                >
                  <div class="swiperviewhealthopenclass">
                    <Indexlayout
                      @click="govideo(item.goods_id,avtiveindex)"
                      :src="item.goods_image"
                      :title="item.goods_name"
                      :num="number(item.goods_click)+'人在看'"
                    ></Indexlayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
          <div class="classifytitle">
            <div class="classifyname">育儿公开课</div>
            <div class="morebtn" @click="classbtn(listdata.yegkk[0].column_id,6,avtiveindex)">
              <div class="moretext">查看更多</div>
              <div class="morearrows"></div>
            </div>
          </div>
          <!-- classifytitle -->
          <div class="commonswiper">
            <div class="swiper-container swiperbringopenclass">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in  listdata.yegkk"
                  :key="index"
                  style="width:auto;margin-right: 12px;"
                >
                  <div class="swiperviewhbringopenclass">
                    <Indexlayout
                      @click="govideo(item.goods_id,avtiveindex)"
                      :src="item.goods_image"
                      :title="item.goods_name"
                      :num="number(item.goods_click)+'人在看'"
                    ></Indexlayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- commonswiper -->
          <div class="fuli" v-if="listdata.byfl!=null">
            <div class="classifytitle">
              <div class="classifyname">本月福利</div>
            </div>
            <!-- classifytitle -->
            <div class="welfare" v-for="(item,index) in listdata.byfl" :key="index">
              <van-image
                class="welfareimg"
                fit="cover"
                :src="item.thumbnail"
                radius="6px"
                @click="welfare(item.id)"
              />
              <div class="welfaretext">{{item.atitle}}</div>
            </div>
            <!-- welfare -->
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
@import "../assets/scss/index.scss";
</style>
