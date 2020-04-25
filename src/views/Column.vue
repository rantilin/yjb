
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" v-if="columnlist!=null" ref="scroll">
        <div class="page">
          <div class="specialistview" @click="godoctor(item.id)" v-for="(item,index) in columnlist" :key="index">
            <div class="specialistviewuser">
              <van-image
                class="specialistpic"
                fit="cover"
                :src="item.expert_image"
                radius="50%"
              />
              <div class="specialistdetail">
                <div class="specialisttit">
                  <span class="spename">{{item.expert_name}}</span>
                  <span class="attending_doctor">{{item.expert_title}}</span>
                  <div class="sperightstar">
                    <div class="spestars"></div>
                    <span>{{item.expert_score}}</span>
                  </div>
                </div>
                <div class="speaddress">
                  {{item.expert_hospital}}
                  <span>{{item.hd}}个回答</span>
                </div>
              </div>
            </div>
            <!-- specialistviewuser -->
            <div class="begoodat">擅长：{{item.expert_miaoshu}}</div>
            <div class="solve">
               <div class="solvetextview" v-if="item.expert_tw==1">
                    <div class="solvetextpic"></div>
                    <div class="solvetext">图文￥{{item.tw_price}}</div>
                  </div>
                  <div class="solvetextview" v-if="item.expert_dh==1">
                    <div class="solvetextpics"></div>
                    <div class="solvetext">电话￥{{item.dh_price}}</div>
                  </div>
              <cube-button
                class="askdoctor"
                @click.stop="askdoctor(item.tw_price,item.dh_price,item.expert_tw,item.expert_dh,item.id)"
              >问医生</cube-button>
            </div>
          </div>
          <!-- specialistview -->
        </div>
      </cube-scroll>
      <div class="nocntetview" v-if="columnlist==null">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="nocontent" />
          </div>
          <div class="nocontenttext">暂无内容</div>
        </div>
      </div>
      <!-- nocntetview -->
    </div>
    <van-action-sheet v-model="show">
      <div class="modelmengceng">
        <div class="close">
          <div class="closepic" @click="close"></div>
        </div>
        <div class="changeconsule">选择咨询方式</div>
        <div class="consultway" @click="consultway(3)" v-if="twkq==1">
          <div class="consultpic"></div>
          <div class="consultdetail">
            <div class="consulttext">图文咨询</div>
            <div class="consultprice">￥{{tw}}</div>
            <div class="consultcontent">通过文字、图片向医生提问，含三次免费追问机会适合常见病及健康类问题咨询</div>
          </div>
          <div class="arrowview">
            <div class="arrow"></div>
          </div>
        </div>
        <div class="consultway" @click="consultway(4)" v-if="dhkq==1">
          <div class="consultpics"></div>
          <div class="consultdetail">
            <div class="consulttext">电话咨询</div>
            <div class="consultprice">￥{{dh}}</div>
            <div class="consultcontent">专家主动致电，15分钟VIP服务，适合复杂病情的咨询，和医生充分沟通</div>
          </div>
          <div class="arrowview">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/column'></script>
<style lang="scss" scoped>
@import "../assets/scss/column.scss";
</style>