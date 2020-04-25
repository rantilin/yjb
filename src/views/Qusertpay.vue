
<template>
  <div>
    <component-head :comname="comname"></component-head>
        <div class="fromdatas" ref="fromdatas"></div>
    <form id="pay_form" method="POST" action="https://mapi.alipay.com/gateway.do?">
      <input type="hidden" name="_input_charset" value="utf-8" />
      <input type="hidden" name="body" value="关于产品的详情" />
      <input
        type="hidden"
        name="notify_url"
        value="http://www.yijiaobaozq.com/mobile/index.php?act=doalipay_Phone&op=new_notifyurl"
      />
      <input type="hidden" name="out_trade_no" :value="out_trade_no" />
      <input type="hidden" name="partner" :value="partner" />
      <input type="hidden" name="payment_type" :value="payment_type" />
      <input
        type="hidden"
        name="return_url"
        value="http://www.yijiaobaozq.com/mobile/index.php?act=doalipay_Phone&op=new_returnurl"
      />
      <input type="hidden" name="seller_id" :value="seller_id" />
      <input type="hidden" name="service" value="alipay.wap.create.direct.pay.by.user" />
      <input type="hidden" name="subject" :value="subject" />
      <input type="hidden" name="total_fee" :value="total_fee" />
      <input type="hidden" name="sign" :value="sign" />
      <input type="hidden" name="sign_type" value="MD5" />
      <div class="wrapper buy-wrapper">
        <a
          href="javascript:void(0);"
          class="J-btn-submit btn mj-submit btn-strong btn-larger btn-block"
          @click="tijiaobiaodan"
        >确认支付</a>
      </div>
    </form>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" ref="scroll">
        <div class="page">
          <li class="comli">
            <van-image class="compic" fit="cover" :src="tw" radius="12px" v-if="class_order==3" />
            <van-image class="compic" fit="cover" :src="dh" radius="12px" v-if="class_order==4" />
            <van-image class="compic" fit="cover" :src="wd" radius="12px" v-if="class_order==5" />
            <div class="comdetail">
              <div class="comname" v-if="class_order==3">图文咨询</div>
              <div class="comname" v-if="class_order==4">电话咨询</div>
              <div class="comname" v-if="class_order==5">精品问答</div>
              <div class="dianhua"  v-if="class_order==4" >{{qusert_tel}}</div>
              <div class="content">{{description}}</div>
              <div class="price">￥{{order_amount}}</div>
            </div>
          </li>
          <div class="pushchange">
            <cube-button class="pushchanges" data-current="1" @click="switchNav($event)">
              <div class="paypic"></div>
              <div class="paytext">微信支付</div>
              <div :class="[payway==1?'changestyle-active':'changestyle']"></div>
            </cube-button>
            <cube-button class="pushchanges" data-current="2" @click="switchNav($event)">
              <div class="paypics"></div>
              <div class="paytext">支付宝支付</div>
              <div :class="[payway==2?'changestyle-active':'changestyle']"></div>
            </cube-button>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="bottombtn">
      <cube-button class="allpriceview">
        <div>
          <span class="alltext">合计：</span>
          <span class="allprice">￥{{order_amount}}</span>
        </div>
      </cube-button>
      <cube-button class="gobuy" @click="gobuy">去支付</cube-button>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/qusertpay'></script>
<style lang="scss" scoped>
@import "../assets/scss/qusertpay.scss";
</style>