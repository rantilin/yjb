
<template>
  <div @touchstart="scrollcheck">
    <div class="commontitles" v-if="isback">
      <div class="commonbackpic" @click="back()" ></div>
      <!-- <div class="backindex" @click="backindex"></div> -->
    </div>
    <!--<div class="notice" v-if="xxflag" >
      <div class="noticeview">
        <marquee
          class="marquee"
          v-if="noticecontent"
          direction="left"
          scrolldelay="100"
        >{{noticecontent}}</marquee>
      </div>
      <div class="xx" @click="xx"></div>
    </div>-->
    <div class="gzwechat" v-show="wechatdata" :style="isback?'':'top: 0.3rem;'">
      <div class="icon" @click="wechat"></div>
      <div class="text" @click="wechat">关注公众号获得课程永久入口！</div>
      <div class="gz" @click="wechat">关注</div>
      <div class="xx" @click="closeWechat"></div>
    </div>

    <van-popup v-model="wechatshow">
      <div class="wxpop">
        <div class="wxewm">
          <img :src="wximg" alt="" />
        </div>
        <div class="wxtext">
          <p>长按识别二维码</p>
          <p>关注公众号获得课程永久入口</p>
          <p>使用更方便~</p>
        </div>
      </div>
    </van-popup>
    <!-- 咨询窗口 -->
    <van-popup v-model="isconsult" v-if="goods_sample != 0">
      <div class="consultpop" v-if="!allbuystatic">
        <div class="title">
          {{ consult.titles }}
        </div>
        <div class="wxewm">
          <img :src="consult.front_image" alt="" />
        </div>
        <div class="wxtext">
          {{ consult.describes }}
        </div>
      </div>
      <div class="consultpop" v-else>
        <div class="title">
          {{ consult.after_titles }}
        </div>
        <div class="wxewm">
          <img :src="consult.after_image" alt="" />
        </div>
        <div class="wxtext">
          {{ consult.after_describes }}
        </div>
      </div>
    </van-popup>
    <!-- 咨询窗口 -->
    <div :class="[xxflag && wechatdata ? 'classpanelview' : 'classpanelviews']">
      <cube-scroll
        class="classpanels"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <div class="videoview">
          <template v-if="classtype == 1">
            <div class="videock" @touchstart="videocheck">
              <video
                id="myVideo"
                ref="myVideo"
                controls="controls"
                x5-playsinline
                x5-video-player-fullscreen="true"
                playsinline
                x5-video-player-type="h5"
                webkit-playsinline
                :src="videosrc"
                :poster="goods_image"
                style="z-index: 9999"
                :class="[sphei ? 'sphei-active' : 'sphei']"
              ></video>
            </div>
            <div
              v-show="!sphei"
              class="mengmiantu"
              :style="{
                background: 'url(' + goods_image + ') center /cover no-repeat',
              }"
            >
              <div class="heimengceng">
                <cube-button
                  class="mengmiantuplay"
                  @click="bofang"
                ></cube-button>
                <div class="progress">
                  <img src="../assets/image/progress.png" alt="" />
                </div>
              </div>
            </div>
          </template>
          <template v-if="classtype == 2">
            <div class="audionews">
              <video
                id="myVideo"
                ref="myVideo"
                class="myaudion"
                controls="controls"
                x5-playsinline
                playsinline
                webkit-playsinline
                :src="videosrc"
              ></video>
              <div
                class="audioimg"
                :style="{
                  background:
                    'url(' + goods_image + ') center /cover no-repeat',
                }"
              ></div>
              <audioplay
                :itemindex="parseInt(chapterindex)"
                :playfalg="yipics"
                :durations="videoalltime"
                :duration="duration"
                :vtalist="audiolist"
                :audiolength="audiolist.length"
                @audiostate="astate"
                @audioplay="bofang"
                @prve="audioprve"
                @next="audionext"
                ref="audiochild"
              ></audioplay>
            </div>
          </template>
          <div class="content">
            <div class="titleview">
              <div class="title">{{ goods_name }}</div>
              <div
                :class="[collectstate == 1 ? 'pic-active' : 'pic']"
                @click="colltctionbtn"
              ></div>
            </div>
            <div class="zjbt">第{{ chapterindex }}章：{{ zjtext }}</div>
            <div class="num">
              <span class="pirce" v-if="goods_price > 0"
                >￥{{ goods_price }}</span
              >
              <span class="pricemianfei" v-else>限时免费</span>
              <span class="watch">{{ goods_click }}人在看</span>
            </div>
            <div class="geryline"></div>
            <div
              class="groupenter"
              v-if="parseInt(gm) == 1 && goods_state_group == 1"
              @click="gogroup"
            ></div>

            <div
              class="tuijianvideo"
              v-if="video_active == 1 && listdata != ''"
            >
              <div class="videotitle">也许你还有这些疑问</div>

              <!-- <cube-scroll
                      class="indexpanels"
                      ref="scroll"
                      :scrollEvents="scrollEvents"
                      @before-scroll-start="scrollnow"
                    > -->
              <div class="commonswiper">
                <div class="swiper-container swipererke">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="(item, index) in listdata"
                      :key="index"
                      style="width: 70%"
                    >
                      <div class="swiperviewerke">
                        <Indexlayout
                          @click="govideo(item.goods_id)"
                          :src="item.goods_image"
                          :title="item.goods_name"
                          :num="item.goods_click + '人在看'"
                        >
                          <div
                            v-if="item.goods_price == 0"
                            slot="swiperprice"
                            class="swiperprice"
                            style="color: #21c891"
                          >
                            免费
                          </div>
                          <div
                            v-if="item.goods_price != 0"
                            slot="swiperprice"
                            class="swiperprice"
                            style="color: #ff6633"
                          >
                            ￥{{ item.goods_price }}
                          </div>
                        </Indexlayout>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- </cube-scroll> -->
            </div>
            <!--去找医生浮窗-->
            <div
              class="tuijiandoctor"
              v-show="doctoractive"
              @click="godoctor()"
            >
              <div class="img-box">
                <img :src="expert_image" />
              </div>
              <div class="btn11"></div>
            </div>

            <div
              class="geryline"
              v-if="video_active == 1 && listdata != ''"
            ></div>

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
                  v-model="currentTab"
                  @click="pitchtab"
                >
                  <van-tab
                    v-for="item in vantab.list"
                    :title="item"
                    :key="item"
                  ></van-tab>
                </van-tabs>
              </div>
              <!-- vanttab -->
            </div>
            <!--        optionbar-->
            <div class="contentdetail">
              <div class="slide" v-show="0 == currentTab">
                <div class="nrtext" v-if="introduction != ''">
                  {{ introduction }}
                </div>
                <div class="nrtext" v-else>
                  <img src="../assets/image/xiahua.png" alt="" />
                </div>
                <van-image
                  class="nrpic"
                  v-if="goods_images != ''"
                  fit="contain"
                  :src="goods_images"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="24">
                      图片加载中..
                    </van-loading>
                  </template>
                </van-image>
              </div>
              <div class="slide slide2" v-show="1 == currentTab">
                <chapter
                  :cpdata="chapterlist"
                  :morenum="morenum"
                  :playindex="playindex"
                  :allbuy="allbuy"
                  :yipics="yipics"
                  :musicoption="musicoption"
                  :MusicAnimation="MusicAnimation"
                  :classtype="classtype"
                  :goodsstatechapter="goods_state_chapter"
                  @tebtn="listbtn"
                  v-if="parseInt(this.goodsStatezj) == 1"
                ></chapter>
                <ul class="audiolist">
                  <li
                    v-for="(item, index) in allvideolist"
                    :key="index"
                    @click="
                      listbtn(
                        index,
                        item.freession,
                        item.gm,
                        item.video_address,
                        item.courseware,
                        item.vo_id
                      )
                    "
                  >
                    <div class="audiolistdiv" v-if="index < morenum">
                      <div class="listenstate">
                        <div
                          class="img"
                          v-if="playindex == item.vo_id && yipics"
                        >
                          <Lottie
                            :options="musicoption"
                            @animCreated="MusicAnimation"
                          />
                        </div>
                        <div
                          :class="[
                            item.freession == 1 || item.gm == 1
                              ? 'imgs'
                              : 'imgses',
                          ]"
                          v-if="playindex == item.vo_id && yipics == false"
                        ></div>
                        <div
                          :class="[
                            item.freession == 1 || item.gm == 1
                              ? 'imgs'
                              : 'imgses',
                          ]"
                          v-if="playindex != item.vo_id"
                        ></div>
                      </div>
                      <div class="listdetail">
                        <div class="nameview">
                          <div
                            class="name"
                            :class="[
                              item.freession == 1 || item.gm == 1
                                ? ''
                                : 'disable',
                            ]"
                          >
                            {{ item.sort }}.{{ item.courseware }}
                          </div>
                          <div
                            class="nolistenprice"
                            v-if="item.freession == 0 && item.gm != 1"
                          >
                            <template v-if="allbuy == false">
                              ￥{{ item.video_price }}
                            </template>
                            <template v-else>
                              <img
                                class="lockicon"
                                src="../assets/image/lock.png"
                                alt=""
                              />
                            </template>
                          </div>
                          <div class="nolistenprice" v-if="item.gm == 1">
                            已购买
                          </div>
                          <div class="trylistenview" v-if="item.freession == 1">
                            <div class="trylisten" v-if="classtype == 1">
                              可试看
                            </div>
                            <div class="trylisten" v-if="classtype == 2">
                              可试听
                            </div>
                          </div>
                        </div>

                        <div
                          :class="
                            item.timedisplay == 0 ? 'listeye' : 'listtime'
                          "
                        >
                          <div
                            :class="[
                              item.freession == 1 || item.gm == 1
                                ? 'timepic'
                                : 'timepics',
                            ]"
                          ></div>
                          <div
                            class="timetext"
                            :class="[
                              item.freession == 1 || item.gm == 1
                                ? ''
                                : 'disable',
                            ]"
                            v-if="item.timedisplay == 0"
                          >
                            {{ item.playnum }}已学习
                          </div>
                          <div
                            class="timetext"
                            :class="[
                              item.freession == 1 || item.gm == 1
                                ? ''
                                : 'disable',
                            ]"
                            v-else
                          >
                            {{ item.duration }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- audiolist -->
              </div>
              <div class="slide" v-show="2 == currentTab">
                <ul class="commentul" v-if="msglists != null">
                  <li v-for="item in msglistes" :key="item.comment_id">
                    <div class="cometntdiv">
                      <div class="user">
                        <van-image
                          class="pices"
                          fit="cover"
                          :src="item.member_avatar"
                          radius="50%"
                        />
                        <div class="nameview">
                          <div class="name">{{ item.nicknames }}</div>
                          <div class="time">{{ item.comment_addtime }}</div>
                        </div>
                      </div>
                      <div class="text">{{ item.comment_content }}</div>
                      <div v-for="(item1, index2) in item.huifu" :key="index2">
                        <div
                          class="user"
                          style="margin-left: 35px; margin-top: 20px"
                        >
                          <van-image
                            class="pices"
                            fit="cover"
                            :src="item1.jk_image"
                            radius="50%"
                          />
                          <div class="nameview">
                            <div class="name" style="display: flex">
                              <div style="font-weight: bold">
                                {{ item1.comment_memberid }}
                              </div>
                              <div
                                v-if="item1.comment_memberid == '医教宝'"
                                class="biaoqian"
                              >
                                官方
                              </div>
                            </div>
                            <div class="time">{{ item1.comment_addtime }}</div>
                          </div>
                        </div>
                        <div
                          class="text"
                          style="margin-left: 35px; padding-bottom: 10px"
                        >
                          {{ item1.comment_content }}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li v-for="(item, index) in msglists" :key="index">
                    <div class="cometntdiv">
                      <div class="user">
                        <van-image
                          class="pices"
                          fit="cover"
                          :src="item.member_avatar"
                          radius="50%"
                        />
                        <div class="nameview">
                          <div class="name">{{ item.nicknames }}</div>
                          <div class="time">{{ item.comment_addtime }}</div>
                        </div>
                      </div>
                      <div class="text">{{ item.comment_content }}</div>
                      <div v-for="(item1, index2) in item.huifu" :key="index2">
                        <div
                          class="user"
                          style="margin-left: 35px; margin-top: 20px"
                        >
                          <van-image
                            class="pices"
                            fit="cover"
                            :src="item1.jk_image"
                            radius="50%"
                          />
                          <div class="nameview">
                            <div class="name" style="display: flex">
                              <div style="font-weight: bold">
                                {{ item1.comment_memberid }}
                              </div>
                              <div
                                v-if="item1.comment_memberid == '医教宝'"
                                class="biaoqian"
                              >
                                官方
                              </div>
                            </div>
                            <div class="time">{{ item1.comment_addtime }}</div>
                          </div>
                        </div>
                        <div
                          class="text"
                          style="margin-left: 35px; padding-bottom: 10px"
                        >
                          {{ item1.comment_content }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="nocntetview" v-if="msglists == null">
                  <div class="nocontent">
                    <div class="nocontentpicview">
                      <van-image
                        class="nocontentpic"
                        fit="cover"
                        :src="nocontent"
                      />
                    </div>
                    <div class="nocontenttext">暂无笔记</div>
                  </div>
                </div>
                <!-- nocntetview -->
              </div>
            </div>
          </div>
          <!-- content -->
        </div>
      </cube-scroll>
    </div>
    <div class="bottombtn" v-show="2 != currentTab">
      <template v-if="goods_sample == 0">
        <cube-button
          :class="allbuystatic ? 'selectionsbuyoff' : 'selectionsbuy'"
          @click="selectionsbuy"
          v-if="goods_price > 0"
          :disabled="allbuystatic"
          >{{ goods_buytext }}</cube-button
        >
        <cube-button class="selectionsbuy" v-else>限时观看</cube-button>
      </template>
      <template v-else>
        <template v-if="parseInt(gm) != 1">
          <div class="consultview">
            <div class="consult" @click="consultclick">
              <div class="icon"></div>
              <div class="text">咨询</div>
            </div>
            <cube-button class="button" @click="selectionsbuy">
              {{ goods_buytext }}
            </cube-button>
          </div>
        </template>
        <template v-else>
          <div class="clbumbutton">
            <cube-button class="clbumbuy" @click="consultclick">
              {{ after_button }}
            </cube-button>
          </div>
        </template>
      </template>
    </div>
    <!-- bottombtn -->

    <div class="commentview" v-show="2 == currentTab">
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
    <div class="mengceng" v-show="show">
      <div class="mengcengview" @click.self="mengcengview()">
        <div
          class="teacherfix"
          @click="teacherpops"
          v-if="mackdata.customized_info.length > 0"
        >
          <div class="teacherbg">
            <div class="trace" :class="markradio > 0 ? 'tracecek' : ''"></div>
            <van-image class="teacherimg" :src="mackdata.customized_images" />
            <div
              class="monicker"
              :class="markradio > 0 ? 'monickercek' : ''"
            ></div>
          </div>
        </div>
        <div class="modelbottombtn">
          <cube-scroll
            class="mengcengviews"
            ref="scrolls"
            v-show="allbuy == false"
          >
            <template v-if="goodsStatezj == 0 || goods_state_chapter == 1">
              <div class="selections">
                <div class="btsses">
                  <div
                    class="btss"
                    v-for="(item, index) in videolist"
                    :key="index"
                  >
                    <cube-button
                      class="ctxtli"
                      :class="{ ctxtlis: arr.includes(index) }"
                    >
                      <div class="btnviews">
                        <div class="btn1">{{ index + 1 }}</div>
                        <div class="btn2" v-if="item.freession == 1">免费</div>
                        <div class="btn2" v-if="item.freession != 1">
                          ￥{{ item.video_price }}
                        </div>
                      </div>
                      <input
                        class="cks"
                        type="checkbox"
                        :value="item.vo_id + ',' + item.video_price"
                        v-model="checkedNames"
                        :disabled="
                          item.freession == 1 || item.gm == 1 ? true : false
                        "
                        @click="checkedBox(index, item)"
                      />
                      <div
                        :class="
                          item.freession == 1 || item.gm == 1
                            ? 'jinyong'
                            : 'offjinyong'
                        "
                      >
                        <div class="btnviewse">
                          <div class="btn1e">{{ index + 1 }}</div>
                          <div class="btn2e" v-if="item.freession == 1">
                            免费
                          </div>
                          <div class="btn2e" v-if="item.freession != 1">
                            已购买
                          </div>
                        </div>
                      </div>
                    </cube-button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <chapterbuy
                :listdata="chapterlist"
                :quanxuan="quanxuan"
                @section="section"
                :goodsstatechapter="goods_state_chapter"
              ></chapterbuy>
            </template>
          </cube-scroll>

          <div class="clear"></div>

          <div class="quanxuan" v-show="allbuy == false">
            <div class="quanxuanview" @click="checkall">
              <div :class="[quanxuan ? 'xieyipic-active' : 'xieyipic']"></div>
              <div class="quanxuantext">全选</div>
            </div>
          </div>
          <div class="allbuy" v-show="allbuy">
            <div class="leftimg">
              <img :src="goods_image" alt="" />
            </div>
            <div class="rightext">
              <div class="itemtitle">{{ goods_name }}</div>
              <div class="itemdetl">{{ goods_jingle }}</div>
              <div class="itemprice">￥{{ discountoption }}</div>
            </div>
          </div>
          <!-- 名师服务 -->
          <div class="teacherfw" @click="teacherpops" v-if="markradio > 0">
            <div class="icon"></div>
            <div class="text">已选择指导老师一对一指导</div>
            <div class="price">￥{{ parseInt(markradio).toFixed(2) }}</div>
            <div class="righticon"></div>
          </div>
          <!-- 名师服务结束 -->
          <!-- 赠送礼品 -->
          <div class="goodsgift" v-if="goodsstategift != 0">
            <div class="icon"></div>
            <div class="text">精美礼物</div>
            <div class="yhm_select" @click="giftoff">
              <div class="offgift" v-if="gift.isunfold">收起</div>
              <div class="offgift" v-else>展开</div>
            </div>
          </div>
          <div class="goodgiftvm" v-if="gift.isunfold">
            <img class="giftimg" :src="gift.conditiondata.adv_image" />
            <div class="giftcontent">
              <div class="giftitle">
                <div class="icon"></div>
                <div class="text">赠品</div>
              </div>
              <div class="content">{{ gift.conditiondata.describes }}</div>
            </div>
          </div>
          <!-- 赠送礼品结束 -->

          <div class="InvitationCode">
            <div class="icon"></div>
            <div class="text">使用邀请码，没有可不填</div>
            <div class="yhm_select" @click="checkDiscountsode">
              <div
                :class="[DiscountsCode ? 'xieyipic-active' : 'xieyipic']"
              ></div>
            </div>
          </div>
          <div class="codeInput" v-show="DiscountsCode">
            <div class="code">
              <input
                type="text"
                placeholder="输入您的专属邀请码"
                v-model="yqmCode"
                v-on:input="yzcode"
                :disabled="DiscountsVerify"
                UIReturnKeyDone
                @blur="blur"
              />
              <div
                :class="[DiscountsVerify ? 'onstate' : 'offstate']"
                v-if="focusDis"
              ></div>
            </div>
          </div>
          <ul class="opntextwarnpic">
            <li class="li">
              <div class="quanview" v-for="(item, index) in quan" :key="index">
                <div class="quanpic"></div>
                <div class="quantext">满{{ item.gao }}减{{ item.di }}</div>
              </div>
            </li>
            <li v-if="classid == 137">
              <div class="tuiview">
                <div class="tuiimage"></div>
                <div class="tuitext">
                  #医教宝承诺，课程无帮助可联系{{
                    index == 0 ? "大童" : "童姐"
                  }}退款
                </div>
              </div>
            </li>
          </ul>

          <cube-button class="allpriceview">
            <div>
              <span class="alltext">合计：</span>
              <span class="allprice">
                <p v-if="DiscountsVerify" class="zhprice">￥{{ yjprice }}</p>
                <p>￥{{ discountoption }}</p>
              </span>
            </div>
          </cube-button>
          <cube-button
            class="gobuy"
            @click="buyclass(classid)"
            :disabled="disabled"
            >去支付</cube-button
          >
        </div>
      </div>
    </div>
    <!-- 分享赚钱 -->
    <EarnShare
      :imgsrc="shareimg"
      :shareuid="share_uid"
      :shareprice="share_price"
      @onimgshare="onimgshare"
      v-if="share_uid != 0 && sharereception == undefined"
    ></EarnShare>

    <van-popup v-model="isteacher" class="teacherpop">
      <div class="teacher">
        <div
          class="list"
          v-for="(item, index) in mackdata.customized_info"
          :key="index"
        >
          <div class="markebg">
            <van-image class="marketing" :src="item.adv_image" />
            <div class="text">
              {{ item.describes }}
            </div>
          </div>
          <div class="price">
            ￥{{ parseInt(item.zed_price) }}元/{{ item.zed_term }}
          </div>
          <div class="checked">
            <input
              name="mark"
              @click="markclick($event)"
              @change="retainRecord(item.id)"
              type="radio"
              v-model="markradio"
              :value="item.zed_price"
            />
          </div>
        </div>
      </div>
      <img
        class="close"
        @click="isteacher = false"
        src="../assets/image/shareclose.png"
        alt=""
      />
    </van-popup>
    <van-popup v-model="isboard" class="bgnone">
      <div class="board">
        <div class="boardtext">
          <p class="boardtitle">尊敬的用户：</p>
          <p class="boardtitle">您好！</p>
          <p class="wenben">
            为了给您提供更完善的服务，医教宝已对平台用户信息与资金安全做全面升级。
          </p>
          <p class="wenben">
            <span class="gruebold">2020年8月31日10:00</span
            >之后，旧版网站不再支持微信支付，后续医教宝新功能也将停止更新（老用户的历史订单在旧版网站依然可以学习观看，不影响使用）。
          </p>
          <p class="wenben">
            建议您点击下方<span class="gruebold">“知道了”</span
            >按钮，前往新版网站完成订单
          </p>
          <p class="wenben">
            对此给您带来的不便我们深表歉意，再次感谢您对此次调整的支持和谅解。期待医教宝能在育儿路上继续为您省心、省力又省钱！
          </p>
          <p class="gbuttom">医教宝官方</p>
          <p class="gbuttom">2020-8-28</p>
        </div>
        <div class="buttonbtn">
          <div class="neednot" @click="boardclose">
            <div class="icon"></div>
            暂时不用
          </div>
          <div class="know">
            <div class="knowbutn" @click="goneweb">知道了</div>
          </div>
        </div>
      </div>
    </van-popup>

    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/class'></script>
<style lang="scss" scoped>
@import "../assets/scss/class.scss";
</style>
