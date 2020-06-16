<template>
  <div>
    <div class="audiotd">
      <div
        class="audiomove"
        :style="{width:changdu+'px'}"
      >
        <div
          class="audiodot"
          :style="{left:progressleft+'px'}"
          @touchstart="starts"
          @touchmove="moves"
          @touchend="ends"
        >{{startime}}/{{duration}}</div>
      </div>
      <div
        class="audioline"
        :style="{width:progresswidth}"
      ></div>
    </div>
    <!--            progress-->

    <div class="playview">
      <div class="playviewoption">
        <cube-button
          :class="[playindex==0?'prveoff':'prve']"
          @click="prve"
        ></cube-button>
        <cube-button
          class="play"
          @click="plays"
        >
          <div :class="[playfalg?'playpicon':'playpicoff']"></div>
        </cube-button>
        <cube-button
          :class="[playindex == audiolength-1?'nextoff':'next']"
          @click="next"
        ></cube-button>
      </div>

    </div>
  </div>
</template>
<script>
import common from '@/assets/js/common'
export default {
  name: 'audioplay',
  props: ['playfalg','vtalist','audiolength','itemindex', 'duration', 'durations'],
  data() {
    return {
      audio: '',
      startime: '0:00',
      currentTimes: '',
      changdu: '',
      progresswidth: 0,
      progressleft: 0,
      xiabiao: 0,
      playindex: 0
    }
  },
 
  methods: {
    starts() {

    },
    moves(e) {
      this.$emit('audiostate', false)
      document.getElementById('myVideo').pause()
      let windowwidth = document.documentElement.clientWidth
      let audiotd = document.querySelector('.audiotd').offsetWidth
      let audiomove = document.querySelector('.audiomove').offsetWidth
      let audiodot = document.querySelector('.audiodot').offsetWidth
      this.changdu = audiotd - audiodot
      var pageX = e.touches[0].pageX - (windowwidth - audiotd) / 2
      if (pageX <= 0) {
        pageX = 0
      }
      if (pageX >= audiotd) {
        pageX = audiotd
      }
      let percent = pageX / audiotd
      this.progresswidth = percent * 100 + '%'
      this.progressleft = percent * audiomove - audiodot / 2 + 35
      this.currentTimes = (pageX / audiotd) * this.durations
      this.startime = common.FormatTime(this.currentTimes)
    },
    ends() {
      this.$emit('audiostate', true)
      document.getElementById("myVideo").play();
       this.audio.currentTime = this.currentTimes;
      if (parseInt(this.currentTimes) == parseInt(this.durations)) {
       this.$emit('audiostate', false)
      }
    },
    prve() {
      this.playindex--;
      if (this.playindex >= 0) {
          this.$emit('audiostate', false)
          document.getElementById("myVideo").pause();
          this.$emit('prve', this.vtalist[this.playindex].sort, this.vtalist[this.playindex].video_address, this.vtalist[this.playindex].courseware, this.vtalist[this.playindex].vo_id,this.vtalist[this.playindex].duration,this.vtalist[this.playindex].durations)
          
      } else {
          this.playindex++;
          this.toast('上面没有啦')
      }
    },
    plays() {
      if (this.playfalg) {
        this.$emit('audiostate', false)
        document.getElementById('myVideo').pause()
      } else {
        this.$emit('audiostate', true)
        this.$emit('audioplay')
        this.xsroll()
      }
    },
    xsroll(){
        let _this = this
        let audiotd = document.querySelector('.audiotd').offsetWidth
        let audiomove = document.querySelector('.audiomove').offsetWidth
        let audiodot = document.querySelector('.audiodot').offsetWidth
        _this.audio.ontimeupdate = function() {
          if (_this.audio.currentTime >= 0) {
            _this.startime = common.FormatTime(_this.audio.currentTime)
          }
          var percent = _this.audio.currentTime / _this.durations
          var jindu = percent * 100  + '%'
          _this.progresswidth = jindu
          _this.progressleft = percent * audiomove - audiodot / 2 + 35
          _this.changdu = audiotd - audiodot
        }
    },
    next() {
      this.playindex++;
      if (this.playindex < this.audiolength) {
          this.$emit('audiostate', false)
          document.getElementById("myVideo").pause();
          this.$emit('next', this.vtalist[this.playindex].sort, this.vtalist[this.playindex].video_address, this.vtalist[this.playindex].courseware, this.vtalist[this.playindex].vo_id,this.vtalist[this.playindex].duration,this.vtalist[this.playindex].durations)
      } else {
          this.playindex--;
          this.toast('已经到底啦')
      }
    },
    chushi() {
      this.audio = document.getElementById('myVideo')
      var audiotd = document.querySelector('.audiotd').offsetWidth
      let audiodot = document.querySelector('.audiodot').offsetWidth
      this.changdu = audiotd - audiodot
      this.progressleft = -(audiodot / 2) + 35
      this.progresswidth = 0
      this.startime = '0:00'
    }
  },
  watch:{
     itemindex(val,oldval){
       this.playindex = common.consindx(this.vtalist, val)
     }
  },
  mounted() {
    this.chushi()
   
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/audioplay.scss';
</style>