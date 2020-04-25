
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll
        class="videoclasspanels"
        ref="scroll"
        :scrollEvents="scrollEvents"
        @before-scroll-start="scrollnow"
      >
        <p class="title">{{database.atitle}}</p>
        <div class="content kindeditor" ref="content"></div>
      </cube-scroll>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/welfare'></script>
<style lang="scss" scoped>
@import "../assets/scss/welfare.scss";
</style>