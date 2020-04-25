
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="backdoctor" @click="godoctor">
      <div class="name">{{expert_name}}</div>
      <div class="zhuzhi">{{expert_title}}</div>
      <div class="arrows"></div>
    </div>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" ref="scroll"> 
        <div class="pages">
          <div class="user">
            <div class="userdetail">
              <div class="content">{{description}}</div>
              <van-image class="pic" fit="cover" :src="member_avatar" radius="50%" />
            </div>
          </div>
          <div class="chats" v-for="(item,index) in chatlists" :key="index">
            <div class="doctortext" v-if="item.class_dia==2">
              <div class="userdetail">
                <van-image class="pic" fit="cover" :src="expert_image" radius="50%" />
                <div class="content">{{item.dialogue}}</div>
              </div>
            </div>
            <div class="user" v-if="item.class_dia!=2">
              <div class="userdetail">
                <div class="content">{{item.dialogue}}</div>
                <van-image class="pic" fit="cover" :src="member_avatar" radius="50%" />
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="btns">
      <div class="warn">因个体差异，擅自治疗存在风险，请咨询医生</div>
      <cube-button class="nowconsult" @click="consultway">￥{{tw_price}}&nbsp;立即咨询</cube-button>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/conversation'></script>
<style lang="scss" scoped>
@import "../assets/scss/conversation.scss";
</style>