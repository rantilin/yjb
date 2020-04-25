<template>
  <div class="botnavswicth">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <div class="msgnumber" v-if="num>0">
      <div>{{num}}</div>
    </div>
    <div class="tabbars">
      <div class="tabbarslide" @touchstart="switchNav(0)">
        <div class="tabbarpicview">
          <div class="tabbarpic" :class="[currentTab==0?'studyon':'studyoff']"></div>
        </div>
        <div :class="[currentTab==0?'tabbartext-active':'tabbartext']">课程</div>
      </div>
      <div class="tabbarslide" @touchstart="switchNav(1)">
        <div class="tabbarpicview">
          <div class="tabbarpic" :class="[currentTab==1?'specialiston':'specialistoff']"></div>
        </div>
        <div :class="[currentTab==1?'tabbartext-active':'tabbartext']">问专家</div>
      </div>
      <div class="tabbarslide" @touchstart="switchNav(2)">
        <div class="tabbarpicview">
          <div class="tabbarpic" :class="[currentTab==2?'msgon':'msgoff']"></div>
        </div>
        <div :class="[currentTab==2?'tabbartext-active':'tabbartext']">消息</div>
      </div>
      <div class="tabbarslide" @touchstart="switchNav(3)">
        <div class="tabbarpicview">
          <div class="tabbarpic" :class="[currentTab==3?'mineon':'mineoff']"></div>
        </div>
        <div :class="[currentTab==3?'tabbartext-active':'tabbartext']">我的</div>
      </div>
    </div>
  </div>
</template>
<script src='../assets/js/botnav'></script>
<style lang="scss">
@import "../assets/scss/botnav.scss";
</style>
