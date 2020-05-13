<template>
  <div style="width:100%">
    <component-head :comname="comname"></component-head>
    <div class="panlesview">
      <cube-scroll class="loginpanels" ref="scroll">
        <div class="dldv">
          <div class="hy">欢迎你~</div>
          <div class="logininpt">
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
          </>
          <div class="xieyi">
            <div class="xieyiview">
              <div>
                <div class="xieyipic" @click="xieyi" :class="[xieyistyle?'xieyipic-active':'']"></div>
                <div class="agree">登录即表示你已阅读，并同意</div>
                <div class="zhence" @click="chakanxieyi">《医教宝用户隐私政策》</div>
              </div>
            </div>
          </div>
          <div class="submitview">
            <div class="loginsview">
              <cube-button
                :class="[loginscss?'submit-active':'submit']"
                type="submit"
                @click="loginsub"
                :disabled="logindis"
              >登录</cube-button>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <component-xieyi v-if="xieyihide" />
  </div>
</template>
<script src='../assets/js/login'></script>
<style lang="scss" scoped >
@import "../assets/scss/login.scss";
</style>
