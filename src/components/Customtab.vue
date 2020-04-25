<template>
  <div class="listviews">
    <div class="listtabview">
      <div class="person-wrap" ref="personWrap">
        <div :class="[type==1?'person-lists':'person-list']" ref="personTab">
          <ul :class="[type==1?'personlists':'personlist']" :style="{height:tabheight/37.5+'rem'}">
            <li
              :class="[type==1?'person-items':'person-item']"
              v-for="(item,indexes) in tablist"
              :key="indexes"
              @click="tabclick(indexes)"
              :style="{marginRight:marginright/clientWidth+'rem',height:tabheight/37.5+'rem',lineHeight:tabheight/37.5+'rem'}"
            >
              <div
                :style="{height:tabheight/37.5+'rem',lineHeight:tabheight/37.5+'rem',color:indexes==activeindex?avtive['avtivecolor']:defaultes['defaultcolor'],fontSize: indexes==activeindex ?avtive['avtivefont']/37.5+'rem':defaultes['defaultfont']/37.5+'rem',fontWeight: indexes==activeindex ?avtive['avtivebolds']:defaultes['defaultbolds']}"
                :class="[indexes==activeindex?activeanimation:'']"
              >{{item}}</div>
            </li>
          </ul>
          <div :class="[type==1?'lineviews':'lineview']" :style="{marginTop:linetop/37.5+'rem'}">
            <div :class="[type==1?'liness':'lines']">
              <div
                :class="[type==1?'linees':'line']"
                :style="{width:linewidth/clientWidth+'rem',borderRadius:borderradius/clientWidth+'rem',background:linebackground+'',height:lineheight/clientWidth+'rem',transform: 'translateX('+val/clientWidth+'rem)',transition: 'all 0.3s'}"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Customtab",
  props: [
    "arrlist",
    "ind",
    "pitch",
    "defaults",
    "fontscale",
    "labelheight",
    "marginR",
    "lineW",
    "shold",
    "borderR",
    "lineB",
    "lineH",
    "lineT",
    "layouttype",
    "layoutmax",
    "coerce"
  ],
  data() {
    return {
      clientWidth: "",
      tablist: [
        "标签1",
        "标签2",
        "标签3",
        "标签4",
        "标签5",
        "标签6",
        "标签7",
        "标签8"
      ], //标签数组
      val: "", //线条滚动的的距离
      index: 0, //默认下标
      activeindex: "", //判断选中下标改变颜色
      recordindex: 0, //记录点击下标值阻止再次点击执行
      avtive: {
        avtivecolor: "#ee4540", //选中颜色
        avtivefont: 15, //选中字体大小
        avtivebolds: "bold" //选中字体是否加粗
      },
      defaultes: {
        defaultcolor: "#2d132c", //默认颜色
        defaultfont: 15, //默认字体大小
        defaultbolds: "normal" //默认字体是否加粗
      },
      activeanimation: false, //字体缩放 默认关闭
      tabheight: 30,
      marginright: 30, //右边距
      linewidth: 20, //线条宽度
      swipethreshold: 2, //滚动阈值，标签数量超过多少个可滚动  默认加1在第【3】个开始滚动
      borderradius: 1.5, //线条圆角
      linebackground: "#ee4540", //线条背景色可以为渐变
      lineheight: 3, //线条高度
      linetop: 6, //线条上边距
      type: 2, //1代表flex等分布局，2代表宽度自适应排列 当【type】设置为1时 【flexlength】默认为4 【coercetype】默认关闭
      flexlength: 4, //默认使用两种布局 超过4个【type】改为2  宽度排位为自适应 小于4个就为等分布局
      coercetype: false //强制布局，开启就不会改变布局状态 【felx】不会根据数组长度自动排列，默认关闭
    };
  },
  methods: {
    //初始化组件组件样式
    init() {
      //数组
      this.arrlist != undefined && (this.tablist = this.arrlist);
      //初始下标
      this.ind != undefined && (this.index = parseInt(this.ind));
      //选中样式
      this.pitch != undefined &&
        ((this.avtive["avtivecolor"] = this.pitch["color"]),
        (this.avtive["avtivefont"] = this.pitch["font"]),
        (this.avtive["avtivebolds"] = this.pitch["fontbold"]));
      //默认样式
      this.defaults != undefined &&
        ((this.defaultes["defaultcolor"] = this.defaults["color"]),
        (this.defaultes["defaultfont"] = this.defaults["font"]),
        (this.defaultes["defaultbolds"] = this.defaults["fontbold"]));
      //字体是否缩放
      if (this.fontscale != undefined) {
        if (this.fontscale == "true") {
          this.activeanimation = "activeanimation";
        }
      }
      //标签高度
      this.labelheight != undefined &&
        (this.tabheight = parseFloat(this.labelheight));
      //右边距
      this.marginR != undefined &&
        (this.marginright = parseFloat(this.marginR));
      //线条宽度
      this.lineW != undefined && (this.linewidth = parseFloat(this.lineW));
      //滚动阈值
      this.shold != undefined && (this.swipethreshold = parseInt(this.shold));
      //线条圆角
      this.borderR != undefined &&
        (this.borderradius = parseFloat(this.borderR));
      //线条背景色
      this.lineB != undefined && (this.linebackground = this.lineB);
      //线条高度
      this.lineH != undefined && (this.lineheight = parseFloat(this.lineH));
      //线条上边距
      this.lineT != undefined && (this.linetop = parseFloat(this.lineT));
      //布局类型
      this.layouttype != undefined && (this.type = parseInt(this.layouttype));
      //超过最大值改为自适应宽度
      this.layoutmax != undefined &&
        (this.flexlength = parseInt(this.layoutmax));
      //不论标签数量多少都强制布局
      if (this.coerce != undefined) {
        if (this.coerce == "true") {
          this.coercetype = true;
        } else {
          this.coercetype = false;
        }
      }
    },
    tabclick(index) {
      if (this.activeindex == index) {
        return false;
      } else {
        this.activeindex = index;
      }
      this.$emit("click", index);
      this.lineway(index);
      this.offsetanme(index);
    },
    //根据滚动阈值（点击标签自动滚动）
    offsetanme(index) {
      if (this.type == 1) {
        return false;
      }
      if (this.recordindex == index) {
        return false;
      } else {
        this.recordindex = index;
      }
      if (
        this.$refs.personTab.offsetWidth < this.$refs.personWrap.offsetWidth
      ) {
        return false;
      }
      if (
        index > this.swipethreshold &&
        index <= this.tablist.length - 1 - this.swipethreshold
      ) {
        let scrollwidth = 0;
        for (let i = 0; i < index; i++) {
          if (i >= this.swipethreshold) {
            scrollwidth +=
              document.getElementsByClassName("person-item")[i].offsetWidth +
              this.marginright;
          }
        }
        let lastwidth =
          this.$refs.personTab.offsetWidth - this.$refs.personWrap.offsetWidth;
        if (scrollwidth > lastwidth) {
          this.$nextTick(() => {
            this.scrollbetter.scrollTo(-lastwidth, 0, 300);
          });
        } else {
          this.$nextTick(() => {
            this.scrollbetter.scrollTo(-scrollwidth, 0, 300);
          });
        }
      }

      if (index <= this.swipethreshold) {
        this.$nextTick(() => {
          this.scrollbetter.scrollTo(0, 0, 300);
        });
      }
      if (index > this.tablist.length - 1 - this.swipethreshold) {
        let lastwidth =
          this.$refs.personTab.offsetWidth - this.$refs.personWrap.offsetWidth;
        this.$nextTick(() => {
          this.scrollbetter.scrollTo(-lastwidth, 0, 300);
        });
      }
    },
    //计算线条滚动距离
    lineway(index) {
      if (this.type == 1) {
        let listlinewidth = 0;
        for (var i = 0; i <= index; i++) {
          listlinewidth += parseFloat(
            document.getElementsByClassName("person-items")[i].offsetWidth
          );
        }
        let oneiwdth = document.getElementsByClassName("person-items")[0]
          .offsetWidth;
        let oneoffleft = (oneiwdth - this.linewidth) / 2;
        this.val = listlinewidth + oneoffleft - oneiwdth;
      }
      if (this.type == 2) {
        let listlinewidth = 0;
        setTimeout(() => {
          for (var i = 0; i <= index; i++) {
            listlinewidth += parseFloat(
              document.getElementsByClassName("person-item")[i].offsetWidth
            );
          }
          this.val =
            listlinewidth +
            this.marginright * index -
            this.linewidth -
            (document.getElementsByClassName("person-item")[index].offsetWidth -
              this.linewidth) /
              2;
        }, 10);
      }
    },
    //计算scroll长度并且初始化better-scroll
    personScroll() {
      if (this.type == 2) {
        let widthli = 0;
        for (let i in this.tablist) {
          widthli += parseFloat(
            document.getElementsByClassName("person-item")[i].offsetWidth
          );
        }
        let width = widthli + this.marginright * (this.tablist.length - 1);
        this.$refs.personTab.style.width = width + "px";
      }
      this.$nextTick(() => {
        if (!this.scrollbetter) {
          this.scrollbetter = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scrollbetter.refresh();
        }
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.activeindex = this.index;
    if (this.coercetype == false) {
      if (this.tablist.length > this.flexlength) {
        this.type = 2;
      }
    }
    if (this.type == 1) {
      this.marginright = 0;
    }

    this.$nextTick(() => {
      this.lineway(this.index);
      this.personScroll();
      this.offsetanme(this.index);
    });
    this.clientWidth = document.body.clientWidth / 10;
    window.onresize = () => {
      this.clientWidth = document.body.clientWidth / 10;
    };
  },
  watch: {
    arrlist() {
      this.$nextTick(() => {
        this.tablist = this.arrlist;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.listviews {
  float: left;
  width: 100%;
}
.listtabview {
  float: left;
  width: 100%;
}
.person-wrap {
  width: 100%;
  // overflow: hidden;
  .person-list {
    white-space: nowrap;
    .personlist {
      // border: 1px solid red;
      width: auto;
      height: auto;
      .person-item {
        display: inline-block;
        // border: 1px solid red;
        vertical-align: text-top;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .lineview {
      .lines {
        white-space: nowrap;
      }
    }
  }
  .person-lists {
    width: 100%;
    float: left;
    .personlists {
      width: 100%;
      float: left;
      display: flex;
      .person-items {
        flex: 1;
        div {
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-all;
        }
      }
    }
    .lineviews {
      float: left;
      width: 100%;
      .liness {
        float: left;
        width: 100%;
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
.activeanimation {
  animation: scale 0.3s;
}
</style>
