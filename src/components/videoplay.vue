<template>
   <div>
      <div
              class="videock"
              @touchstart="videocheck"
            >
              <video
                id="myVideo"
                ref="myVideo"
                controls="controls"
                x5-playsinline
                x5-video-player-fullscreen="true"
                playsinline
                webkit-playsinline
                :src="videosrc"
                :poster="goodsimage"
                style="z-index:9999"
                @pause="zhanting"
                @click="zhanting"
                :class="[sphei?'sphei-active':'sphei']"
              ></video>
            </div>
            <div
              v-show="!sphei"
              class="mengmiantu"
              :style="{background:'url('+goodsimage+') center /cover no-repeat'}"
            >
              <div class="heimengceng">
                <cube-button
                  class="mengmiantuplay"
                  @click="bofang"
                ></cube-button>
                <div class="progress"><img
                    src="../assets/image/progress.png"
                    alt=""
                  ></div>
              </div>
            </div>
   </div>
</template>
<script>
export default {
  name:'videoplay',
  props:['goodsimage','videosrc'],
   data() {
     return {
        sphei:false,
     }
   },
   
   methods:{
     videocheck(){

     },
     bofang() {
           this.sphei = true;
           document.getElementById("myVideo").play();
     },
     zhanting(){
           this.sphei = false;
           document.getElementById("myVideo").pause();
     }
   },
}
</script>
<style lang='scss' scoped>
.sphei {
    width: 100%;
    height: 0px;
    display: none;
}

.sphei-active {
    width: 100%;
    height: 217px;
}
.videock {
    width: 100%;
}
.mengmiantu {
    width: 100%;
    height: 217px;
    position: relative;

    .heimengceng {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(0, 0, 0, 0.4);

        .mengmiantuplay {
            background-color: transparent;
            width: 80px;
            height: 80px;
            background: url("../assets/image/play.gif");
            background-size: 100% 100%;
        }

    }

    .progress {
        position: absolute;
        width: 90%;
        margin: auto;
        bottom: 10px;

        img {
            width: 100%;
        }
    }
}
</style>