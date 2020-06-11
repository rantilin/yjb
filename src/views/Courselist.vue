<template>
  <div class="context">
    <div class="topback">
      <div class="commonbackpic"></div>
    </div>
    <div class="navigation">
      <div class="item on">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">宝宝疾病</div>
      <div class="item">更多</div>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
    
       
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script src='../assets/js/courselist'></script>
<style lang="scss" scoped>
.content {
  background: #fff;
}
.topback {
  width: 100%;
  height: 44px;
  display: flex;
  .commonbackpic {
    width: 24px;
    height: 24px;
    background: url('../assets/image/back.png');
    background-size: 100% 100%;
    margin: 10px 0 0 16px;
  }
}
.navigation {
  width: 95%;
  margin: auto;
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-wrap: wrap;
  .item {
    width: 25%;
    font-size: 14px;
    color: #333333;
    text-align: center;
    line-height: 30px;
  }
  .item:last-child {
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
  margin-bottom: 16px;
  display: flex;
  .picture {
    width: 150px;
    height: 98px;
    border-radius: 6px;
    overflow: hidden;
  }
  .rightext {
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
</style>