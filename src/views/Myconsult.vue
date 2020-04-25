
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
        <cube-scroll class="videoclasspanels" ref="scroll1" v-if="myconsultq!=null">
          <ul class="consultlistul">
            <li
              class="consultlistli"
              v-for="(item,index) in myconsultq"
              :key="index"
              @click.stop="chat(item.qusert_id,item.class_order,item.order_state)"
            >
              <div class="listtitle">
                <div class="listtitlepic" v-if="item.class_order==3"></div>
                <div class="listtitlepics" v-if="item.class_order==4"></div>
                <span class="listtitlename" v-if="item.class_order==3">图文咨询</span>
                <span class="listtitlename" v-if="item.class_order==4">电话咨询</span>
                <div class="listtitleview">
                  <div class="listtitlemsg" v-if="item.class_order==3&&item.wd!=0">{{item.wd}}</div>
                  <cube-button class="listtitledel" @click.stop="dellist(item.order_id,1)"></cube-button>
                </div>
              </div>
              <div class="doctorview">
                <van-image
                  class="doctorpic"
                  fit="cover"
                  :src="item.expert_image"
                  radius="50%"
                  @click.stop="godoctor(item.expert_id)"
                />
                <div class="doctordetail">
                  <div class="doctorname">{{item.expert_name}}</div>
                  <div class="doctortime">{{item.order_time}}</div>
                </div>
              </div>
              <div class="question">{{item.description}}</div>
              <ul class="questionlistview" v-if="item.class_order==3&&item.images_list!=null">
                <li class="questionlist" v-for="(items,index) in item.images_list" :key="index">
                  <van-image class="doctorpics" fit="cover" :src="items" radius="13px" />
                </li>
              </ul>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="myconsultq==null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无提问</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="1==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll2" v-if="myconsultp!=null">
          <div class="audit">
            <div
              class="hotissue"
              v-for="(item,index) in myconsultp"
              :key="index"
              @touchstart="touch(item.order_id,2)"
              @touchend="cleartime()"
            >
              <div class="hotissueview">
                <div class="hotissuepic"></div>
                <div class="hotissuetext">{{item.description}}</div>
              </div>
              <div class="hotissuedoctor">
                <div class="hotissuedoctorview">
                  <van-image
                    class="hcvdoctorpic"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50%"
                  />
                  <cube-button
                    class="hcvdoctoranswer"
                    @click="examine(item.qusert_id)"
                  >精选问答{{questionsprice}}元查看</cube-button>
                </div>
                <div class="hotissuedoctordetail">
                  <span class="hcvdoctor">{{item.expert_name}}</span>
                  <span class="hcvaddress">{{item.expert_hospital}}</span>
                  <span class="hcvzhuzhidoctor">{{item.expert_title}}</span>
                </div>
              </div>
            </div>
            <!-- hotissue -->
          </div>
        </cube-scroll>
        <div class="nocntetview" v-if="myconsultp==null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无旁听</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>

<script src='../assets/js/myconsult'></script>

<style lang="scss" scoped>
@import "../assets/scss/myconsult.scss";
</style>