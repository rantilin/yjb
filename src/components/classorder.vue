<template>
  <div
    class="mengceng"
    v-show="show"
  >
    <div
      class="mengcengview"
      @click.self="mengcengview()"
    >

      <div class="modelbottombtn">

        <cube-scroll
          class="mengcengviews"
          ref="scrolls"
          v-show="allbuy==false"
        >
          <template v-if="goodsStatezj == 0 || goods_state_chapter == 1">
          <div class="selections">
            <div class="btsses">
              <div
                class="btss"
                v-for="(item,index) in videolist"
                :key="index"
              >
                <cube-button
                  class="ctxtli"
                  :class="{ctxtlis:arr.includes(index)}"
                >
                  <div class="btnviews">
                    <div class="btn1">{{index+1}}</div>
                    <div
                      class="btn2"
                      v-if="item.freession==1"
                    >免费</div>
                    <div
                      class="btn2"
                      v-if="item.freession!=1"
                    >￥{{item.video_price}}</div>
                  </div>
                  <input
                    class="cks"
                    type="checkbox"
                    :value="item.vo_id+','+item.video_price"
                    v-model="checkedNames"
                    :disabled="item.freession==1||item.gm==1?true:false"
                    @click="checkedBox(index,item)"
                  />
                  <div :class="item.freession==1||item.gm==1?'jinyong':'offjinyong'">
                    <div class="btnviewse">
                      <div class="btn1e">{{index+1}}</div>
                      <div
                        class="btn2e"
                        v-if="item.freession==1"
                      >免费</div>
                      <div
                        class="btn2e"
                        v-if="item.freession!=1"
                      >已购买</div>
                    </div>
                  </div>
                </cube-button>
              </div>
            </div>
          </div>
          </template>
          <template v-else>
            <chapterbuy
              :listdata="chapterlist"
              :quanxuan="quanxuan"
              @section="section"
            ></chapterbuy>
          </template>
        </cube-scroll>

        <div
          class="quanxuan"
          v-show="allbuy==false"
        >
          <div
            class="quanxuanview"
            @click="checkall"
          >
            <div :class="[quanxuan?'xieyipic-active':'xieyipic']"></div>
            <div class="quanxuantext">全选</div>
          </div>
        </div>

        <div
          class="allbuy"
          v-show="allbuy"
        >
          <div class="leftimg">
            <img
              :src="goods_image"
              alt=""
            >
          </div>
          <div class="rightext">
            <div class="itemtitle">{{goods_name}}</div>
            <div class="itemdetl">{{goods_jingle}}</div>
            <div class="itemprice">￥{{discountoption}}</div>
          </div>
        </div>

        <div
          class="goodsgift"
          v-if="goodsstategift!=0"
        >
          <div class="icon"></div>
          <div class="text">精美礼物</div>
          <div
            class="yhm_select"
            @click="giftoff"
          >
            <div
              class="offgift"
              v-if="gift.isunfold"
            >收起</div>
            <div
              class="offgift"
              v-else
            >展开</div>
          </div>
        </div>
        <div
          class="goodgiftvm"
          v-if="gift.isunfold"
        >
          <img
            class="giftimg"
            :src="gift.conditiondata.adv_image"
          >
          <div class="giftcontent">
            <div class="giftitle">
              <div class="icon"></div>
              <div class="text">赠品</div>
            </div>
            <div class="content">{{gift.conditiondata.describes}}</div>
          </div>
        </div>

        <div class="discode">
          <DisCode
            :discountoption="discountoption"
            @discount="discount"
          ></DisCode>
        </div>
        <ul class="opntextwarnpic">
          <li class="li">
            <div
              class="quanview"
              v-for="(item,index) in quan"
              :key="index"
            >
              <div class="quanpic"></div>
              <div class="quantext">满{{item.gao}}减{{item.di}}</div>
            </div>
          </li>
          <li>
            <div class="tuiview">
              <div class="tuiimage"></div>
              <div class="tuitext">#医教宝承诺，课程无帮助可联系大童退款</div>
            </div>
          </li>
        </ul>

        <div class="allpriceview">
          <div class="buttomgo">
            <span class="alltext">合计：</span>
            <span class="allprice">
              <p
                v-if="DiscountsVerify"
                class="zhprice"
              >￥{{yjprice}}</p>
              <p>￥{{discountoption}}</p>
            </span>
          </div>
        </div>
        <cube-button
          class="gobuy"
          @click="buyclass(classid)"
          :disabled="disabled"
        >去支付</cube-button>

      </div>
    </div>
  </div>
