<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item :name="vindex" v-for="(vnameitem, vindex) in cpdata" :key="vindex">
        <template #title>
          <div class="chapter-title">
            <div class="titleicon">
              <div class="text">{{vindex + 1 | PrefixInteger(2)}}</div>
              <div class="ellipse"></div>
            </div>
            <div class="titletext">{{vnameitem.courseware}}</div>
          </div>
        </template>
        <ul class="audiolist flotnone">
                  <li v-for="(item,index) in vnameitem.chapter_text" :key="index" @click="listbtn(index,item.freession,item.gm,item.video_address,item.courseware,item.vo_id)">
                    <div class="audiolistdiv" v-if="index < morenum">
                      <div class="listenstate">
                        <div class="img" v-if="playindex == item.vo_id&&yipics">
                          <Lottie :options="musicoption" @animCreated="MusicAnimation" />
                        </div>
                        <div
                          :class="[item.freession==1||item.gm==1?'imgs':'imgses']"
                          v-if="playindex==item.vo_id&&yipics==false"
                        ></div>
                        <div
                          :class="[item.freession==1||item.gm==1?'imgs':'imgses']"
                          v-if="playindex!=item.vo_id"
                        ></div>
                      </div>
                      <div class="listdetail">
                        <div class="nameview">
                          <div
                            class="name"
                            :class="[item.freession==1||item.gm==1?'':'disable']"
                          >{{index+1}}.{{item.courseware}}</div>
                          <div
                            class="nolistenprice"
                            v-if="item.freession==0&&item.gm!=1"
                          >
                          <template v-if="allbuy==false">
                          ￥{{item.video_price}}
                          </template>
                          <template v-else>
                            <img class="lockicon" src="../assets/image/lock.png" alt="">
                          </template>
                          </div>
                          <div class="nolistenprice" v-if="item.gm==1">已购买</div>
                          <div class="trylistenview" v-if="item.freession==1">
                            <div class="trylisten">可试看</div>
                          </div>
                        </div>
                        <div class="listtime">
                          <div :class="[item.freession==1||item.gm==1?'timepic':'timepics']"></div>
                          <div
                            class="timetext"
                            :class="[item.freession==1||item.gm==1?'':'disable']"
                          >{{item.duration}}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
      </van-collapse-item>
      
    </van-collapse>
  </div>
</template>
<script>
import Lottie from "vue-lottie/src/lottie.vue";
export default {
  name: 'chapter',
  props: ['cpdata','morenum','playindex','allbuy','yipics','musicoption','MusicAnimation'],
  components:{
     Lottie
  },
  data() {
    return {
      activeName: 0,
    }
  },
  methods:{
    listbtn(index, freession, gm, video_address, courseware, vo_id){
      //使用 this.$emit('input',data)改变父组件中v-model绑定的属性值
    	this.$emit('tebtn', index,freession,gm,video_address,courseware,vo_id);
    }
  },
  watch:{
     //监听父组件传进来数据，
      yipics(val, oldval) {
        this.yipics = val
    }
  },
  filters:{
      PrefixInteger(num, m) {
      if(num >= 10){
        return num;
      }else{
        return (Array(m).join(0) + num).slice(-m);
      }
     }
  }
}
</script>
<style lang="scss" >
.van-cell {
  padding-left: 0;
  padding-right: 0;
}
.chapter-title {
  width: 100%;

  display: flex;
  .titleicon {
    width: 20px;
    height: 20px;
    text-align: center;
    position: relative;
    .text {
      width: 18px;
      font-size: 15px;
      color: #333333;
      font-weight: bold;
      z-index: 9;
      position:absolute;
      top: 0;
    }
    .ellipse {
      width: 18px;
      height: 6px;
      background: #21c891;
      border-radius: 6px;
      position:absolute;
      bottom: 0;
    }
  }
  .titletext {
    margin-left: 10px;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }
}
.flotnone{
  overflow: hidden;
  zoom: 1;
  float:none!important;
  margin-top: 0!important;
  li{
    float: none!important;
  }
}
</style>