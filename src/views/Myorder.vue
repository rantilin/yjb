
<template>
  <div>
    <component-head :comname="comname"></component-head>
    <div class="optionbar">
      <div class="vanttab">
        <van-tabs
          :color="vantab.color"
          :background="vantab.background"
          :line-width="vantab.linewidth"
          :line-height="vantab.lineheight"
          :title-active-color="vantab.activecolor"
          :title-inactive-color="vantab.defaultcolor"
          :swipe-threshold="vantab.swipethreshold"
          :border="vantab.border"
          :swipeable="vantab.swipeable"
          @click="pitchtab"
        >
          <van-tab v-for="item in vantab.list" :title="item" :key="item"></van-tab>
        </van-tabs>
      </div>
      <!-- vanttab -->
    </div>
    <!-- optionbar -->
    <div class="videoclasspanelview">
      <div class="paneview" v-show="0==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll1" v-if="orderlist!=null">
          <ul class="listul">
            <li
              class="listli"
              v-for="(item,index) in orderlist"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
            >
              <div class="bxs" v-if="item.order_state!=1">
                <div class="listtitle" v-if="item.kalman_code_id == null">
                  <div class="listpic ordervideo" v-if="item.class_order==1"></div>
                  <span class="listname" v-if="item.class_order==1">宝宝看看</span>
                  <div class="listpic orderlisten" v-if="item.class_order==2"></div>
                  <span class="listname" v-if="item.class_order==2">宝宝听听</span>
                  <div class="listpic orderimgtext" v-if="item.class_order==3"></div>
                  <span class="listname" v-if="item.class_order==3">图文咨询</span>
                  <div class="listpic orderphone" v-if="item.class_order==4"></div>
                  <span class="listname" v-if="item.class_order==4">电话咨询</span>
                  <div class="listpic orderanswering" v-if="item.class_order==5"></div>
                  <span class="listname" v-if="item.class_order==5">精选问答</span>
                  <div class="listpic ordergroup" v-if="item.class_order==6"></div>
                  <span class="listname" v-if="item.class_order==6">训练班</span>
                  <span
                    class="liststate-active"
                    v-if="item.order_state==20||item.order_state==30"
                  >已完成</span>
                  <span class="liststate" v-if="item.order_state==10">待付款</span>
                </div>
                <div class="listtitle" v-if="item.kalman_code_id != null">
                    <div class="listpic orderkami" ></div>
                     <span class="listname">卡密支付</span>
                     <span class="liststate-active">已完成</span>
                     <div class="clear"></div>
                     <div class="countdown">
                         <span class="text">
                           距离结束仅剩：
                         </span>
                         <van-count-down class="downtime" :time="item.durations | dataFormat(item.activation_time)" format="DD 天 HH 时 mm 分" />
                         <span class="kamicode">卡密号：{{item.kalman_code}}</span>
                         <div class="clear"></div>
                     </div>
                </div>
                <div class="listcontent" v-if="item.class_order!=5"  @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    fit="cover"
                    :src="item.goods_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                   
                  />

                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                    
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
           
                  />
                  <div class="contentdetail">
                    <div
                      class="contenttitle"
                      v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    >{{item.goods_name}}</div>
                    <div class="contenttitle" v-else>{{item.description}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div class="sectionview" v-if="item.pay_result==2">
                  <div class="section">章节</div>
                  <ul class="sectionoptions">
                    <li
                      class="optionlist"
                      v-for="(items,index) in item.room_audio_id"
                      :key="index"
                    >{{items}}</li>
                  </ul>
                </div>
                <div class="answeringtitle" v-if="item.class_order==5">{{item.description}}</div>
                <div class="listcontent" v-if="item.class_order==5" @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpics"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50px"
                   
                  />
                  <div class="contentdetail">
                    <div class="contenttitles">{{item.expert_name}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div
                  class="buyprice"
                  v-if="item.pay_result!=3&&(item.class_order==1||item.class_order==2||item.class_order==6||item.class_order==5)"
                >
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                  <cube-button
                    class="nowbuy"
                    v-if="item.order_state==10"
                    @click="gopay(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)"
                  >立即支付</cube-button>
                </div>

                <div class="buyprice" v-if="item.class_order==3||item.class_order==4">
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                  <cube-button
                    class="nowbuy"
                    v-if="item.order_state==10"
                    @click="gopay(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)"
                  >立即支付</cube-button>
                  <cube-button
                    class="gomsg"
                    v-if="item.order_state==20||item.order_state==30"
                    @click="gomsg(item.expert_id,item.order_sn,item.status_column)"
                  >{{item.status_column==0?'去评价':'去追问'}}</cube-button>
                </div>

                <div class="fenxiang" v-if="item.pay_result==3">分享购买</div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="orderlist==null">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无订单</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="1==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll2" v-if="weizhifu!=''">
          <ul class="listul">
            <li
              class="listli"
              v-for="(item,index) in weizhifu"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
            >
              <div class="bxs" v-if="item.order_state!=1">
                <div class="listtitle">
                  <div class="listpic ordervideo" v-if="item.class_order==1"></div>
                  <span class="listname" v-if="item.class_order==1">宝宝看看</span>
                  <div class="listpic orderlisten" v-if="item.class_order==2"></div>
                  <span class="listname" v-if="item.class_order==2">宝宝听听</span>
                  <div class="listpic orderimgtext" v-if="item.class_order==3"></div>
                  <span class="listname" v-if="item.class_order==3">图文咨询</span>
                  <div class="listpic orderphone" v-if="item.class_order==4"></div>
                  <span class="listname" v-if="item.class_order==4">电话咨询</span>
                  <div class="listpic orderanswering" v-if="item.class_order==5"></div>
                  <span class="listname" v-if="item.class_order==5">精选问答</span>
                  <div class="listpic ordergroup" v-if="item.class_order==6"></div>
                  <span class="listname" v-if="item.class_order==6">训练班</span>
                  <span class="liststate">待付款</span>
                </div>
                <div class="listcontent" v-if="item.class_order!=5"  @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    fit="cover"
                    :src="item.goods_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
             
                  />

                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                   
                  />
                  <div class="contentdetail">
                    <div
                      class="contenttitle"
                      v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    >{{item.goods_name}}</div>
                    <div class="contenttitle" v-else>{{item.description}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div class="sectionview" v-if="item.pay_result==2">
                  <div class="section">章节</div>
                  <ul class="sectionoptions">
                    <li
                      class="optionlist"
                      v-for="(items,index) in item.room_audio_id"
                      :key="index"
                    >{{items}}</li>
                  </ul>
                </div>
                <div class="answeringtitle" v-if="item.class_order==5">{{item.description}}</div>
                <div class="listcontent" v-if="item.class_order==5"  @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpics"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50px"
                   
                  />
                  <div class="contentdetail">
                    <div class="contenttitles">{{item.expert_name}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div class="buyprice">
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                  <cube-button
                    class="nowbuy"
                    @click="gopay(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)"
                  >立即支付</cube-button>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="weizhifu==''">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无待付款订单</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="2==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll3" v-if="yizhifu!=''">
          <ul class="listul">
            <li
              class="listli"
              v-for="(item,index) in yizhifu"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
            >
              <div class="bxs" v-if="item.order_state!=1">
                <div class="listtitle" v-if="item.kalman_code_id == null">
                  <div class="listpic ordervideo" v-if="item.class_order==1"></div>
                  <span class="listname" v-if="item.class_order==1">宝宝看看</span>
                  <div class="listpic orderlisten" v-if="item.class_order==2"></div>
                  <span class="listname" v-if="item.class_order==2">宝宝听听</span>
                  <div class="listpic orderimgtext" v-if="item.class_order==3"></div>
                  <span class="listname" v-if="item.class_order==3">图文咨询</span>
                  <div class="listpic orderphone" v-if="item.class_order==4"></div>
                  <span class="listname" v-if="item.class_order==4">电话咨询</span>
                  <div class="listpic orderanswering" v-if="item.class_order==5"></div>
                  <span class="listname" v-if="item.class_order==5">精选问答</span>
                  <div class="listpic ordergroup" v-if="item.class_order==6"></div>
                  <span class="listname" v-if="item.class_order==6">训练班</span>
                  <span class="liststate-active">已完成</span>
                </div>
                <div class="listtitle" v-if="item.kalman_code_id != null">
                    <div class="listpic orderkami" ></div>
                     <span class="listname">卡密支付</span>
                     <span class="liststate-active">已完成</span>
                     <div class="clear"></div>
                     <div class="countdown">
                         <span class="text">
                           距离结束仅剩：
                         </span>
                         <van-count-down class="downtime" :time="item.durations | dataFormat(item.activation_time)" format="DD 天 HH 时 mm 分" />
                         <span class="kamicode">卡密号：{{item.kalman_code}}</span>
                         <div class="clear"></div>
                     </div>
                </div>
                <div class="listcontent" v-if="item.class_order!=5" @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    fit="cover"
                    :src="item.goods_image"
                    radius="12px"
                    
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                  
                  />

                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                  />
                  <div class="contentdetail">
                    <div
                      class="contenttitle"
                      v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    >{{item.goods_name}}</div>
                    <div class="contenttitle" v-else>{{item.description}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div class="sectionview" v-if="item.pay_result==2">
                  <div class="section">章节</div>
                  <ul class="sectionoptions">
                    <li
                      class="optionlist"
                      v-for="(items,index) in item.room_audio_id"
                      :key="index"
                    >{{items}}</li>
                  </ul>
                </div>
                <div class="answeringtitle" v-if="item.class_order==5">{{item.description}}</div>
                <div class="listcontent" v-if="item.class_order==5"  @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpics"
                    fit="cover"
                    :src="item.expert_image"
                    radius="50px"
                   
                  />
                  <div class="contentdetail">
                    <div class="contenttitles">{{item.expert_name}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>

                <div
                  class="buyprice"
                  v-if="item.pay_result!=3&&(item.class_order==1||item.class_order==2||item.class_order==6||item.class_order==5)"
                >
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                </div>

                <div class="buyprice" v-if="item.class_order==3||item.class_order==4">
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                  <cube-button
                    class="gomsg"
                    v-if="item.order_state==20||item.order_state==30"
                    @click="gomsg(item.expert_id,item.order_sn,item.status_column)"
                  >{{item.status_column==0?'去评价':'去追问'}}</cube-button>
                </div>
                <div class="fenxiang" v-if="item.pay_result==3">分享购买</div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="yizhifu==''">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无已完成订单</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
      <div class="paneview" v-show="3==currentTab">
        <cube-scroll class="videoclasspanels" ref="scroll4" v-if="daipingjia!=''">
          <ul class="listul">
            <li
              class="listli"
              v-for="(item,index) in daipingjia"
              :key="index"
              @touchstart="touch(item.order_id)"
              @touchend="cleartime()"
            >
              <div class="bxs" v-if="item.order_state!=1">
                <div class="listtitle"  v-if="item.kalman_code_id == null">
                  <div class="listpic ordervideo" v-if="item.class_order==1"></div>
                  <span class="listname" v-if="item.class_order==1">宝宝看看</span>
                  <div class="listpic orderlisten" v-if="item.class_order==2"></div>
                  <span class="listname" v-if="item.class_order==2">宝宝听听</span>
                  <div class="listpic orderimgtext" v-if="item.class_order==3"></div>
                  <span class="listname" v-if="item.class_order==3">图文咨询</span>
                  <div class="listpic orderphone" v-if="item.class_order==4"></div>
                  <span class="listname" v-if="item.class_order==4">电话咨询</span>
                  <div class="listpic orderanswering" v-if="item.class_order==5"></div>
                  <span class="listname" v-if="item.class_order==5">精选问答</span>
                  <div class="listpic ordergroup" v-if="item.class_order==6"></div>
                  <span class="listname" v-if="item.class_order==6">训练班</span>
                  <span class="liststate-active">已完成</span>
                </div>
                <div class="listtitle" v-if="item.kalman_code_id != null">
                    <div class="listpic orderkami" ></div>
                     <span class="listname">卡密支付</span>
                     <span class="liststate-active">已完成</span>
                     <div class="clear"></div>
                     <div class="countdown">
                         <span class="text">
                           距离结束仅剩：
                         </span>
                         <van-count-down class="downtime" :time="item.durations | dataFormat(item.activation_time)" format="DD 天 HH 时 mm 分" />
                         <span class="kamicode">卡密号：{{item.kalman_code}}</span>
                         <div class="clear"></div>
                     </div>
                </div>
                <div class="listcontent" v-if="item.class_order!=5" @click="gopage(item.class_order,item.order_state,item.goods_id,item.qusert_id,item.order_sn)">
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    fit="cover"
                    :src="item.goods_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id!=0"
                    fit="cover"
                    :src="item.expert_image"
                    radius="12px"
                
                  />

                  <van-image
                    class="contentpic"
                    v-if="item.class_order==3&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                   
                  />
                  <van-image
                    class="contentpic"
                    v-if="item.class_order==4&&item.expert_id==0"
                    fit="cover"
                    :src="doctormatching"
                    radius="12px"
                   
                  />
                  <div class="contentdetail">
                    <div
                      class="contenttitle"
                      v-if="item.class_order==1||item.class_order==2||item.class_order==6"
                    >{{item.goods_name}}</div>
                    <div class="contenttitle" v-else>{{item.description}}</div>
                    <div class="time">{{item.order_time}}</div>
                  </div>
                </div>
                <div class="buyprice" v-if="item.class_order==3||item.class_order==4">
                  <div class="alltext">总计：</div>
                  <div class="prcie">￥{{item.order_amount}}</div>
                  <cube-button
                    class="gomsg"
                    v-if="item.order_state==20||item.order_state==30"
                    @click="gomsg(item.expert_id,item.order_sn,item.status_column)"
                  >{{item.status_column==0?'去评价':'去追问'}}</cube-button>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <div class="nocntetview" v-if="daipingjia==''">
          <div class="nocontent">
            <div class="nocontentpicview">
              <van-image class="nocontentpic" fit="cover" :src="nocontent" />
            </div>
            <div class="nocontenttext">暂无待评价订单</div>
          </div>
        </div>
        <!-- nocntetview -->
      </div>
    </div>
    <component-loading v-if="loding" />
  </div>
</template>
<script src='../assets/js/myorder'></script>

<style lang="scss" scoped>
@import "../assets/scss/myorder.scss";
</style>