<template>
  <div>
        <div class="minebgname">我的</div>
      <div class="minebg"></div>
    <div class="minepanelview">
      <cube-scroll class="minepanels" ref="scroll">
        <div class="mineuserview">
          <div class="minelogin">
            <van-image class="minepic" fit="cover" :src="avator" radius="50%" @click="set"/>
            <div class="mineusername">{{nicknames}}</div>
            <div class="signature">{{autograph}}</div>
            <cube-button class="gologin" @click="gologin" v-if='!key'>去登录</cube-button>
          </div>
          <!-- minelogin -->
          <ul class="minelist">
            <li v-for="(item,index) in minelist" :key="index" @click="databtn(index)">
              <div
                class="minelistpic"
                :style="{background:'url('+item.pic+') center /cover no-repeat'}"
              ></div>
              <div class="minelistname">{{item.name}}</div>
              
              <div class="minelistarrows"></div>
              
            </li>
              <div class="msgnumber" v-if="order>=1">
                 <div>{{order}}</div>
              </div>
              <div class="msgnumber1" v-if="toker>=1">
                 <div>{{toker}}</div>
              </div>
          </ul>
          
          <!-- minelist -->
          <div class="mineset" @click="set()">
            <div class="minesetpic"></div>
            <div class="minelistname">设置</div>
            <div class="minelistarrows"></div>
          </div>
        </div>
        <!-- mineuserview -->
      </cube-scroll>
    </div>
       <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/mine'></script>
<style lang="scss" scoped>
@import "../assets/scss/mine.scss";
</style>

