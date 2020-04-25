
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="babytopanelview">
      <div class="nocntetview">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="accomplish" />
          </div>
          <div class="tjcg">提交成功</div>
          <div class="nocontenttext">{{time}}s后自动返回首页</div>
          <div class="gohrefs">
            <cube-button class="gohref" @click="gohref">立即跳转>></cube-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='../assets/js/success'></script>
<style lang="scss" scoped>
@import "../assets/scss/success.scss";
</style>