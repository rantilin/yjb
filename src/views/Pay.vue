
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div
      class="fromdatas"
      ref="fromdatas"
    ></div>
    <form
      id="pay_form"
      method="POST"
      action="https://mapi.alipay.com/gateway.do?"
    >
      <input
        type="hidden"
        name="_input_charset"
        value="utf-8"
      />
      <input
        type="hidden"
        name="body"
        value="关于产品的详情"
      />
      <input
        type="hidden"
        name="notify_url"
        value="http://www.yijiaobaozq.com/mobile/index.php?act=doalipay_Phone&op=new_notifyurl"
      />
      <input
        type="hidden"
        name="out_trade_no"
        :value="out_trade_no"
      />
      <input
        type="hidden"
        name="partner"
        :value="partner"
      />
      <input
        type="hidden"
        name="payment_type"
        :value="payment_type"
      />
      <input
        type="hidden"
        name="return_url"
        value="http://www.yijiaobaozq.com/mobile/index.php?act=doalipay_Phone&op=new_returnurl"
      />
      <input
        type="hidden"
        name="seller_id"
        :value="seller_id"
      />
      <input
        type="hidden"
        name="service"
        value="alipay.wap.create.direct.pay.by.user"
      />
      <input
        type="hidden"
        name="subject"
        :value="subject"
      />
      <input
        type="hidden"
        name="total_fee"
        :value="total_fee"
      />
      <input
        type="hidden"
        name="sign"
        :value="sign"
      />
      <input
        type="hidden"
        name="sign_type"
        value="MD5"
      />
      <div class="wrapper buy-wrapper">
        <a
          href="javascript:void(0);"
          class="J-btn-submit btn mj-submit btn-strong btn-larger btn-block"
          @click="tijiaobiaodan"
        >确认支付</a>
      </div>
    </form>
    <div class="videoclasspanelview">
      <cube-scroll
        class="videoclasspanels"
        ref="scroll"
      >
        <div class="page">
          <li
            class="comli"
            v-if="state!=6"
          >
            <van-image
              class="compic"
              fit="cover"
              :src="goods_image"
              radius="12px"
            />
            <div class="comdetail">
              <div class="comname">{{goods_name}}</div>
              <div class="num">
                <div class="price">￥{{goods_amount * discount}}</div>
                <div class="listen">{{goods_click}}人在{{listenorlook}}</div>
              </div>
            </div>
            <!-- 名师服务 -->
            <div
              class="teacherfw"
              v-if="markprice>0"
            >
              <div class="icon"></div>
              <div class="text">已选择指导老师一对一指导</div>
              <div class="price">￥{{markprice}}</div>
            </div>
            <!-- 名师服务结束 -->
            <div
              class="quanview"
              v-if="reduction_amount>0"
            >
              <div class="quanpic"></div>
              <div class="quantext">已减免<span class="price">￥{{reduction_amount}}</span></div>
            </div>
          </li>
          <li
            class="paygroup"
            v-if="state==6"
          >
            <van-image
              class="paygrouppic"
              fit="cover"
              :src="grouplist.goods_image"
              radius="12px"
            />
            <div class="paygroupview">
              <div class="paygrouptitle">{{grouplist.goods_name}}</div>
              <div class="paygrouptime">{{grouplist.start}}-{{grouplist.end}}</div>
              <div class="price">￥{{price}}</div>
            </div>
          </li>
          <ul
            class="msglistul"
            v-if="state==6"
          >
            <li class="msglistli">
              <span class="listlabel">孩子姓名</span>
              <span class="listname">{{orderusermsg.child_name}}</span>
            </li>
            <li class="msglistli">
              <span class="listlabel">孩子年龄</span>
              <span class="listname">{{orderusermsg.child_age}}</span>
            </li>
            <li class="msglistli">
              <span class="listlabel">年级</span>
              <span class="listname">{{orderusermsg.child_grades}}</span>
            </li>
            <li class="msglistli">
              <span class="listlabel">微信号</span>
              <span class="listname">{{orderusermsg.wechat_number}}</span>
            </li>
          </ul>
          <div class="pushchange">
            <cube-button
              class="pushchanges"
              data-current="1"
              @click="switchNav($event)"
            >
              <div class="paypic"></div>
              <div class="paytext">微信支付</div>
              <div :class="[payway==1?'changestyle-active':'changestyle']"></div>
            </cube-button>
            <cube-button
              class="pushchanges"
              data-current="2"
              @click="switchNav($event)"
            >
              <div class="paypics"></div>
              <div class="paytext">支付宝支付</div>
              <div :class="[payway==2?'changestyle-active':'changestyle']"></div>
            </cube-button>
            <cube-button
              class="pushchanges"
              data-current="3"
              @click="switchNav($event)"
            >
              <div class="paykami"></div>
              <div class="paytext">卡密支付</div>
              <div :class="[payway==3?'changestyle-active':'changestyle']"></div>
            </cube-button>
          </div>
          <div class="clear"></div>
          <div
            class="siberian"
            v-show="activatecode.codeshow"
          >
            <input
              type="text"
              placeholder="请输入卡密激活码"
              v-model="activatecode.textcode"
              class="siberipunt"
              UIReturnKeyDone
              @blur="blur"
            >
            <div
              class="jihuo"
              @click="activate"
            >激活</div>
            <div class="clear"></div>
          </div>
          <div :class="state!=6?'icc':'icc1'">
            <img
              src="../assets/image/danbaozf.png"
              alt=""
            >
          </div>
          <div class="agree" v-if="agreement == 1">
              <div :class="[isagree?'changestyle-active':'changestyle']" @click="changeisagree"></div>
              <div class="text"><span @click="changeisagree">我已阅读并同意</span><span class="linkchick" @click="gogree">《{{agreetext}}》</span></div>
          </div>
        </div>

      </cube-scroll>

    </div>

    <div v-if="payshow">
      <div
        class="bottombtn"
        v-if="state!=6"
      >
        <cube-button class="allpriceview">
          <div>
            <span class="alltext">{{text}}：</span>
            <span class="allprice">￥{{price}}</span>
          </div>
        </cube-button>
        <cube-button
          class="gobuy"
          @click="gobuy"
        >去支付</cube-button>
      </div>
      <div
        class="paybtngroupview"
        v-else
      >
        <cube-button
          class="paybtngroup"
          @click="gobuy"
        >立即支付</cube-button>
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/pay'></script>
<style lang="scss" scoped>
@import '../assets/scss/pay.scss';
</style>