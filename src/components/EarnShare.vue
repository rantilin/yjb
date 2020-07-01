<template>
   <div>
    <div class="earnshare" @click="onshare">
      <img src="../assets/image/earnshare.png" alt="">
     </div>
     <van-popup v-model="shareis">
       <div class="sharpop">
         <img class="popimg" :src="imgsrc" alt="">
         <img class="close" @click="close" v-if="imgsrc!=''" src="../assets/image/shareclose.png" alt="">
         <div class="poptext" v-if="imgsrc!=''">长按保存图片，发给好友或分享至朋友圈 每邀请1位新人购买，立即获取{{shareprice}}元奖金</div>
         <van-loading size="24px" v-if="imgsrc==''">海报生成中...</van-loading>
      </div>
    </van-popup>
   </div>
</template>
<script>
export default {
  name: 'EarnShare',
  props: ['imgsrc','shareuid','shareprice'],
  data() {
    return {
      key: '',
      shareis: false,
    }
  }, 
  methods:{
      onshare(){
          if(this.shareis){
             this.shareis= false
          }else{
             let shareurl=`${window.location.href}&shareuid=${this.shareuid}`
             this.$emit('onimgshare',shareurl)
             this.shareis= true
          }
      },
      close(){
         this.shareis= false
      }
  }
}
</script>
<style lang="scss" scoped>
.earnshare{
    width: 59px;
    position: fixed;
    top: 75%;
    right: 0;
    z-index: 2;
    box-sizing: border-box;
    padding: 5px;
    img{
        width: 100%;
    }
}
.van-popup{
  background: none;
}
.sharpop{
  width: 270px;
  border-radius:12px;
  text-align: center;
  .popimg{
    width: 100%;
  }
  .poptext{
    color: #fff;
    font-size: 13px;
    line-height: 20px;
  }
  .close{
    width: 34px;
    height: 34px;
    margin: 14px auto 8px auto;
  }
}
</style>