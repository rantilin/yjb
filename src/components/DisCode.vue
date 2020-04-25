<template>
  <div class="yqmcode clear">
    <div class="InvitationCode">
      <div class="icon"></div>
      <div class="text">使用邀请码，没有可不填</div>
      <div class="yhm_select" @click="checkDiscountsode">
        <div :class="[DiscountsCode?'xieyipic-active':'xieyipic']"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="codeInput" v-show="DiscountsCode">
      <div class="code">
        <input
          type="text"
          placeholder="输入您的专属邀请码"
          v-model="yqmCode"
          v-on:input="yzcode"
          :disabled="DiscountsVerify"
          UIReturnKeyDone
          @blur="blur"
        />
        <div :class="[DiscountsVerify?'onstate':'offstate']" v-if="focusDis"></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import classapi from '@/api/ClassApi'
import { Toast } from 'vant'
export default {
  name: 'DisCode',
  props: ['discountoption'],
  data() {
    return {
      key: this.$store.state.key.value,
      DiscountsCode: false,
      DiscountsVerify: false,
      focusDis: false,
      yqmCode: '',
      codeDiscount: {},
      zekou: 1
    }
  },
  methods: {
    closeWechat() {
      this.wechatdata = false
    },
    checkDiscountsode() {
      if (this.DiscountsCode) {
        this.DiscountsCode = false
      } else {
        this.DiscountsCode = true
      }
    },
    blur() {
      setTimeout(() => {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight, 0))
      }, 10)
    },
    yzcode() {
      let qian = this.discountoption
      if (this.yqmCode.length >= 1) {
        this.focusDis = true
      }
      if (this.yqmCode.length >= 6) {
        classapi
          .yqmcode(this.key, this.yqmCode)
          .then(res => {
            if (res.data.datas.error != null) {
              this.DiscountsVerify = false
              Toast.fail(res.data.datas.error)
              this.zekou = 1
            } else {
              if (res.data.datas != 0) {
                if (res.data.datas.status == 1) {
                  this.DiscountsVerify = true
                  this.zekou = res.data.datas.discount / 100
                  this.codeDiscount.code_result = 1
                  this.codeDiscount.tationcode = res.data.datas.tationcode
                  this.codeDiscount.discount = res.data.datas.discount
                  this.$emit(
                    'coreprice',
                    (qian * this.zekou).toFixed(2),
                    this.codeDiscount
                  )

                  Toast(
                    `邀请码验证成功，您已获得专属${res.data.datas.discount /
                      10}折优惠`
                  )
                }
              } else {
                Toast.fail(`邀请码错误！请重新输入`)
                this.yqmCode = ''
                this.DiscountsVerify = false
                this.zekou = 1
              }
            }
          })
          .catch(err => {
            if (err.message != 'interrupt') {
              let errmsg = '请求失败'
              if (err.message.includes('timeout')) {
                errmsg = '请检查网络再刷新重试'
              }
              this.toast(errmsg)
            }
          })
      } else {
        this.DiscountsVerify = false
      }
    }
  },
  watch: {},
  created() {}
}
</script>
<style lang='scss' scoped>
.clear {
  clear: both;
}
.yqmcode {
  width: 100%;
}
.InvitationCode {
  width: 100%;
  height: 30px;
  margin: auto;
  .icon {
    float: left;
    width: 20px;
    height: 20px;
    background: url('../assets/image/yqcode.png');
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
    width: 6%;
    float: right;
  }
}
.codeInput {
  width: 100%;
  line-height: 40px;
  margin: 10px auto;
  float: left;
  .code {
    width: 100%;
    background: #f7f9fc;
    padding: 8px 8px;
    box-sizing: border-box;
  }
  .code input {
    background: #f7f9fc;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    float: left;
    width: 90%;
  }
  .code .onstate {
    float: right;
    width: 20px;
    height: 20px;
    background: url('../assets/image/pass.png') no-repeat center/100%;
  }
  .code .offstate {
    float: right;
    width: 20px;
    height: 20px;
    background: url('../assets/image/nopass.png') no-repeat center/100%;
  }
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
</style>

