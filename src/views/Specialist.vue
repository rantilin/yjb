<template>
  <div>
    <div class="yjbtitle">问专家</div>
    <div class="jianbian"></div>

    <div class="specialistpanelview">
      <cube-scroll class="specialistpanels" ref="scroll">
        <div class="noticeview" v-if="noticetext">
          <div class="trumpet"></div>
          <div class="notice">
            <van-notice-bar color="#D92121" background="transparent">{{noticetext.briefs}}</van-notice-bar>
          </div>
        </div>
        <!-- columnview -->
        <div class="report_consult">
          <div class="report" @click="consulttext">
            <div class="reporttitle">报告解读</div>
            <div class="pipei">30秒快速</div>
            <div class="doctor">匹配对症医生</div>
          </div>
          <div class="report" @click="consultphone">
            <div class="reporttitle">电话咨询</div>
            <div class="pipei">专家主动致电</div>
            <div class="doctor">15分钟VIP服务</div>
          </div>
        </div>
        <!-- report_consult -->
        <div :class="[column.length>3?'columnviews':'columnview']">
          <div
            :class="[column.length>3?'columns':'column']"
            v-for="(item,index) in column"
            :key="index"
            @click="columnbtn(item.id,item.columnm)"
          >
            <div class="columnpicview">
              <van-image class="columnpic" fit="cover" :src="item.expert_image" radius="12px" />
            </div>
            <div class="columntext">{{item.columnm}}</div>
          </div>
        </div>
        <!-- columnview -->
        <div class="doctorlist">
          <cube-scroll
            :data="expertlist"
            direction="horizontal"
            class="horizontal-scroll-list-wrap"
            ref="scrolls"
          >
            <ul class="doctorlistview">
              <li v-for="(item,index) in expertlist" :key="index">
                <a :href="'/#/doctor?id='+item.id+''">
                  <van-image class="doctorpic" fit="cover" :src="item.expert_image" radius="50%" />
                  <div class="doctorname">{{item.expert_name}}</div>
                  <div class="doctordetail">
                    <div class="zhuzhi">{{item.expert_title}}</div>
                    <div class="doctorstar"></div>
                    <span class="pingfen">{{item.expert_score}}</span>
                  </div>
                  <div class="hospital_address">{{item.expert_hospital}}</div>
                </a>
              </li>
            </ul>
          </cube-scroll>
        </div>
        <!-- doctorlist -->
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

        <div class="contents">
          <div class="bgcontent" v-show="0==currentTab">
            <div class="issuelist">
              <ul>
                <li
                  v-for="(item,index) in diseaselist"
                  :key="index"
                  :class="[currentTabs==index?'checker_item_active':'checker_item']"
                  :data-current="index"
                  :data-id="item.id"
                  @click="switchNavs($event)"
                >{{item.columnm}}</li>
              </ul>
            </div>
            <!-- issuelist -->
            <div class="smcontent" v-if="diseaselistinfo!=null">
              <div
                class="specialistview"
                @click="godoctor(item.id)"
                v-for="(item,index) in diseaselistinfo"
                :key="index"
              >
                <div class="specialistviewuser">
                  <van-image
                    class="specialistpic"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50%"
                  />
                  <div class="specialistdetail">
                    <div class="specialisttit">
                      <span class="spename">{{item.expert_name}}</span>
                      <span class="attending_doctor">{{item.expert_title}}</span>
                      <div class="sperightstar">
                        <div class="spestars"></div>
                        <span>{{item.expert_score}}</span>
                      </div>
                    </div>
                    <div class="speaddress">
                      {{item.expert_hospital}}
                      <span>{{item.hd}}个回答</span>
                    </div>
                  </div>
                </div>
                <!-- specialistviewuser -->
                <div class="begoodat">擅长：{{item.expert_miaoshu}}</div>
                <div class="solve">
                  <div class="solvetextview" v-if="item.expert_tw==1">
                    <div class="solvetextpic"></div>
                    <div class="solvetext">图文￥{{item.tw_price}}</div>
                  </div>
                  <div class="solvetextview" v-if="item.expert_dh==1">
                    <div class="solvetextpics"></div>
                    <div class="solvetext">电话￥{{item.dh_price}}</div>
                  </div>
                  <cube-button
                    class="askdoctor"
                    @click.stop="askdoctor(item.tw_price,item.dh_price,item.expert_tw,item.expert_dh,item.id)"
                  >问医生</cube-button>
                </div>
              </div>
              <!-- specialistview -->
              <div class="morebtnview">
                <cube-button class="morebtn" @click="morebtn" :disabled="disableds">
                  <div>
                    <div class="morebtntext">{{morebtntext}}</div>
                    <div class="morebtnpic"></div>
                  </div>
                </cube-button>
              </div>
              <!-- morebtnview -->
            </div>
            <!-- smcontent -->
            <div class="nocntetview" v-if="diseaselistinfo==null">
              <div class="nocontent">
                <div class="nocontentpicview">
                  <van-image class="nocontentpic" fit="cover" :src="nocontent" />
                </div>
                <div class="nocontenttext">该栏目暂无内容</div>
              </div>
            </div>
            <!-- nocntetview -->
          </div>
          <!-- bgcontent -->
          <div class="bgcontent" v-show="1==currentTab">
            <div class="issuelist">
              <ul>
                <li
                  v-for="(item,index) in diseaselist"
                  :key="index"
                  :class="[currentTabes==index?'checker_item_active':'checker_item']"
                  :data-current="index"
                  :data-id="item.id"
                  @click="switchNaves($event)"
                >{{item.columnm}}</li>
              </ul>
            </div>
            <!-- issuelist -->
            <div class="smcontent" v-if="rmqusertlist!=null">
              <div class="hotissue" v-for="(item,index) in rmqusertlist" :key="index">
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
                      @click="godoctor(item.expert_id)"
                    />
                    <cube-button
                      class="hcvdoctoranswer"
                      @click="examine(item.id)"
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
              <div class="morebtnview">
                <cube-button class="morebtn" @click="morebtns" :disabled="disabledss">
                  <div>
                    <div class="morebtntext">{{morebtntexts}}</div>
                    <div class="morebtnpic"></div>
                  </div>
                </cube-button>
              </div>
              <!-- morebtnview -->
            </div>
            <!-- smcontent -->
            <div class="nocntetview" v-if="rmqusertlist==null">
              <div class="nocontent">
                <div class="nocontentpicview">
                  <van-image class="nocontentpic" fit="cover" :src="nocontent" />
                </div>
                <div class="nocontenttext">该栏目暂无内容</div>
              </div>
            </div>
            <!-- nocntetview -->
          </div>
        </div>
        <!-- bgcontent -->
      </cube-scroll>
    </div>
    <van-action-sheet v-model="show">
      <div class="modelmengceng">
        <div class="close">
          <div class="closepic" @click="close"></div>
        </div>
        <div class="changeconsule">选择咨询方式</div>
        <div class="consultway" @click="consultway(3)" v-if="twkq==1">
          <div class="consultpic"></div>
          <div class="consultdetail">
            <div class="consulttext">图文咨询</div>
            <div class="consultprice">￥{{tw}}</div>
            <div class="consultcontent">通过文字、图片向医生提问，含三次免费追问机会适合常见病及健康类问题咨询</div>
          </div>
          <div class="arrowview">
            <div class="arrow"></div>
          </div>
        </div>
        <div class="consultway" @click="consultway(4)" v-if="dhkq==1">
          <div class="consultpics"></div>
          <div class="consultdetail">
            <div class="consulttext">电话咨询</div>
            <div class="consultprice">￥{{dh}}</div>
            <div class="consultcontent">专家主动致电，15分钟VIP服务，适合复杂病情的咨询，和医生充分沟通</div>
          </div>
          <div class="arrowview">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <component-loading v-if="loding" />
  </div>
</template>

<script src='../assets/js/specialist'></script>
<style lang="scss" scoped>
@import "../assets/scss/specialist.scss";
</style>
