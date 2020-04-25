
<template>
  <div class="know">
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{comname}}</div>
      </div>
    </div>
    <div class="yabess">
      <van-tabs animated v-model="active" @click="plantab" :line-width="20">
        <van-tab v-for="(item,index) in list" :title="item.gc_name" :key="index"></van-tab>
      </van-tabs>
    </div>
    <div class="knowledgepanelview">
      <div class="planes">
        <cube-scroll class="knowledgepanels" ref="scroll">
          <div class="contentview"></div>
          <div class="content" v-for="(items,indexs) in smlist" :key="indexs">
            <div class="title">{{items.gc_name}}</div>
            <div :class="[items.child.length%3==0?'options':'option']">
              <cube-button
                class="optionbtn"
                :inline="true"
                v-for="(itemes,indexes) in items.child"
                :key="indexes"
                @click="knowledgelist"
                :data-id="itemes.gc_id"
                :data-name="itemes.gc_name"
              >{{itemes.gc_name}}</cube-button>
            </div>
          </div>
        </cube-scroll>
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/knowledge'></script>
<style lang="scss" >
.yabess {
  top: 60px;
  z-index: 2;
  position: fixed;
  width: 100%;
}

.van-ellipsis {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
.van-tabs__line {
  width: 20px;
  height: 3px;
  background: rgba(33, 200, 145, 1);
  border-radius: 1.5px;
}

[class*="van-hairline"]::after {
  border: 0 solid #ebedf0;
}
</style>
<style lang="scss" scoped>
@import "../assets/scss/knowledge.scss";
</style>