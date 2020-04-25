
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll class="videoclasspanels" ref="scroll">
        <ul class="setul">
          <li class="setlis">
            <div class="name">修改头像</div>
            <div class="contentview">
              <van-image class="pic" fit="cover" :src="avator" radius="50%" />
              <div class="arrows"></div>
            </div>
            <input
              type="file"
              id="targetImg"
              ref="upload"
              @change="uploadImg($event)"
              accept="image/*"
              value="上传"
            />
          </li>
          <li class="setli" @click="alternc">
            <div class="name">会员昵称</div>
            <div class="contentviews">
              <div class="content" ref="nc">{{nicknames}}</div>
              <div class="arrows"></div>
            </div>
          </li>
          <li class="setli" @click="altergq">
            <div class="name">个性签名</div>
            <div class="contentviews">
              <div class="content" ref="qm">{{autograph}}</div>
              <div class="arrows"></div>
            </div>
          </li>
          <li class="setli" @click="alterxb">
            <div class="name">性别</div>
            <div class="contentviews">
              <div class="content">{{member_sex}}</div>
              <div class="arrows"></div>
            </div>
          </li>
          <li class="setli" @click="altersj">
            <div class="name">手机</div>
            <div class="contentviews">
              <div class="content" ref="sj">{{member_mobile}}</div>
              <div class="arrows"></div>
            </div>
          </li>
        </ul>
        <div class="exitview">
          <cube-button class="exit" @click="exit">退出登录</cube-button>
        </div>
      </cube-scroll>
    </div>
    <div class="cropper" v-show="picshow">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="false"
        :fixed="true"
        :fixedNumber="[1,1]"
        :full="option.full"
        :centerBox="true"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixedBox="option.fixedBox"
        @realTime="realTime"
      ></vueCropper>
    </div>
    <div class="changebtns" v-show="picshow">
      <cube-button class="backsview" @click="cancel">取消</cube-button>
      <cube-button class="uppic" @click="finish">上传</cube-button>
    </div>
  </div>
</template>
<script src='../assets/js/set'></script>
<style lang="scss" >
.cropper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 80;
}

//改变背景色
.cropper-box {
  background: #333 !important;
}

//使截图框变为圆形
.cropper-crop-box {
  overflow: hidden;
  border-radius: 50% !important;
}

.cropper-content {
  display: flex;
  justify-content: flex-end;
  .cropper {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "../assets/scss/set.scss";
</style>