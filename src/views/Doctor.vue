
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll
        class="videoclasspanels"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <div class="doctorpage">
          <div class="doctorbg"></div>
          <div class="doctorviews">
            <div class="doctorview">
              <van-image class="doctorpic" fit="cover" :src="expert_image" radius="50%" />
              <div class="doctordetail">
                <div class="doctorname">{{expert_name}}</div>
                <div class="doctorzhuzhi">{{expert_title}}</div>
                <div class="doctorstar">
                  <div class="starpic"></div>
                  <span>{{expert_score}}</span>
                </div>
              </div>
              <div class="doctoradd">
                <div class="doctoraddress">{{expert_hospital}}</div>
                <div class="jiezhen">
                  <span class="text">接诊</span>
                  <span class="num">{{expert_sum}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- doctorviews -->
          <div class="doctorcontent">
            <div class="doctortitle">咨询服务</div>
            <p class="jiezhensc">正常工作日(3小时内接诊) 非工作时间(24小时内接诊)</p>
            <ul class="zixun">
              <li @click="consultway(3)" v-if="expert_tw==1">
                <div class="zixunpic"></div>
                <div class="zixundetail">
                  <div class="zixunname">图文咨询</div>
                  <div class="zixuntext">3小时内回复超时退款可追问3次</div>
                </div>
                <div class="zixunprice">￥{{tw_price}}</div>
              </li>
              <li @click="consultway(4)" v-if="expert_dh==1">
                <div class="zixunpics"></div>
                <div class="zixundetail">
                  <div class="zixunname">电话咨询</div>
                  <div class="zixuntext">3小时内回复超时退款可追问3次</div>
                </div>
                <div class="zixunprice">￥{{dh_price}}</div>
              </li>
            </ul>
            <div class="doctortitles" v-if="expert_brief!=''">
              <div class="zjjieanjie">专家简介</div>
              <div class="zhankaiview" @click="showmoreDesc()" v-if="isShowMore">
                <div class="zhankai">{{zhankaitext}}</div>
                <div :class="zhuangtai?'zhankaipiz':'zhankaipis'"></div>
              </div>
            </div>
            <!-- <div class="jianjie" v-if="expert_brief!=''">{{expert_brief}}</div> -->
            <div
              class="jianjie"
              :class="zhuangtai?'overflow-line':''"
              v-if="expert_brief!=''"
            >{{expert_brief}}</div>
            <div class="doctortitle" v-if="expert_goods!=''">专家擅长</div>
            <div class="jianjie" v-if="expert_goods!=''">{{expert_goods}}</div>
            <div class="doctoranswer">
              <div class="doctortitle">Ta的回答</div>
              <div class="hotissues" v-if="problem!=null">
                <div class="hotissue" v-for="(item,index) in problem" :key="index">
                  <div class="hotissueview">
                    <div class="hotissuepic"></div>
                    <div class="hotissuetext">{{item.description}}</div>
                  </div>
                  <div class="hotissuedoctor">
                    <div class="hotissuedoctorview">
                      <van-image class="hcvdoctorpic" fit="cover" :src="expert_image" radius="50%" />
                      <cube-button
                        class="hcvdoctoranswer"
                        @click="examine(item.qusert_id)"
                      >精选问答{{questionsprice}}元查看</cube-button>
                    </div>
                    <div class="hotissuedoctordetail">
                      <span class="hcvdoctor">{{expert_name}}</span>
                      <span class="hcvaddress">{{expert_hospital}}</span>
                      <span class="hcvzhuzhidoctor">{{expert_title}}</span>
                    </div>
                  </div>
                </div>
                <!-- hotissue -->
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
              <div class="nocntetview" v-if="problem==null">
                <div class="nocontent">
                  <div class="nocontentpicview">
                    <van-image class="nocontentpic" fit="cover" :src="nocontent" />
                  </div>
                  <div class="nocontenttext">该专家暂无回答</div>
                </div>
              </div>
              <!-- nocntetview -->
            </div>
            <!-- doctoranswer -->
            <div class="yonghpl">
              <div class="yhpltitle">用户评论</div>
              <ul class="commentul" v-if="msglists!=null">
                <li v-for="(item,index) in msglists" :key="index" style="border-bottom:1px solid #EBEFF5;">
                  <div class="cometntdiv" v-if="index<morenumpl">
                    <div class="user">
                      <van-image class="pices" fit="cover" :src="item.member_avatar" radius="50%" />
                      <div class="nameview">
                        <div class="name">{{item.member_name}}</div>
                        <div class="time">{{item.comment_addtime}}</div>
                      </div>
                      
                    </div>
                    <div class="text" style="margin-left:20px">{{item.comment_content}}</div>

                    <div v-for="(item1,index2) in item.huifu" :key="index2">
                          <div class="user" style="margin-left:20px;margin-top:20px;">
                            <van-image class="pices" fit="cover" :src="item1.jk_image" radius="50%" />
                            <div class="nameview">
                              <div class="name" style="display:flex"><div>{{item1.comment_memberid}}</div><div v-if="item1.comment_memberid=='大童师兄'" class="biaoqian">官方</div></div>
                              <div class="time">{{item1.comment_addtime}}</div>
                            </div>
                          </div>
                          <div class="text"  style="margin-left:20px;padding-bottom:10px">{{item1.comment_content}}</div>
                      </div>
                  </div>
                </li>
              </ul>
              <div class="nocntetview" v-if="msglists==null">
                <div class="nocontent">
                  <div class="nocontentpicview">
                    <van-image class="nocontentpic" fit="cover" :src="nocontent" />
                  </div>
                  <div class="nocontenttext">暂无评论</div>
                </div>
              </div>
              <!-- nocntetview -->
            </div>
          </div>
        </div>
        <!-- doctorpage -->
      </cube-scroll>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/doctor'></script>
<style lang="scss" scoped>
@import "../assets/scss/doctor.scss";
</style>