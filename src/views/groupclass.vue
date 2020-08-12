<template>
  <div class="content"  @touchstart="scrollcheck">
      <div class="topback">
      <div class="commonbackpic" @click="back"></div>
      <div class="commontitlename">发起拼团</div>
    </div>
    <cube-scroll
        class="classpanels"
        ref="scroll"
        :options="options"
      >
     <div class="banner"></div>
     <div class="rectangle">
         <van-image class="classimg" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg"  ></van-image>
          <div class="context">
              <div class="title">写作技能提升</div>
              <div class="subtitle">参团特惠100元</div>
              <div class="price">
                   <div class="textvm1">￥320.00</div>
                   <div class="textvm2">原价：<s>￥720.00</s></div>
              </div>
          </div>
     </div>
     <div class="groupabout">
          <div class="item">
            <img class="icon" src="../assets/image/groupadd.png" alt="">
            
          </div>
           <div class="rightdotted"></div>
           <div class="item">
            <img class="icon" src="../assets/image/groupshare.png" alt="">
           
          </div>
          <div class="rightdotted"></div>
          <div class="item">
            <img class="icon" src="../assets/image/groupback.png" alt="">
            
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
                <div class="item">
                  <div class="userimg onuser">
                       <img class="cimg" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
                  </div>
                   <div class="userid">团长</div>
                   <div class="name">我是团长</div>
                </div>
                <div class="item">
                  <div class="userimg onuser">
                       <img class="cimg" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
                  </div>
                   <div class="name">月月</div>
                </div>
                <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
               <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
                <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
                <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
                <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
                <div class="item">
                  <div class="userimg">
                       <img class="cimg" src="../assets/image/userdf.png" alt="">
                  </div>
                </div>
          </div>
          <div class="sharetext">已有3人参团，快邀请好友来参加吧！</div>
         <cube-button class="sharebutton">点击分享</cube-button>
         <cube-button class="sharebutton">邀请好友来参团</cube-button>
     </div>
     <div class="notice">
        <div class="icon"></div>
        <div class="title">试看视频</div>
     </div>
     <div class="video">
            
     </div>
     <div class="videovm">
         <img src="../assets/image/xiahua.png"/>
         <van-image src="http://yijiaobao.com.cn/data/upload/shop/newinfo/06310999003215002.png"></van-image>
     </div>
     <div class="crossline"></div>
     <div class="sharerule">
          <van-image src="http://yijiaobao.com.cn/data/upload/shop/newinfo/06310999003215002.png"></van-image>
     </div>
     <div class="crossline"></div>
     <div class="notice">
        <div class="icon"></div>
        <div class="title">拼团须知</div>
     </div>
     <div class="noticecont">
        <van-image src="http://yijiaobao.com.cn/data/upload/shop/newinfo/06356968433115643.png"></van-image>
     </div>
     <div class="usercenter">
        <div class="item1">
            <div class="icon"></div>
            <div class="title">我的钱包</div>
        </div>
        <div class="verticalline"></div>
        <div class="item2">
          <div class="icon"></div>
            <div class="title">联系我们</div>
        </div>
     </div>
     <div class="botumm"></div>
    </cube-scroll>
 
      <van-swipe class="userloop" vertical="true" show-indicators=false :autoplay="3000" indicator-color="white">
         <van-swipe-item> <img class="userimg" src="http://yijiaobao.com.cn/data/upload/shop/avatar/avatar_89.jpg?1597135450" alt="">
                        <div class="title"><span class="redgreed">黑猫警长</span> 刚刚拼团成功了！</div> </van-swipe-item>
          <van-swipe-item> <img class="userimg" src="http://yijiaobao.com.cn/data/upload/shop/avatar/avatar_89.jpg?1597135450" alt="">
                        <div class="title"><span class="redgreed">黑猫警长</span> 刚刚拼团成功了！</div> </van-swipe-item>
      </van-swipe>
  </div>
</template>
<script src='../assets/js/groupclass.js'></script>
<style lang="scss" scoped>
@import '../assets/scss/groupclass.scss';
</style>
