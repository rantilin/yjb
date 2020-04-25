
<template>
  <div>
    <div class="yjbtitle">消息</div>
    <div class="jianbian"></div>
    <div class="messagepanelview">
      <cube-scroll class="messagepanels" v-if="chatlists!=null||chatlist!=null" ref="scroll" >
        <ul class="msglists">
          <!-- @touchstart.prevent="touchinUk(index)"  @touchend.prevent="cleartime(index)" -->
          <!--系统回复-->
          <li
            @click="chat()"
            v-if="chatlist!=null"
          
          >
            <div class="msglistview">
              <van-image
                class="msglistpic"
                fit="cover"
                :src="imageurl"
                radius="50%"
              />
              <div class="msglistdetail">
                <div class="msglisdetailview">
                  <span class="msglistname">系统消息</span>
                 
                </div>
                <div class="msglistaddress">您收到了一条新的回复</div>
              </div>
              <div class="time">{{xiaoshi}}:{{fenzhong}}</div>
              <div class="msgbubble1" v-if="chatlistlength>0">{{chatlistlength}}</div>
            </div>
          
          </li>
          <!--订单回复-->
          <li
            v-for="(item,index) in chatlists"
            :key="index"
            @click="chat(item.ordert_duihua[0].id)"
          
          >
            <div class="msglistview">
              <van-image
                class="msglistpic"
                fit="cover"
                :src="item.ordert_duihua[0].expert_image"
                radius="50%"
              />
              <div class="msglistdetail">
                <div class="msglisdetailview">
                  <span class="msglistname">{{item.ordert_duihua[0].expert_name}}</span>
                  <span class="msglistzhuzhi">{{item.ordert_duihua[0].expert_title}}</span>
                </div>
                <div class="msglistaddress">{{item.ordert_duihua[0].expert_hospital}}</div>
              </div>
              <div class="msgbubble" v-if="item.ordert_duihua[0].wd!=0">{{item.ordert_duihua[0].wd}}</div>
            </div>
            <div class="msglistcontent">{{item.ordert_duihua[0].description}}</div>
          </li>
        </ul>
      </cube-scroll>
      <div class="nocntetview" v-if="chatlists==null">
        <div class="nocontent">
          <div class="nocontentpicview">
            <van-image class="nocontentpic" fit="cover" :src="nocontent" />
          </div>
          <div class="nocontenttext">暂无消息</div>
        </div>
      </div>
      <!-- nocntetview -->
    </div>
        <component-loading v-if="loding" />
  </div>
</template>

<script src='../assets/js/message'></script>

<style lang="scss" scoped>
@import "../assets/scss/message.scss";
</style>