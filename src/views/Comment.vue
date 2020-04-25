
<template>
  <div>
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{comname}}</div>
        <div class="delview">
          <cube-button class="del" @click="fabubtn" :disabled="disabled">发布</cube-button>
        </div>
      </div>
    </div>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" ref="scroll">
        <div class="page">
          <div class="content">
            <van-image class="pices" fit="cover" :src="expert_image" radius="6px" />
            <div class="detail">
              <div class="detailname">{{expert_name}}</div>
              <div class="miaoshu">{{description}}</div>
            </div>
          </div>
          <textarea
            class="textarea"
            placeholder="在咨询过程中，有什么美中不足的地方吗？"
            v-model="textareas"
            @blur="blur"
          ></textarea>
        </div>
      </cube-scroll>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/comment'></script>

<style lang="scss" scoped>
@import "../assets/scss/comment.scss";
</style>