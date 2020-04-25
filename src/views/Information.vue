<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="informationpanelview">
      <cube-scroll class="informationpanels" ref="scroll">
        <ul class="msglistul">
          <li class="msglistli">
            <label>孩子姓名</label>
            <div class="inputview">
              <input placeholder="请输入孩子姓名" @blur="blur" v-model="valname" />
            </div>
          </li>
          <li class="msglistli">
            <label>孩子年龄</label>
            <div class="inputview">
              <input
                type="text"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入孩子年龄"
                @blur="blur"
                v-model="valage"
              />
            </div>
          </li>
          <li class="msglistli">
            <label>年级</label>
            <div class="inputview">
              <input placeholder="请输入年级" @blur="blur" v-model="valgrade" />
            </div>
          </li>
          <li class="msglistli">
            <label>微信号</label>
            <div class="inputview">
              <input placeholder="请输入微信号" @blur="blur" v-model="valwechat" />
            </div>
          </li>
        </ul>
        <p class="proof">以上信息是你进群的唯一凭证，请确保信息真实有效</p>
        <div class="clear"></div>
        <div style="width: 85%;margin: auto;margin-top: 10px;">
          <DisCode :discountoption="price" @coreprice="discoucode"></DisCode>
          </div>
        <div class="paybtnview">
          <cube-button class="paybtn" :disabled="disabled" @click="submit">￥{{price}} 去支付</cube-button>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script src='../assets/js/information'></script>
<style lang="scss" scoped>
@import "../assets/scss/information.scss";
</style>