</template>
<script>
import DisCode from '@/components/DisCode'
import chapterbuy from '@/components/chapterbuy'
import groupapi from "@/api/groupclassApi";
export default {
  name: 'classorder',
  components: {
    DisCode,
    chapterbuy,
  },
  props: {
    orderdata: {
      type: [Array, String, Object],
      default: [],
    },
    ordershow: {
      type: Boolean,
      default: false,
    },
    videolist: {
      type: [Array, String, Object],
      default: [],
    },
    chapterlist: {
      type: [Array, String, Object],
      default: [],
    },
    secret:{
      type:[String,Number],
      default:''
    }
  },

  data() {
    return {
      classid: this.$route.query.classid,
      classtype: this.$route.query.state, //1是视频，2是音频
      key: this.$store.state.key.value,
      show: this.ordershow,
      arr: [], //选中数据
      quan: [],
      quanxuan: false, //是否全选
      yjprice: 0, //原价
      DiscountsVerify: false,
      checkedNames: [],
      allbuy: false,
      goodsStatezj: 0,
      goods_state_chapter: 0, //是否开启小结购买
      discountoption: 0,
      disabled: false,
      zekou: 1,
      goods_sample: 0, //开启咨询
      goodsstategift: 0, //是否开启礼物
      gift: {
        isunfold: false,
        datalist: [],
        conditiondata: [], //满足条件
      },
      optionvalue: '',
      goods_discount: '',
      goods_complete: 0,
      goods_name:'',
      goods_jingle:'',
      goods_image:'',
      codeDiscount:{},
      DiscountsVerify:false,
    }
  },
  created() {},
  methods: {
    checkedBox(i) {
      if (this.arr.includes(i)) {
        this.arr = this.arr.filter(function (ele) {
          return ele != i
        })
      } else {
        this.arr.push(i)
      }
    },
    checkall() {
      if (this.quanxuan) {
        this.checkedNames = []
        this.quanxuan = false
        for (let i in this.videolist) {
          this.arr = this.arr.filter(function (ele) {
            return ele != i
          })
        }
      } else {
        this.quanxuan = true
        this.checkedNames = []
        for (let i in this.videolist) {
          if (this.videolist[i].freession == 0 && this.videolist[i].gm != 1) {
            this.arr.push(parseFloat(i))
            this.checkedNames.push(
              this.videolist[i].vo_id + ',' + this.videolist[i].video_price
            )
          }
        }
      }
    },
    section(value) {
      //章节购买组件传值
      this.checkedNames = value
    },
    mengcengview() {
      this.show = false
    },
    buyclass(id) {
       groupapi.order(this.key, 2, this.classtype, this.optionvalue, id, this.discountoption, this.order_pay, this.codeDiscount,this.gift.conditiondata.id,this.secret).then(res => {
                            this.disabled = false;
                            this.$router.push({
                                name: 'pay',
                                query: {
                                    id: id,
                                    state: 1,
                                    pay_sn: res.data.datas.pay_sn,
                                }
                            })
                        }).catch(err => {
                            if (err.message != "interrupt") {
                                let errmsg = '请求失败';
                                if (err.message.includes('timeout')) {
                                    errmsg = "请检查网络再刷新重试"
                                }
                                this.toast(errmsg);
                            }
                        });
    },
    discount(value, price,codeDiscount,DiscountsVerify) {
      this.zekou = value
      this.discountoption = price
      this.codeDiscount = codeDiscount
      this.DiscountsVerify = DiscountsVerify
    },
    giftoff() {
      //礼物展开闭合

      if (this.gift.isunfold) {
        this.gift.isunfold = false
      } else {
        if (this.gift.conditiondata.length != 0) {
          this.gift.isunfold = true
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {})
  },
  watch: {
    orderdata(val, oldval) {
      if (val != oldval) {
        this.goodsStatezj = val.brief.goods_state_zj
        this.goods_state_chapter = val.brief.goods_state_chapter
        this.goodsstategift = parseInt(val.brief.goods_state_gift) //开启礼物
        this.gift.datalist = val.brief.goods_state_gift_info
        
       

        this.goods_discount = val.brief.goods_discount
        let discounts = this.goods_discount.split(',')
        let arrdis = ''
        for (let i in discounts) {
          arrdis += discounts[i].split('-') + ','
        }
        arrdis = arrdis.substring(0, arrdis.length - 1)
        let disarr = arrdis.split(',')
        let jishu = []
        let oushu = []
        for (let j in disarr) {
          if (j % 2 == 0) {
            oushu.push(disarr[j])
          } else {
            jishu.push(disarr[j])
          }
        }
        let quan = []
        for (let p in jishu) {
          quan.push({
            gao: oushu[p],
            di: jishu[p],
            index: p,
          })
        }
        this.quan = quan
        this.goods_complete = val.brief.goods_complete;

        this.goods_image = val.brief.goods_image;
        this.goods_name = val.brief.goods_name;
        this.goods_jingle = val.brief.goods_jingle;
        if (parseInt(this.goods_complete) == 1) {
          this.allbuy = true
          this.checkall()
        } else {
          this.allbuy = false
        }
      }
    },
    ordershow(val) {
      this.show = val
      if (val) {
        this.$nextTick(() => {
          this.$refs.scrolls.enable()
          this.$refs.scrolls.refresh()
        })
      }
    },
    show(val) {
      this.$emit('update:ordershow', val)
    },
    checkedNames() {
      var ckallarr = []
      for (let i in this.videolist) {
        if (this.videolist[i].freession == 0 && this.videolist[i].gm != 1) {
          ckallarr.push(
            this.videolist[i].vo_id + ',' + this.videolist[i].video_price
          )
        }
      }
      if (ckallarr.length == this.checkedNames.length) {
        this.quanxuan = true
      } else {
        this.quanxuan = false
      }
      var optionval = []
      var allprice = 0
      for (let i in this.checkedNames) {
        var spval = this.checkedNames[i].split(',')
        if (spval[0].length > 0) {
          optionval.push(spval[0])
          allprice += parseFloat(spval[1])
        }
      }
      var ckvals = ''
      ckvals += optionval + ','
      this.optionvalue = ckvals.substring(0, ckvals.length - 1)
      this.discountoption = allprice.toFixed(2)
      var arrquan = []
      var qian = this.discountoption
      let jian
      var mjmax = false
      for (let p in this.quan) {
        if (qian >= parseFloat(this.quan[p].gao)) {
          jian = this.quan[p].index

          mjmax = true
        }
      }
      let liwu = false
      this.gift.conditiondata = []
      for (let w in this.gift.datalist) {
        if (qian >= parseFloat(this.gift.datalist[w].gift_price)) {
          liwu = true
          this.gift.conditiondata = this.gift.datalist[w]
          this.gift.isunfold = true
        }
      }
      if (this.gift.conditiondata.length == 0) {
        this.gift.isunfold = false
      }
      var prices
      if (mjmax) {
        Notify({
          message:
            '已为您自动选择满' +
            this.quan[jian].gao +
            '减' +
            this.quan[jian].di +
            '的优惠券',
          type: 'success',
          duration: 1000,
        })
        this.yjprice = (qian - this.quan[jian].di).toFixed(2)
        this.discountoption = (
          (qian - this.quan[jian].di) *
          this.zekou
        ).toFixed(2)
      } else {
        this.yjprice = qian
        this.discountoption = (qian * this.zekou).toFixed(2)
      }
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/common.scss';
.mengceng {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  height: 100%;
  background: rgb(0, 0, 0, 0.7);

  .mengcengview {
    width: 100%;
    height: 100%;
    bottom: 0;
    position: relative;

    .mengcengviews {
      width: 100%;
      height: 280px;
      background: $bcf;
      border-radius: 12px 12px 0 0;
    }
  }
}
.selections {
  width: 100%;
  height: auto;
}
.btsses {
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
}

.btss {
  position: relative;
  width: 51px;
  height: 51px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.ctxtli {
  background: #f7f9fc;
  width: 51px;
  height: 51px;
  border-radius: 6px;
  padding: 0;
  text-align: center;
  float: left;
  position: relative;
  display: flex;
  align-items: center;

  .btnviews {
    width: 100%;

    .btn1 {
      width: 100%;
      text-align: center;
      color: #bfbfbf;
      font-size: 22px;
      font-weight: bold;
    }

    .btn2 {
      margin-top: 1px;
      width: 100%;
      text-align: center;
      text-align: center;
      color: #bfbfbf;
      font-size: 10px;
      margin-top: 3px;
    }
  }
}

.ctxtlis {
  background: #21c891;
  width: 51px;
  height: 51px;
  border-radius: 6px;
  padding: 0;
  text-align: center;
  float: left;
  position: relative;
  display: flex;
  align-items: center;

  .btnviews {
    width: 100%;

    .btn1 {
      float: left;
      width: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }

    .btn2 {
      margin-top: 1px;
      float: left;
      width: 100%;
      text-align: center;
      text-align: center;
      color: #ffffff;
      font-size: 10;
      transform: scale(0.83, 0.83);
    }
  }
}

.cks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 5;
}
.jinyong {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d8d8d8;
  border-radius: 6px;
  display: flex;
  align-items: center;

  .btnviewse {
    width: 100%;

    .btn1e {
      width: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }

    .btn2e {
      margin-top: 1px;
      float: left;
      width: 100%;
      text-align: center;
      text-align: center;
      color: #ffffff;
      font-size: 10;
      transform: scale(0.83, 0.83);
    }
  }
}
.opntextwarnpic {
  width: 100%;
  height: 50px;
  padding: 0 20px;

  li {
    // height: 50px;
    display: flex;
    align-items: center;
    // margin-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;

    .quanview {
      display: flex;
      margin-right: 15px;

      .quanpic {
        width: 14px;
        height: 11px;
        background: url('../assets/image/quan.png');
        background-size: 100% 100%;
      }

      .quantext {
        font-size: 13px;
        color: #999999;
        margin-left: 6px;
      }
    }
  }

  li:first-child {
    margin-left: 0px;
  }
}

.quanxuan {
  width: 100%;
  height: 40px;
  padding: 0 15px;
}

.quanxuanview {
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}

.quanxuantext {
  font-size: 14px;
  float: left;
  margin-right: 10px;
}
.xieyipic {
  float: left;
  height: 20px;
  width: 20px;
  background-size: 100% 100%;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid rgb(172, 175, 191);
}

.xieyipic-active {
  margin-left: auto;
  height: 20px;
  width: 20px;
  background-size: 100% 100%;
  border-radius: 50%;
  margin-right: 10px;
  border: none;
  background: url(../assets/image/pitchon.png) no-repeat;
  background-size: 100% 100%;
  animation: alia 0.3s;
}
@keyframes alia {
  0% {
    transform: scale(0.3);
  }

  100% {
    transform: scale(1);
  }
}

.offjinyong {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.jinyong {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d8d8d8;
  border-radius: 6px;
  display: flex;
  align-items: center;

  .btnviewse {
    width: 100%;

    .btn1e {
      width: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }

    .btn2e {
      margin-top: 1px;
      width: 100%;
      text-align: center;
      text-align: center;
      color: #ffffff;
      font-size: 10;
      transform: scale(0.83, 0.83);
    }
  }
}
.modelbottombtn {
  width: 100%;
  position: absolute;
  background-color: $bcf;
  border-radius: 12px 12px 0 0;
  bottom: 0;

  .allpriceview {
    float: left;
    width: 40%;
    height: 50px;
    padding: 0;
    background: $bcf;
    display: flex;
    justify-content: center;

    .buttomgo {
      overflow: auto;
      zoom: 1; //处理兼容性问题
      padding-top: 10px;
      .alltext {
        float: left;
        color: $bt;
        font-size: 13px;
        font-weight: bold;
      }

      .allprice {
        float: left;
        color: $jg;
        font-size: 13px;
        font-weight: bold;
      }

      .zhprice {
        text-decoration: line-through;
      }
    }
  }
  .gobuy {
    float: left;
    width: 60%;
    height: 50px;
    padding: 0;
    background: $theme;
    color: $bcf;
    font-size: 16px;
    font-weight: bold;
  }
}
.opntextwarnpic {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  overflow: hidden;
  zoom: 1;

  li {
    // height: 50px;
    float: left;
    display: flex;
    align-items: center;
    // margin-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;

    .quanview {
      float: left;
      display: flex;
      margin-right: 15px;

      .quanpic {
        float: left;
        width: 14px;
        height: 11px;
        background: url('../assets/image/quan.png');
        background-size: 100% 100%;
      }

      .quantext {
        font-size: 13px;
        color: #999999;
        float: left;
        margin-left: 6px;
      }
    }
  }

  li:first-child {
    margin-left: 0px;
  }
}
.tuiview {
  display: flex;
  .tuitext {
    color: #999999;
    font-size: 13px;
    margin-top: 4px;
    margin-left: 5px;
  }
  .tuiimage {
    background-image: url('../assets/image/tui.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.discode {
  padding: 5px 15px;
}
.goodsgift {
  //赠送礼品
  width: 100%;
  height: 30px;
  padding: 5px 15px;
  margin: auto;
  box-sizing: border-box;
  zoom: 1;
  .icon {
    float: left;
    width: 17px;
    height: 17px;
    margin-top: 3px;
    margin-left: 3px;
    background: url('../assets/image/gift.png');
    background-size: 100% 100%;
  }

  .text {
    width: 80%;
    font-size: 14px;
    float: left;
    color: #666666;
    line-height: 22px;
    text-indent: 10px;
  }

  .yhm_select {
    width: 8%;
    float: right;
    .offgift {
      font-size: 12px;
      line-height: 20px;
      color: #21c891;
      text-align: center;
    }
    .giftadd {
      width: 16px;
      height: 16px;
      background: url('../assets/image/giftadd.png') no-repeat center
        center/100%;
    }
    .giftdel {
      width: 16px;
      height: 16px;
      background: url('../assets/image/giftdel.png') no-repeat center
        center/100%;
    }
  }
}
.goodgiftvm {
  width: 343px;
  height: 81px;
  margin: 5px auto;
  background: #f7f9fc;
  display: flex;
  .giftimg {
    width: 65px;
    height: 65px;
    margin: 8px 12px 8px 12px;
  }
  .giftcontent {
    width: 242px;
    .giftitle {
      width: 100%;
      margin-top: 8px;
      display: flex;
      .icon {
        width: 21px;
        height: 21px;
        background: url('../assets/image/gifticon.png') no-repeat center
          center/100%;
        margin-right: 8px;
      }
      .text {
        font-size: 14px;
        line-height: 22px;
        color: #ff6633;
        font-weight: bold;
      }
    }
    .content {
      margin-top: 8px;
      color: #333333;
      width: 100%;
      font-size: 12px;
      line-height: 18px;
    }
  }
}
.allbuy {
    padding: 20px 16px 20px 16px;
    border-bottom: #EBEFF5 solid 1px;
    margin-bottom: 20px;
    overflow: hidden;
    zoom: 1;

    .leftimg {
        width: 140px;
        height: 92px;
        float: left;

        img {
            width: 100%;
        }
    }

    .rightext {
        width: 200px;
        float: left;
        padding-left: 12px;

        .itemtitle {
            color: #333333;
            font-size: 16px;
            margin: 4px 0 8px 0;
            font-weight: bold;
        }

        .itemdetl {
            color: #666666;
            font-size: 13px;
            margin-bottom: 12px;
        }

        .itemprice {
            color: #FF6633;
            font-size: 13px;
        }
    }
}

</style>