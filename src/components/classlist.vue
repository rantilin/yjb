<template>
  <div>
    <div class="classifytitle">
      <div class="classifyname">{{columnname}}</div>
      <div
        class="morebtn"
        v-if="classnum < 6"
      >
        <div
          class="moretext"
          @click="popdata"
        >查看更多</div>
        <div class="morearrows"></div>
      </div>
    </div>
    <template v-if="classnum < 6">
      <div class="commonswiper">
        <swiper :options="swiperOption">
          <swiper-slide
            class="swiper-slide"
            v-for="(item,index) in Classdata"
            :key="index"
          >
            <div class="swiperviewerke">
              <Indexlayout
                @click="godetail(item.goods_id,item.room_state,avtiveindex)"
                :src="item.goods_image"
                :title="item.goods_name"
                :num="number(item.goods_click)+'人在看'"
              >
                <div
                  v-if="item.goods_price==0"
                  slot="swiperprice"
                  class="swiperprice"
                  style="color:#21C891"
                >免费</div>
                <div
                  v-if="item.goods_price!=0"
                  slot="swiperprice"
                  class="swiperprice"
                  style="color:#ff6633"
                >￥{{item.goods_price}}</div>
              </Indexlayout>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </template>
    <template v-else>
      <div class="daka">
        <div
          class="dakaview"
          v-for="(item,index) in Classdata"
          :key="index"
        >
          <Indexlayout
            @click="godetail(item.goods_id,item.room_state,avtiveindex)"
            :src="item.goods_image"
            :title="item.goods_name"
            :num="number(item.goods_click)+'人在看'"
          >
            <div
              v-if="item.goods_price==0"
              slot="swiperprice"
              class="swiperprice"
              style="color:#21C891"
            >免费</div>
            <div
              v-if="item.goods_price!=0"
              slot="swiperprice"
              class="swiperprice"
              style="color:#ff6633"
            >￥{{item.goods_price}}</div>
          </Indexlayout>
        </div>
        <div class="morebutn">
           <div class="textmt10">查看更多</div>
           <div class="morearrows bpt10"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import common from '@/assets/js/common'
import Indexlayout from '@/components/Indexlayout'
export default {
  name: 'classlist',
  props: ['Classdata', 'columnname', 'classnum', 'avtiveindex'],
  components: {
    Indexlayout
  },
  data() {
    return {
      listdata: [],
      swiperOption: {
        paginationClickable: true,
        autoplay: false,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 12,
        autoplayDisableOnInteraction: false
      }
    }
  },
  created() {},
  methods: {
    popdata() {},
    classlist() {},
    classbtn(val, num, index) {
      this.$router.push({
        name: 'videoclass',
        query: {
          id: val,
          num: num,
          index: index
        }
      })
    },
    number(val) {
      return common.number(val)
    },
    godetail(id, item, index) {
      if (item == 1) {
        this.$router.push({
                name: 'class',
                query: {
                    classid: id,
                    index: index
                }
      })
      } else {
        this.$router.push({
                name: 'audio',
                query: {
                    classid: id,
                    index: index
                }
      })
      }
    }
  },
  watch: {
    //监听父组件传进来数据，由于异步加载太慢，只能监听
    Classdata(val, oldval) {
      if (val != oldval) {
        this.listdata = this.Classdata
      }
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
  .morebtn {
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .moretext {
    color: #21c891;
    font-size: 12px;
    margin-right: 2px;
  }
 
}
 .morearrows {
    width: 12px;
    height: 12px;
    margin-top: -1px;
    background: url('../assets/image/grert.png');
    background-size: 100% 100%;
    display:inline-block;
  }
.commonswiper {
  width: 100%;
  padding-left: 15px;
  overflow: hidden;
  zoom: 1;
}

.swiperviewerke {
  float: left;
  width: 160px;
  margin-top: 16px;
}
.swiper-slide {
}
.commonswiper .swiper-slide:last-child .swiperviewerke {
  margin-right: 16px;
}

.swiperviewgrade {
  float: left;
  width: 160px;
  margin-top: 16px;
}

.commonswiper .swiper-slide:last-child .swiperviewgrade {
  margin-right: 16px;
}

.swiperviewbaby {
  float: left;
  width: 160px;
  margin-top: 16px;
}

.commonswiper .swiper-slide:last-child .swiperviewbaby {
  margin-right: 16px;
}

.swiperviewhealthopenclass {
  float: left;
  width: 160px;
  margin-top: 16px;
}

.commonswiper .swiper-slide:last-child .swiperviewhealthopenclass {
  margin-right: 16px;
}

.swiperviewhbringopenclass {
  float: left;
  width: 160px;
  margin-top: 16px;
}

.commonswiper .swiper-slide:last-child .swiperviewhbringopenclass {
  margin-right: 16px;
}
.swiper-slide {
  width: 160px;
}
.morebutn {
  background-color: #f5faf8;
  width: 108px;
  height: 28px;
  color: #21c891;
  font-size: 12px;
  margin: 20px auto;
  line-height: 28px;
  text-align: center;
  border-radius: 14px;
}
.textmt10{
   display:inline-block;
}
.bpt10{
  vertical-align: -1.5px;
}
.daka {
  width: 100%;
  padding: 0 15px;
  margin-top: 16px;
  display: flex;
  display: -o-flex;
  display: -ms-flex;
  display: -moz-flex;
  display: -webkit-flex;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: hidden;
  zoom: 1;
  .dakaview {
    width: 165.5px;
    margin-bottom: 16px;
  }
}
</style>