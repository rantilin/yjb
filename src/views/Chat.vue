
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview" :class="[padding?'padding-focus':'padding']" v-if="id!=undefined">
      <cube-scroll class="videoclasspanels" ref="scroll">
        <van-notice-bar
          color="#FF6633"
          background="#DCFAF0"
          left-icon="info-o"
          v-if='number!=""'
        >您当前还剩{{number}}条对话可以发出</van-notice-bar>
        <div class="pages">
          <div class="user">
            <div class="userdetail">
              <div class="content">{{description}}</div>
              <van-image class="pic" fit="cover" :src="member_avatar" radius="50%" />
            </div>
          </div>
          <div class="chats" v-for="(item,index) in chatlists" :key="index">
            <div class="doctortext" v-if="item.class_dia==2">
              <div class="userdetail">
                <van-image
                  class="pic"
                  fit="cover"
                  :src="expert_image"
                  radius="50%"
                  @click="godoctor(expert_id)"
                />
                <div class="content">{{item.dialogue}}</div>
              </div>
            </div>
            <div class="user" v-if="item.class_dia!=2">
              <div class="userdetail">
                <div class="content">{{item.dialogue}}</div>
                <van-image class="pic" fit="cover" :src="member_avatar" radius="50%" />
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
      <div class="textareaview">
        <div class="textareaviews">
          <cube-textarea
            v-model="value"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :autofocus="autofocus"
            :indicator="indicator"
            @focus="focus"
            @blur="blur"
          ></cube-textarea>
        </div>
        <cube-button class="textareabtn" @click="send">发送</cube-button>
      </div>
    </div>


      <div class="videoclasspanelview1" :class="[padding?'padding-focus':'padding']" v-if="id==undefined">
      <cube-scroll class="videoclasspanels1" ref="scroll"  style="background:#F7F9FC">
        <div class="pages1">
          <div class="user1">
            <div class="userdetail1">
              <div v-for="(item,index) in chartlist" :key="index" class="box" >
                 <div class="time">{{item.comment_addtime}}</div>
                 <van-image class="pic1" fit="cover" :src="imageurl" radius="50%" />
                 <div class="content1"  @touchstart="touchinUk(item.comment_id,index)" 
            @touchend="cleartime(item.comment_id,item.comemt_type,item.type_id)">医教宝将优化产品详情页服务， 闲诚邀参与相关意见反馈，完成即有机会获得课程，点击链接<p style="color:#21C891">http://yijiaobao.com.cn/wap/#/{{item.comemt_type==1?'class':item.comemt_type==2?'paygroup':item.comemt_type==3?'doctor':''}}?{{item.comemt_type==1?'class_id':item.comemt_type==2?'paygroup_id':item.comemt_type==3?'doctor_id':''}}={{item.type_id}}</p></div>
               
              </div>
              
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/chat'></script>
<style lang="scss" scoped>
@import "../assets/scss/chat.scss";
</style>