<template>
  <div class="context">
    <div class="topback">
      <div class="commonbackpic" @click="back"></div>
      <div class="commontitlename">{{commontitlename}}</div>
    </div>
    <div class="navigation">
      <div class="item" :class="cumindex==index?'on':''" v-for="(item, index) in cumlist" :key="index" @click="cumteb(index,item.id)" v-show="index < cumnum-1">{{item.columnm}}</div>
      <div class="itemlast" v-if="morelength > 7" @click="culumore">更多</div>
    </div>
   <div class="wviews">
    <cube-scroll class="classpanels" :options="options" @pulling-up="onLoad"  ref="scroll" >
     <div class="recommend" v-for="(item,index) in yjblist" :key="index" @click="godetail(item.goods_id,item.room_state,avtiveindex)">
      <van-image
        class="picture"
        fit="cover" 
        :src="item.goods_image"
      />
      <div class="rightext">
        <div class="rtitle">
          {{item.goods_name}}
        </div>
        <div class="buttom">
          <div class="price">￥{{item.goods_price}}</div>
          <div class="watch">{{number(item.goods_click)}}人在看</div>
        </div>
      </div>
    </div>
  
     </cube-scroll>
    </div>
     <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/courselist'></script>
<style lang="scss" scoped>
.content {
  width: 100%;
  background: #fff;
}
.topback {
  width: 100%;
  height: 60px;
  display: flex;
  background: #fff;
  align-items:center;
  position: relative;
  .commonbackpic {
    width: 24px;
    height: 24px;
    background: url('../assets/image/back.png');
    background-size: 100% 100%;
    margin: 0 0 0 16px;
    z-index: 99;
  }
  .commontitlename {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 18px;
    color: #333333;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
  }
}
.navigation {
  width: 100%;
  margin: auto;
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 10px;
  background: #fff;
  .item {
    width: 25%;
    font-size: 14px;
    color: #333333;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
  }
  .itemlast {
    width: 24.6%;
    font-size: 14px;
    color: #999999;
    text-align: center;
    line-height: 30px;
    border-left: #cccccc solid 1px;
  }
  .on {
    color: #21c891;
  }
}
.recommend {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  margin: 8px auto;
  display: flex;
  .picture {
    width: 150px;
    height: 98px;
    border-radius: 6px;
    overflow: hidden;
  }
  .rightext {
    width: 181px;
    margin-left: 12px;
    padding: 3px 0;
    .rtitle {
      font-size: 14px;
      font-weight: bold;
      line-height: 18px;
    }
    .buttom {
      margin-top: 44px;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: row;
      .price {
        color: #ff6633;
        font-size: 13px;
        line-height: 13px;
      }
      .watch {
        margin-left: 6px;
        font-size: 12px;
        color: #999999;
        line-height: 15px;
      }
    }
  }
}
.wviews{
  width: 100%;
  height: 100vh;
  height: calc(100vh - 94px);
  font-size: 12px;
  background: #fff;
}
.classpanels {
    width: 100%;
    height: 100%;
}
.before-trigger{
  color: #999999;
}
</style>