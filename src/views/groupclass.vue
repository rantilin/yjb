<template>
  <div
    class="content"
    @touchstart="scrollcheck"
  >
    <div class="topback">
      <div
        class="commonbackpic"
        @click="back"
      ></div>
      <div class="commontitlename">发起拼团</div>
    </div>
    <cube-scroll
      class="classpanels"
      ref="scroll"
      :options="options"
    >
      <div class="banner"></div>
      <div class="rectangle">
        <van-image
          class="classimg"
          radius="5px"
          :src="goods_image"
        ></van-image>
        <div class="context">
          <div class="title">{{goods_name}}</div>
          <div class="subtitle">参团特惠{{listdata.concessional_price}}元</div>
          <div class="price">
            <div class="textvm1">￥{{goods_price-listdata.concessional_price}}</div>
            <div class="textvm2">原价：<s>￥{{goods_price}}</s></div>
          </div>
        </div>
      </div>
      <div class="groupabout">
        <div class="item">
          <img
            class="icon"
            src="../assets/image/groupadd.png"
            alt=""
          >

        </div>
        <div class="rightdotted"></div>
        <div class="item">
          <img
            class="icon"
            src="../assets/image/groupshare.png"
            alt=""
          >

        </div>
        <div class="rightdotted"></div>
        <div class="item">
          <img
            class="icon"
            src="../assets/image/groupback.png"
            alt=""
          >

        </div>
      </div>
      <div class="groupaboutext">
        <div class="text">发起拼团</div>
        <div class="text">将链接分享给好友 朋友圈，群聊</div>
        <div class="text">每当好友参团达到 要求，返还学费</div>
      </div>

      <div class="groupaboutvm">

        <div class="title">
          <div class="groupleft"></div>
          <div class="text">开团后永久有效</div>
          <div class="groupright"></div>
        </div>
        <div class="userlist">
          <div
            class="item"
            v-for="(item,index) in grouplistuser"
            :key="index"
          >
            <template v-if="index==0">
              <div class="userimg onuser">
                <img
                  class="cimg"
                  :src="item.member_avatar"
                  alt=""
                >
              </div>
              <div class="userid">团长</div>
              <div class="name">{{item.member_name}}</div>

            </template>
            <template v-else>
              <template v-if="index < 10">
                <div
                  class="userimg"
                  :class="item.member_id?'onuser':''"
                >
                  <template v-if="item.member_id">
                    <img
                      class="cimg"
                      :src="item.member_avatar"
                      alt=""
                    >
                  </template>
                  <template v-else>
                    <img
                      class="cimg"
                      src="../assets/image/userdf.png"
                      alt=""
                    >
                  </template>
                </div>
                <div
                  class="name"
                  v-if="item.member_name"
                >{{item.member_name}}</div>
              </template>
            </template>
          </div>
        </div>
        <template v-if="!groupswith">
          <div
            class="sharetext"
            v-if="groupnum < 10"
          >已有<span class="groupred">{{groupnum}}</span>人参团，快邀请好友来参加吧！</div>
          <div
            class="sharetext"
            v-else
          ><span class="groupred">参团人数已满</span></div>
        </template>

        <cube-button
          class="sharebutton"
          v-if="!groupswith"
          @click="orderpop"
        >我要参团</cube-button>
        <cube-button
          class="sharebutton"
          v-if="groupswith"
          @click="attention=true"
        >点击分享</cube-button>
        <cube-button
          class="sharebutton"
          v-if="!groupswith"
          @click="attention=true"
        >邀请好友来参团</cube-button>
      </div>
      <div
        class="notice"
        v-if="!groupswith"
      >
        <div class="icon"></div>
        <div
          class="title"
          v-if="classtype == 1"
        >试看视频</div>
        <div
          class="title"
          v-if="classtype == 2"
        >试听音频</div>
      </div>
      <div
        class="video"
        v-if="!groupswith"
      >
        <template v-if="classtype == 1">
          <videoplay
            :goodsimage="goods_image"
            :videosrc="videosrc"
          ></videoplay>
        </template>
      </div>
      <div
        class="videovm"
        v-if="!groupswith"
      >
        <div class="xiahua"><img src="../assets/image/xiahua.png" /></div>
        <van-image
          class="goodimgs"
          :src="goods_images"
        ></van-image>
      </div>
      <template v-if="groupswith">
        <div class="crossline"></div>
        <div class="sharerule">
          <van-image :src="listdata.discount_image"></van-image>
        </div>
        <div class="crossline"></div>
      </template>
      <div class="notice">
        <div class="icon"></div>
        <div class="title">拼团须知</div>
      </div>
      <div class="noticecont">
        <van-image :src="listdata.group_describes"></van-image>
      </div>
      <div class="usercenter">
        <div class="item1">
          <div class="icon"></div>
          <div class="title" @click="gomywallet">我的钱包</div>
        </div>
        <div class="verticalline"></div>
        <div class="item2" @click="contactpop">
          <div class="icon"></div>
          <div class="title">联系我们</div>
        </div>
      </div>
      <div class="botumm"></div>
    </cube-scroll>

    <van-swipe
      class="userloop"
      :vertical="true"
      :show-indicators="false"
      :touchable="false"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item,index) in listuser"
        :key="index"
      >
        <img
          class="userimg"
          :src="item.member_avatar"
          alt=""
        >
        <div class="title"><span class="redgreed">{{item.nicknames}}</span> 刚刚拼团成功了！</div>
      </van-swipe-item>
    </van-swipe>
     <van-popup v-model="contactus">
       <div class="consultpop" >
        <div class="wxewm">
          <img
            :src="listdata.service_image"
            alt=""
          >
        </div>
        <div class="wxtext">
             长按二维码识别
        </div>
      </div>
     </van-popup>
    <van-popup
      v-model="attention"
      round
      class="sharepopbg"
      :overlay-style="{background:'rgba(0,0,0,.5)'}"
    >
      <div class="sharepop">
      </div>
      <img
        class="shareclose"
        @click="attention=false"
        src="../assets/image/shareclose.png"
        alt=""
      >
    </van-popup>
    <div
      class="shareyd"
      v-show="attention"
    ></div>

    <classorder
      :orderdata="orderdata"
      :ordershow.sync="ordershow"
      :videolist ="videolist"
      :chapterlist="chapterlist"
      :secret="usersecret"
    ></classorder>
  </div>
</template>
<script src='../assets/js/groupclass.js'></script>
<style lang="scss" scoped>
@import '../assets/scss/groupclass.scss';
</style>
