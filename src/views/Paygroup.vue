<template>

  <div class="allpage">
    <div class="commontitles"  ref="headheight">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <!-- <div class="commontitlename">{{comname}}</div> -->
      </div>
    </div>

    <div class="paygrouppanelview">
      <cube-scroll
        class="paygrouppanels"
        :scrollEvents="['scroll']"
        ref="scroll"
        @scroll="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
         <!-- 视频 -->
       <div class="videock" @touchstart="videocheck">
            <video id="myVideo"
              ref="myVideo"
              controls="controls"
              x5-playsinline
              x5-video-player-fullscreen="true" 
              playsinline
              webkit-playsinline
              :src="complimentary.videosrc"
              :poster="datas.goods_image"
              style="z-index:9999"
              :class="[complimentary.sphei?'sphei-active':'sphei']"
            ></video>
          </div>
          <div v-show="!complimentary.sphei" class="mengmiantu" :style="{background:'url('+datas.goods_image+') center /cover no-repeat'}">
            <div class="heimengceng">
              <cube-button class="mengmiantuplay" @click="bofang"></cube-button>
              <div class="progress"><img src="../assets/image/progress.png" alt=""></div>
            </div>
          </div>
        <!-- 视频结束 -->
     
       
        <div class="hearder">
          <div class="title">{{datas.goods_name}}</div>
          <div class="time">{{datas.start}}-{{datas.end}}</div>
          <div class="amount">
            <span class="price">￥{{datas.goods_price}}</span>
            <span class="apply">{{datas.applicant}}人报名</span>
          </div>
        </div>
        <div class="greyline"></div>
        <div class="organization">
          <span class="organizationtable">机构</span>
          <span class="organizationname">{{datas.goods_jingle}}</span>
        </div>
        <div class="greyline"></div>
        <div class="contentdetail">
          <div class="tablechange">
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
                v-model="avtiveindex"
                @click="pitchtab"
              >
                <van-tab v-for="item in vantab.list" :title="item" :key="item"></van-tab>
              </van-tabs>
            </div>
            <!-- vanttab -->
          </div>
          <div class="contenttext">
            <div class="contentview" v-show="avtiveindex==0">
              <div class="intro" v-if="datas.introduction!=''">{{datas.introduction}}</div>
              <div class="intro" v-else><img src="../assets/image/xiahua.png" alt=""></div>
              <img class="introimg" :src="datas.goods_images" />
              <div class="mgbt"></div>
            </div>
            <div class="contentview slide2" v-show="avtiveindex==1" v-if="complimentary.comnum > 0">
              <!-- 赠送视频 -->
                <ul class="audiolist">
                  <li v-for="(item,index) in complimentary.videolist" :key="index" @click="listbtn(index)">
                    <div class="audiolistdiv" v-if="index<complimentary.morenum">
                      <div class="listenstate">
                        <div class="img" v-if="complimentary.playindex==index&&complimentary.yipics">
                          <Lottie :options="musicoption" @animCreated="MusicAnimation" />
                        </div>
                        <div
                          :class="[item.freession==1||complimentary.gm?'imgs':'imgses']"
                          v-if="complimentary.playindex==index&&complimentary.yipics==false"
                        ></div>
                        <div
                          :class="[item.freession==1||complimentary.gm?'imgs':'imgses']"
                          v-if="complimentary.playindex!=index"
                        ></div>
                      </div>
                      <div class="listdetail">
                        <div class="nameview">
                          <div
                            class="name"
                            :class="[item.freession==1||complimentary.gm?'':'disable']"
                          >{{index+1}}.{{item.courseware}}</div>
                          
                          <div class="trylistenview" v-if="item.freession==1&&complimentary.gm==false">
                            <div class="trylisten">可试看</div>
                          </div>
                        </div>
                        <div class="listtime">
                          <div :class="[item.freession==1||complimentary.gm?'timepic':'timepics']"></div>
                          <div
                            class="timetext"
                            :class="[item.freession==1||complimentary.gm?'':'disable']"
                          >{{item.duration}}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- audiolist -->
               <cube-button class="moreclass" v-if="complimentary.videolist.length>complimentary.morenum" @click="morebtn">
                  <div class="moreclasstext">更多课时信息</div>
                  <div class="moreclasspic"></div>
                </cube-button>
                 <!-- 赠送视频结束 -->
            </div>
            <div class="contentview" v-show="avtiveindex==2">
              <ul class="commentul" v-if="msglists!=null">
                <li v-if="msglistes!=null">
                  <div class="cometntdiv">
                    <div class="user">
                      <van-image class="pices" fit="cover" :src="zhidingpic" radius="50%" />
                      <div class="nameview">
                        <div class="name">{{zhidingname}}</div>
                        <div class="time">{{zhidingtime}}</div>
                      </div>
                    </div>
                    <div class="text" style="margin-left:20px;" ref="comment"></div>
                  </div>
                </li>
                <li
                  v-for="(item,index) in msglists"
                  :key="index"
                  style="border-bottom:1px solid #EBEFF5;"
                >
                  <div class="cometntdiv" v-if="index<morenumpl">
                    <div class="user">
                      <van-image class="pices" fit="cover" :src="item.member_avatar" radius="50%" />
                      <div class="nameview">
                        <div class="name">{{item.nicknames}}</div>
                        <div class="time">{{item.comment_addtime}}</div>
                      </div>
                    </div>
                    <div class="text" style="margin-left:20px;">{{item.comment_content}}</div>

                    <div v-for="(item1,index2) in item.huifu" :key="index2">
                      <div class="user" style="margin-left:20px;margin-top:20px;">
                        <van-image class="pices" fit="cover" :src="item1.jk_image" radius="50%" />
                        <div class="nameview">
                          <div class="name" style="display:flex">
                            <div>{{item1.comment_memberid}}</div>
                            <div v-if="item1.comment_memberid=='医教宝'" class="biaoqian">官方</div>
                          </div>
                          <div class="time">{{item1.comment_addtime}}</div>
                        </div>
                      </div>
                      <div
                        class="text"
                        style="margin-left:20px;padding-bottom:10px"
                      >{{item1.comment_content}}</div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="nocntetview" v-else>
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
      </cube-scroll>
    </div>
    <div class="paybtn" v-show="avtiveindex==0 || avtiveindex==1" v-if="complimentary.gm==false">
      <div class="zixunview" @click="consultbtn">
        <div class="zixun">
          <div class="zixunpic"></div>
          <div class="zixuntext">咨询</div>
        </div>
      </div>
      <div class="pabtnview">
        <cube-button class="nowpay" @click="nowpay">立即报名</cube-button>
      </div>
    </div>
    <div class="paybtn" v-show="avtiveindex==0 || avtiveindex==1" v-if="complimentary.gm==true">
         <cube-button class="jinqun" @click="consultbtn">加入班级群~</cube-button>
    </div>
    <div class="commentview" v-show="avtiveindex==2">
      <cube-input
        class="commentipnut"
        v-model="value"
        :placeholder="placeholder"
        :clearable="clearable"
        UIReturnKeyDone
        @blur="blur"
      ></cube-input>
      <cube-button class="send" @click="send">发送</cube-button>
    </div>
    <div class="dialogwxview" v-show="dialogshows" @click="mengcengview()">
      <div class="dialogwxviews">
        <div class="dialogviewimgs" v-if="complimentary.gm">
          <img :src="datas.goods_imagess" />
        </div>
        <div class="dialogviewimgs" v-else>
          <img :src="datas.tea_pic" />
        </div>
        <div class="dialogtext">{{dialogtext}}</div>
      </div>
    </div>
    <div v-wechat-title="$route.meta.title=datas.goods_name"></div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/paygroup'></script>
<style lang="scss" scoped>
@import '../assets/scss/paygroup.scss';
</style>