
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
        <div class="pages">
          <div class="doctordetail">
            <van-image
              class="doctorpic"
              fit="cover"
              :src="expert_image"
              radius="50%"
              @click="godoctor"
            />
            <div class="detail">
              <div class="title">
                <span class="name">{{expert_name}}</span>
                <span class="zhuzhi">{{expert_title}}</span>
              </div>
              <div class="address">{{expert_hospital}}</div>
            </div>
            <cube-button class="quiz" @click="godoctor">问Ta</cube-button>
          </div>
          <div class="askquestion">提问</div>
          <div class="questiontext">{{description}}</div>
          <div class="chakan" v-if="chakan==1">
            <div class="examinebtns">
              <cube-button class="examinebtn" @click="seeorder">￥{{questionsprice}}&nbsp;立即查看</cube-button>
            </div>
            <div class="examinebtext">{{num}}人已查看，点击查看</div>
          </div>

          <div class="chakan" v-if="chakan==2">
            <div class="yisheng">
              <van-image
                class="yishengpic"
                fit="cover"
                :src="expert_image"
                radius="50%"
                @click="godoctor"
              />
              <div class="yishengnamae">{{expert_name}}&emsp;回复</div>
            </div>
            <div class="yishengcontent">{{dialogue}}</div>
            <cube-button class="seemorebtn" @click="seemore">
              <div>
                <span>查看更多</span>
                <div></div>
              </div>
            </cube-button>
          </div>
          <div class="askquestion" v-if="relevantlist!=null">相关提问</div>
          <div class="hotissues" v-if="relevantlist!=null">
            <div class="hotissue" v-for="(item,index) in relevantlist" :key="index">
              <div class="hotissueview">
                <div class="hotissuepic"></div>
                <div class="hotissuetext">{{item.description}}</div>
              </div>
              <div class="hotissuedoctor">
                <div class="hotissuedoctorview">
                  <van-image
                    class="hcvdoctorpic"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50%"
                    @click="othergodoctor(item.expert_id)"
                  />
                  <cube-button
                    class="hcvdoctoranswer"
                    @click="examine(item.id)"
                  >精选问答{{questionsprice}}元查看</cube-button>
                </div>
                <div class="hotissuedoctordetail">
                  <span class="hcvdoctor">{{item.expert_name}}</span>
                  <span class="hcvaddress">{{item.expert_hospital}}</span>
                  <span class="hcvzhuzhidoctor">{{item.expert_title}}</span>
                </div>
              </div>
            </div>
            <!-- hotissue -->
          </div>
        </div>
      </cube-scroll>
    </div>
    <van-action-sheet v-model="show">
      <div class="models">
        <div class="close">
          <div class="closepic" @click="close"></div>
        </div>
        <div class="changepay">选择支付方式</div>
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
        <cube-button
          class="immediatelybay"
          @click="buywaybtn"
          :disabled="disabled"
        >￥{{questionsprice}}&nbsp;{{buytext}}</cube-button>
      </div>
    </van-action-sheet>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/issuedetail'></script>

<style lang="scss" scoped>
@import "../assets/scss/issuedetail.scss";
</style>