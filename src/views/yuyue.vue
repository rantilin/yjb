<template>
  <div @touchstart="scrollcheck">
    <div class="bannervm">
      <img
        src="../assets/image/yuyuebanner.png"
        class="banner"
        alt=""
        srcset=""
      >
      <div class="title">
        <span class="sap1">徐文娜</span>
        <span>门诊主任</span>
        <div class="buttombg"></div>
      </div>
    </div>
    <div class="content" ref="scroll">
         <div class="textmodule">
              <div class="title">
                  <span class="verticalicon"></span>
                  <span class="splsum">个人简介</span>
              </div>
              <div class="text">
                 <div :class="ismoretext?'':'close'" >
                 <p>中国康复学会作业治疗专业青年委员会委员</p>
                 <p>四川康复医学会儿科分会委员</p>
                 <p>成都康复医学会儿童康复专委会治疗学组委员</p>
                 <p>毕业于成都中医药大学康复治疗学，一直从事临床，康复，中医，实操教学等工作，具备系统扎实的理论基础和丰富的临床经验。曾在成都军区总医院等三甲医院建立康复评估系统，担任评估负责人，治疗师实操培训导师等。参与西南儿童康复医学研究院与电子科技大学neuSCAN团队合作开展的鼻喷催产素自闭症治疗科研项目。</p>
                  </div>
                 <p class="more" @click="more">
                     <template v-if="!ismoretext">
                       更多
                     </template>
                     <template v-else>
                       收起
                     </template>
                 </p>
              </div>
         </div>
         <div class="textmodule">
              <div class="title">
                  <span class="verticalicon"></span>
                  <span class="splsum">专业擅长</span>
              </div>
              <div class="text">
                自闭谱系障碍(ASD)，智力发育障碍，注意力缺陷多动障碍(ADHD)，发育性语言障碍，发育性学习障碍，大运动发育迟缓，脑瘫，发育性运动共济障碍等的评估和诊断，制定个体化康复治疗方案及督导康复干预。
                   
              </div>
         </div>
         <div class="textmodule">
              <div class="title">
                  <span class="verticalicon"></span>
                  <span class="splsum">视频介绍</span>
              </div>
              <video
                id="myVideo1"
                controls="controls"
                x5-playsinline
                x5-video-player-fullscreen="true"
                playsinline
                webkit-playsinline
                src="http://mpv.videocc.net/dffcd91310/d/dffcd9131006b4f8422a3db27936660d_2.mp4"
                poster="http://m.yijiaobao.com.cn/data/upload/shop/waybill/12345qwer.png"
                style="z-index:9999"
                class="video"
                @play="videostop(1)"
              ></video>
              <div class="name">门诊主任-徐文娜</div>
              <video
                id="myVideo2"
                controls="controls"
                x5-playsinline
                x5-video-player-fullscreen="true"
                playsinline
                webkit-playsinline
                src="http://mpv.videocc.net/dffcd91310/0/dffcd913106b3a315c76c08e45223a80_2.mp4"
                poster="http://m.yijiaobao.com.cn/data/upload/shop/waybill/123456qwer.png"
                style="z-index:9999"
                class="video"
                @play="videostop(2)"
              ></video>
              <div class="name">成都中童儿童康复医院</div>
         </div>
    </div>
     <div class="butboom" @click="yuyuepup">预约挂号</div>
   
  </div>
</template>
<script src='../assets/js/yuyue'></script>
<style>
#app{
  float: none;
  overflow:auto;
}
.vmbgcolor{
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
@import '../assets/scss/yuyue.scss';
</style>