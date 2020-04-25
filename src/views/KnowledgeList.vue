
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll
        class="videoclasspanels"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
        v-if="wledgelist!=null"
      >
        <ul class="comul">
            <li class="comli" v-for='(item,index) in wledgelist' :key='index' @click="listbtn" :data-id='item.id'>
              <div class="compic" :style="{background:'url('+item.thumbnail+') center /cover no-repeat'}"></div>
              <div class="comdetail">
                <div class="comname">{{item.atitle}}</div>
                <div class="text">{{item.abstract}}</div>
              </div>
            </li>
        </ul>
        <!-- comul -->
      </cube-scroll>
      <div class="nocntetview" v-if="wledgelist==null">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="nocontent" />
          </div>
          <div class="nocontenttext">暂无内容</div>
        </div>
      </div>
      <!-- nocntetview -->
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/knowledgelist'></script>
<style  lang="scss">
.cube-pullup-wrapper {
  height: 50px;
  .before-trigger {
    span {
      font-size: 13px;
      color: #999999;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "../assets/scss/knowledgelist.scss";
</style>