<template>
  <div>
    <div class="classifytitle">
      <div class="classifyname">为你推荐</div>
    </div>
    <div class="recommend">
      <van-image
        class="picture"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="rightext">
        <div class="rtitle">
          你需要一个科学的饮食一个科学的饮食
        </div>
        <div class="buttom">
          <div class="price">￥9999.00</div>
          <div class="watch">500人在看</div>
        </div>
      </div>
    </div>
    <div class="rmorebutn">
      <div class="textmt10">80%的妈妈都在看</div>
      <div class="morearrows bpt10"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'recommend',
  props: ['recomdata'],
  data() {
    return {
      key: '1',
    }
  }
}
</script>
<style lang="scss" scoped>
.classifytitle {
  width: 100%;
  padding: 0 16px;
  display: flex;
  height: 20px;
  align-items: center;
  margin-top: 27px;
  overflow: hidden;
  box-sizing: border-box;
  zoom: 1;
  .classifyname {
    float: left;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
  }
}
.recommend {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
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
.rmorebutn {
  background-color: #f5faf8;
  width: 230px;
  height: 40px;
  color: #21c891;
  font-size: 14px;
  margin: 20px auto;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  .textmt10 {
    display: inline-block;
  }
  .bpt10 {
    vertical-align: -1.5px;
  }
  .morearrows {
    width: 12px;
    height: 12px;
    margin-top: -1px;
    background: url('../assets/image/grert.png');
    background-size: 100% 100%;
    display: inline-block;
  }
}
</style>