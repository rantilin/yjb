<template>
  <div class="page">
     <component-head comname="指导协议声明"></component-head>
     <cube-scroll
        class="classpanels"
        ref="scroll"
      >
     <van-image class="xyimages"  fit="contain" :src="imgsrc" />
     </cube-scroll>
  </div>
</template>
<script src='../assets/js/agreement'></script>

<style lang="scss" scoped>
 .page{
   width: 100%;
 }
 .xyimages{
    width: 100%;
 }
 .classpanels{
   width: 100%;
   margin-top: 8vh;
   height: 92vh;
 }
</style>
