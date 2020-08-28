<template>
  <div>
    <div class="classifytitle">
      <div class="classifyname">为你推荐</div>
    </div>
    <div class="recommend" v-for="(item,index) in recomdata" :key="index" @click="godetail(item.goods_id,item.room_state,avtiveindex)">
      <van-image
        class="picture"
        fit="cover" 
        :src="item.goods_image"
      />
      <div class="rightext">
        <div class="rtitle">
          {{item.goods_name}}
        </div>
        <div class="tuixiao">{{item.goods_jingle}}</div>
        <div class="buttom">
          <div class="price">￥{{item.goods_price}}</div>
          <div class="watch">{{number(item.goods_click)}}人在看</div>
        </div>
      </div>
    </div>
    <div class="rmorebutn" @click="moreclick" v-if="loding==false">
      <div class="textmt10" v-if="avtiveindex == 0">80%的妈妈都在看</div>
       <div class="textmt10" v-if="avtiveindex == 1">还有疑问？点击咨询专家</div>
      <div class="morearrows bpt10"></div>
    </div>
  </div>
</template>
<script>
import common from '@/assets/js/common'
export default {
  name: 'recommend',
  props: ['recomdata','avtiveindex','loding'],
  data() {
    return {
      key: '',
    }
  },
  created(){
   
  },
  methods:{
     moreclick(){
        this.$emit('tjmore', this.avtiveindex)
     },
     number(val) {
      return common.number(val)
    },
    godetail(id, item, index) {
      this.$router.push({
                name: 'class',
                query: {
                    classid: id,
                    index: index,
                    state: item 
                }
      })
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
  margin-bottom: 16px;
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
     .tuixiao{
        width: 160px;;
        margin: 10px 0;
        color: #999999;
        line-height: 20px;
        font-size: 12px;
      }
    .buttom {
      margin-top: 15px;
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