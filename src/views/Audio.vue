
<template>
  <div>
    <div class="commontitles">
      <div class="commonbackpic" @click="fanhui"></div>
      <!-- <div class="backindex" @click="backindex"></div> -->
    </div>
    <div class="notice" v-if="xxflag">
      <div class="noticeview">
        <marquee
          class="marquee"
          v-if="noticecontent"
          direction="left"
          scrolldelay="100"
        >{{noticecontent}}</marquee>
      </div>
      <div class="xx" @click="xx"></div>
    </div>
    <div :class="[xxflag?'classpanelview':'classpanelviews']">
      <cube-scroll class="classpanels" ref="scroll">
        <div class="audioview">
          <video
            id="myAudio"
            controls="controls"
            x5-playsinline
            playsinline
            webkit-playsinline
            :src="audiosrc"
            ref="myAudio"
          ></video>
          <div class="picview">
            <div class="pic" :style="{background:'url('+goods_image+') center /cover no-repeat'}">
              <div class="time">
                <div class="headset"></div>
                <div class="shuliang">{{zongshichang}}</div>
              </div>
            </div>
          </div>
          <div class="title">{{goods_name}}·{{zjtext}}</div>
          <div class="numview">
            <div class="num">
              <div class="pirce">￥{{goods_price}}</div>
              <div class="listen">{{goods_click}}人在听</div>
            </div>
          </div>

          <div class="audiotd">
            <div class="audiomove" :style="{width:changdu+'px'}">
              <div
                class="audiodot"
                :style="{left:progressleft+'px'}"
                @touchstart="starts"
                @touchmove="moves"
                @touchend="ends"
              >{{startime}}/{{duration}}</div>
            </div>
            <div class="audioline" :style="{width:progresswidth}"></div>
          </div>
          <!--            progress-->

          <div class="playview">
            <div class="playviewoption">
              <cube-button :class="[playindex==0?'prveoff':'prve']" @click="prve"></cube-button>
              <cube-button class="play" @click="plays">
                <div :class="[playfalg?'playpicon':'playpicoff']"></div>
              </cube-button>
              <cube-button :class="[playindex==audiolist.length-1?'nextoff':'next']" @click="next"></cube-button>
            </div>
            <div class="collectview">
              <div :class="[collectstate==1?'collect-active':'collect']" @click="colltctionbtn"></div>
            </div>
          </div>
          <!-- playview -->
          <div class="audiolisttitle">播放列表</div>
          <div class="listviews">
            <ul class="audiolist">
              <li v-for="(item,index) in audiolist" :key="index" @click="listbtn(index)">
                <div class="audiolistdiv" v-if="index<morenum">
                  <div class="listenstate">
                    <div class="img" v-if="playindex==index&&yipics">
                      <Lottie :options="musicoption" @animCreated="MusicAnimation" />
                    </div>
                    <div
                      :class="[item.freession==1||item.gm==1?'imgs':'imgses']"
                      v-if="playindex==index&&yipics==false"
                    ></div>
                    <div
                      :class="[item.freession==1||goumai==1?'imgs':'imgses']"
                      v-if="playindex!=index"
                    ></div>
                  </div>
                  <div class="listdetail">
                    <div class="nameview">
                      <div
                        class="name"
                        :class="[item.freession==1||goumai==1?'':'disable']"
                      >{{index+1}}.{{item.courseware}}</div>
                      <div class="trylistenview" v-if="item.freession==1">
                        <div class="trylisten">可试听</div>
                      </div>
                    </div>
                    <div class="listtime">
                      <div :class="[item.freession==1||goumai==1?'timepic':'timepics']"></div>
                      <div
                        class="timetext"
                        :class="[item.freession==1||goumai==1?'':'disable']"
                      >{{item.duration}}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <!-- audiolist -->
            <cube-button class="moreclass" v-if="audiolist.length>morenum" @click="morebtn">
              <div class="moreclasstext">更多课时信息</div>
              <div class="moreclasspic"></div>
            </cube-button>
          </div>
          <!-- asdasd -->
        </div>
        <!-- audioview -->
      </cube-scroll>
    </div>
    <!-- bottombtn -->
    <div class="bottombtn">
      <cube-button class="share" @click="sharebtn">
        <div class="shareone">点击右上方分享</div>
        <div class="sharetwo">至两个微信群免费听</div>
      </cube-button>
      <cube-button class="buy" @click="buyclass(classid)" :disabled="disabled">￥{{goods_price}} 购买</cube-button>
    </div>
    <component-loading v-if="loding" />
    <div class="yindao" v-show="shareshow">
      <div class="yindaoxian"></div>
      <div class="yindaotu">
        <div class="yindaopic"></div>
      </div>
      <div class="yindaobtnview">
        <cube-button class="yindaobtn" @click="qrsharebtn">确认</cube-button>
      </div>
    </div>
  </div>
</template>
<script src='../assets/js/audio'></script>
<style lang="scss" scoped>
@import "../assets/scss/audio.scss";
</style>