
<template>
  <div>
    <!-- <component-head :comname="comname"></component-head> -->
    <div class="commontitles">
      <div class="commontitle">
        <!-- <div class="commonback">
          <div class="commonbackpic"></div>
        </div> -->
        <div class="commontitlename">{{comname}}</div>
      </div>
    </div>
    <div class="babytopanelview" id="babytopanelview">
      <cube-scroll class="babytopanels" ref="scroll">
        <div class="page">
          <div class="xgwttitle">相关问题</div>
          <ul class="wtul">
            <cube-button
              v-for="(item,index) in wtlist"
              :key="index"
              @click="listbtn(index,item.id)"
              :class="[index==currentTab?'wtlist-active':'wtlist']"
            >{{item.name}}</cube-button>
          </ul>
          <div class="xgwttitle">补充详情</div>
          <textarea
            class="textarea"
            id="textarea"
            placeholder="请写下你的意见或建议"
            maxlength="200"
            v-model="textareas"
            @focus="upkeys"
            @blur="blur"
          ></textarea>
          <div class="textmun">{{textnum}}/200</div>
          <div class="xgwttitle">联系方式</div>
          <div class="dianhua">
            <cube-input
              id="dianhuas"
              class="dianhuas"
              v-model="value"
              :placeholder="placeholder"
              :maxlength="maxlength"
              :autocomplete="autocomplete"
              :clearable="clearable"
              @focus="upkey"
              @blur="blur"
            ></cube-input>
            <div class="miaoshu">微信或邮箱 第一时间获得反馈进度</div>
          </div>
          <div class="xgwttitle">上传图片</div>
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
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="btnview">
      <cube-button class="tijbtn" @click="subbtn">提交</cube-button>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/feedback'></script>
<style lang="scss" scoped>
@import "../assets/scss/feedback.scss";
</style>