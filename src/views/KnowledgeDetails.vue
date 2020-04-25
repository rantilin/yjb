
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="videoclasspanelview">
      <cube-scroll
        class="videoclasspanels"
        ref="scroll"
        :scrollEvents="scrollEvents"
        @before-scroll-start="scrollnow"
      >
        <div class="page">
          <div class="title">{{atitle}}</div>
          <van-image class="pic" fit="cover" :src="thumbnail" radius="12px" />
          <div class="textcontent" ref="content"></div>
          <div class="expert" v-if="expert_mender>0">
            <div class="titles">专家解读</div>
            <div class="detail" @click="godoctor">
              <div class="user">
                <van-image class="pics" fit="cover" :src="expert_image" radius="50%" />
                <div class="msg">
                  <div class="name">
                    {{expert_name}}
                    <span>{{expert_title}}</span>
                  </div>
                  <div class="address">{{expert_hospital}}</div>
                </div>
              </div>
              <!-- <div class="titlees">{{atitle}}</div> -->
              <div class="content">{{unscramble}}</div>
            </div>
          </div>
          <!-- expert -->
          <div class="recommend" v-if="wxtjlist!=null">
            <div class="titles">相关推荐</div>
            <ul class="comul">
              <li
                class="comli"
                v-for="(item,index) in wxtjlist"
                :key="index"
                @click="wxtjbtn(item.id)"
              >
                <van-image class="compic" fit="cover" :src="item.thumbnail" radius="12px" />
                <div class="comdetail">
                  <div class="comname">{{item.atitle}}</div>
                  <div class="text">{{item.abstract}}</div>
                </div>
              </li>
            </ul>
            <!-- comul -->
          </div>
          <!-- recommend -->
          <div class="comment">
            <div class="commenttitle">评论({{msglen}})</div>
            <ul v-if="msglistes!=null">
              <li v-for="(item,index) in msglistes" :key="index">
                <div class="user">
                  <van-image class="pices" fit="cover" :src="item.member_avatar" radius="50%" />
                  <div class="nameview">
                    <div class="name">{{item.nicknames}}</div>
                  </div>
                  <div class="time">{{item.comment_addtime}}</div>
                </div>
                <div class="text">{{item.comment_content}}</div>
              </li>
            </ul>
            <div class="nocntetview" v-if="msglistes==null">
              <div class="nocontent">
                <div class="nocontentpicview">
                  <van-image class="nocontentpic" fit="cover" :src="nocontent" />
                </div>
                <div class="nocontenttext">暂无评论</div>
              </div>
            </div>
            <!-- nocntetview -->
          </div>
          <!-- comment -->
        </div>
        <!-- page -->
      </cube-scroll>
    </div>
    <div class="commentview">
      <cube-input
        class="commentipnut"
        v-model="value"
        :placeholder="placeholder"
        :clearable="clearable"
        @focus="focus"
        @blur="blur"
        UIReturnKeyDone
      ></cube-input>
      <cube-button class="send" v-show="focusval" @click="sends">发送</cube-button>
      <div class="collectview" v-show="!focusval">
        <div :class="[collectstate==1?'collectstar':'collectstaroff']" @click="colltctionbtn"></div>
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/knowledgedetails'></script>
<style lang="scss">
.cube-input-field {
  font-size: 13px;
}
.cube-input-field::-webkit-input-placeholder {
  font-size: 13px;
  color: #666666;
}

.textcontent img {
  width: 100%;
  height: auto;
}
ol > li {
  list-style: "" !important;
}
li {
  list-style: "" !important;
}
</style>
<style lang="scss" scoped>
@import "../assets/scss/knowledgedetails.scss";
</style>