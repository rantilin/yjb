<template>
  <div>
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{consultname}}</div>
        <div class="submitview">
          <cube-button class="submit" @click="submit">提交</cube-button>
        </div>
      </div>
    </div>
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
    <div class="consultpanelview">
      <cube-scroll class="consultpanels" ref="scroll">
        <div class="consultshow" v-if="state==1">
          <van-image class="consultpic" fit="cover" :src="doctormatching" />
          <div class="consultpriceview">
            <div class="pic"></div>
            <div class="name">图文咨询</div>
            <div class="price">￥{{buywayprice}}</div>
          </div>
        </div>
        <div class="consultshow" v-if="state==2">
          <van-image class="consultpic" fit="cover" :src="doctormatching" />
          <div class="consultpriceview">
            <div class="pics"></div>
            <div class="name">电话咨询</div>
            <div class="price">￥{{buywayprice}}</div>
          </div>
        </div>
        <div class="consultshow" v-if="state==3||state==4">
          <div class="doctor">
            <van-image class="pic" fit="cover" :src="expert_image" radius="50%" />
            <div class="detail">
              <div class="nameview">
                <span class="name">{{expert_name}}</span>
                <span class="zhuzhi">{{expert_title}}</span>
              </div>
              <div class="content">请描述你的性别、年龄、症状、就诊经历，我们将竭诚为你解答，及时解决您的问题</div>
            </div>
          </div>
        </div>
        <div class="consultipnutview" v-if="state==2||state==4">
          <span>手机号</span>
          <input class="consultipnut" placeholder="请填写手机号" v-model="value" @blur="blur" />
        </div>
        <div class="problem">
          <div class="problemtitle">问题描述</div>
          <textarea
            class="textarea"
            placeholder="请在此详细描述~"
            maxlength="500"
            v-model="textareas"
            @blur="blur"
          ></textarea>
          <div class="textmun">{{textnum}}/500</div>
        </div>
        <div class="uploadpic">
          <div class="uploadtitle">上传照片</div>
          <div class="uploadingimgs">
            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              multiple
              :max-count="3"
              @delete="del"
            >
              <div class="uploadpicview">
                <div class="uppicview">
                  <div></div>
                </div>
                <div class="uptext">点击上传</div>
              </div>
            </van-uploader>
            <div class="uploadrtext" v-show="filenum<1">请上传图片，让专家更准确的为您解答</div>
          </div>

          <DisCode :discountoption="buywayprice" @coreprice="discoucode"></DisCode>
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
          <cube-button
            class="pushchanges"
            data-current="3"
            @click="switchNav($event)"
            v-if="kamishow"
          >
            <div class="paykami"></div>
            <div class="paytext">卡密支付</div>
            <div :class="[payway==3?'changestyle-active':'changestyle']"></div>
          </cube-button>
        </div>
        <div class="clear"></div>
        <div class="siberian" v-if="activatecode.codeshow">
          <input
            type="text"
            placeholder="请输入卡密激活码"
            v-model="activatecode.textcode"
            class="siberipunt"
            UIReturnKeyDone
            @blur="blur"
          />
          <div class="jihuo" @click="activate">激活</div>
          <div class="clear"></div>
        </div>
        <div v-if="payshow">
          <cube-button
            class="immediatelybay"
            @click="buywaybtn"
            :disabled="disabled"
          >￥{{buywayprice}}&nbsp;{{buytext}}</cube-button>
        </div>
      </div>
    </van-action-sheet>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/consult'></script>
<style lang="scss" scoped>
@import '../assets/scss/consult.scss';
</style>