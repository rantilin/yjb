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
                  <li v-for="(item,index) in vnameitem.chapter_text" :key="index" @click="listbtn(item.sort,item.freession,item.gm,item.video_address,item.courseware,item.vo_id)">
                    <div class="audiolistdiv" >
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
                          >{{item.sort}}.{{item.courseware}}</div>
                          <div
                            class="nolistenprice"
                            v-if="item.freession==0&&item.gm!=1"
                          >
                          <template v-if="allbuy==false||goodsstatechapter==1">
                          ￥{{item.video_price}}
                          </template>
                          <template v-else>
                            <img class="lockicon" src="../assets/image/lock.png" alt="">
                          </template>
                          </div>
                          <div class="nolistenprice" v-if="item.gm==1">已购买</div>
                          <div class="trylistenview" v-if="item.freession==1">
                            <div class="trylisten" v-if="classtype == 1">可试看</div>
                            <div class="trylisten" v-if="classtype == 2">可试听</div>
                          </div>
                        </div>
                        <div :class="item.timedisplay == 0 ? 'listeye': 'listtime'">
                          <div :class="[item.freession==1||item.gm==1?'timepic':'timepics']"></div>
                          <div
                            class="timetext"
                            :class="[item.freession==1||item.gm==1?'':'disable']" v-if="item.timedisplay == 0"
                          >{{item.playnum}}已学习</div>
                          <div  
                            class="timetext"
                            :class="[item.freession==1||item.gm==1?'':'disable']"
                            v-else>
                            {{item.duration}}
                          </div>
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
  props: ['cpdata','morenum','playindex','allbuy','yipics','musicoption','MusicAnimation','classtype','goodsstatechapter'],
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
<style>
.van-cell {
  padding-left: 0;
  padding-right: 0;
}
</style>
<style lang="scss" scoped>
@import '../assets/scss/common.scss';

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

.audiolistdiv {
    width: 100%;
    float: left;
    display: flex;
    height: 72px;
    padding-top: 15px;
}

.audiolist {
    width: 100%;
    float: left;
    margin-top: 15px;
    margin-bottom: 10px;
    li {
        width: 100%;
        float: left;
        .listenstate {
            float: left;
            width: 20px;
            height: 100%;
            margin-right: 15px;
            overflow: hidden;
            position: relative;
            .img {
                position: absolute;
                top: -43px;
                left: -40px;
                width: 100px;
                height: 100px;
            }
            .imgs {
                width: 15px;
                height: 15px;
                background: url("../assets/image/playon.png");
                background-size: 100% 100%;
            }
            .imgses {
                width: 15px;
                height: 15px;
                background: url("../assets/image/playoff.png");
                background-size: 100% 100%;
            }
        }
        .listdetail {
            float: left;
            flex: 1;
            .nameview {
                width: 100%;
                float: left;
                height: 16px;
                display: flex;
                .name {
                    float: left;
                    flex: 1;
                    font-size: 14px;
                    color: $bt;
                    height: 16px;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    word-break: break-all;
                }
                .trylistenview {
                    float: left;
                    margin-left: auto;
                    border-radius: 4px;
                    border: 1px solid $theme;
                    height: 24px;
                    color: $theme;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 60px;
                    white-space: nowrap;
                    margin-left: 10px;
                    .trylisten {
                        font-size: 12px;
                    }
                }
                .nolistenprice {
                    font-size: 13px;
                    font-weight: bold;
                    white-space: nowrap;
                    color: $jg;
                    line-height: 16px;
                    margin-left: auto;
                }
            }
            .listtime {
                width: 100%;
                float: left;
                height: 11px;
                margin-top: 10px;
                .timepic {
                    float: left;
                    width: 11px;
                    height: 11px;
                    background: url("../assets/image/time.png");
                    background-size: 100% 100%;
                }

                .timepics {
                    float: left;
                    width: 11px;
                    height: 11px;
                    background: url("../assets/image/times.png");
                    background-size: 100% 100%;
                }
                .timetext {
                    float: left;
                    color: $bt;
                    font-size: 12px;
                    height: 11px;
                    line-height: 12px;
                    margin-left: 5px;
                }
                .watchnum {
                    float: left;
                    color: $bt;
                    font-size: 12px;
                    height: 11px;
                    line-height: 12px;
                    margin-left: 15px;
                }
            }
            .listeye {
                width: 100%;
                float: left;
                height: 11px;
                margin-top: 10px;
                
                .timepic {
                    float: left;
                    width: 11px;
                    height: 11px;
                    background: url("../assets/image/eye.png");
                    background-size: 100% 100%;
                }

                .timepics {
                    float: left;
                    width: 11px;
                    height: 11px;
                    background: url("../assets/image/eyeoff.png");
                    background-size: 100% 100%;
                }

                .timetext {
                    float: left;
                    color: $bt;
                    font-size: 12px;
                    height: 11px;
                    line-height: 12px;
                    margin-left: 5px;
                }

                .watchnum {
                    float: left;
                    color: $bt;
                    font-size: 12px;
                    height: 11px;
                    line-height: 12px;
                    margin-left: 15px;
                }
            }
        }
    }
}
.lockicon{
    width: 24px;
    height: 24px;
}
.disable {
    color: #BFBFBF !important;
}

</style>