<template>
  <div style="width:100%">
    <component-head :comname="comname"></component-head>
    <div class="panlesview">
      <cube-scroll class="loginpanels" ref="scroll">
        <div class="dldv">
          <div class="hy">{{title}}</div>
          <div class="hz">{{content}}</div>
          <div class="logininpt">
            <div class="phone-box">
                <div class="phone-image"></div>
                <div class="phone-text">手机</div>
            </div>
            <cube-input
              v-model="value"
              :placeholder="placeholder"
              :type="type"
              :maxlength="maxlength"
              :autofocus="autofocus"
              :autocomplete="autocomplete"
              :clearable="clearable"
              @blur="blur"
              @input="phoneinput"
            ></cube-input>
            <div class="yzm-box">
                <div class="yzm-image"></div>
                <div class="yzm-text">验证码</div>
            </div>
            <div class="yzm">
              <cube-input
                v-model="yzmvalue"
                :placeholder="yzmplaceholder"
                :type="yzmtype"
                :maxlength="yzmmaxlength"
                :autofocus="yzmautofocus"
                :autocomplete="yzmautocomplete"
                @blur="blur"
                :clearable="yzmclearable"
              ></cube-input>
              <button @click="huoquyzm" :disabled="yzmdis">{{yzmtext}}</button>
            </div>
          </div>
       
          <div class="submitview">
            <div class="loginsview">
              <cube-button
                class="submit-active"
                type="submit"
                @click="loginsub()"
                :disabled="logindis"
              >{{setid==1?'确认修改':'确认绑定'}}</cube-button>
            </div>
          </div>
             <div class="xieyi">
            <div class="xieyiview">
              <div>
                <!-- <div class="xieyipic" @click="xieyi" :class="[xieyistyle?'xieyipic-active':'']"></div> -->
                <div class="agree">确认绑定表示你已同意</div>
                <div class="zhence" @click="chakanxieyi">《医教宝用户协议》</div>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <component-xieyi v-if="xieyihide" />
  </div>
</template>
<script src='../assets/js/binding'></script>
<style lang="scss" scoped >
@import "../assets/scss/binding.scss";
</style>