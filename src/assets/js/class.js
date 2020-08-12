import Vue from "vue";
import common from "./common";
import classapi from "@/api/ClassApi";
import Lottie from "vue-lottie/src/lottie.vue";
import musicAnim from "@/assets/json/playaudionew.json";
import ComponentLoading from '@/components/ComponentLoading';
import Indexlayout from '@/components/Indexlayout1';
import chapter from '@/components/chapter';
import chapterbuy from '@/components/chapterbuy';
import audioplay from '@/components/audioplay';
import EarnShare from '@/components/EarnShare';
import { Loading } from 'vant';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import {
    Image,
    Tab,
    Tabs,
    Collapse,
    CollapseItem
} from 'vant';
Vue.use(Image).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Loading);
import {
    share_yp
} from './share';
import {
    Notify
} from "vant";
import {
    Dialog
} from "vant";
import {
    Popup
} from 'vant';
Vue.use(Popup);
export default {
    name: 'class',
    components: {
        Lottie,
        Indexlayout,
        chapter,
        chapterbuy,
        audioplay,
        EarnShare
    },
    data() {
        return {
            index: this.$route.query.index,
            key: this.$store.state.key.value,
            loding: true,
            nocontent: require("../image/nomsg.png"),
            currentTab: 0,
            musicoption: {
                animationData: musicAnim,
                loop: true,
                autoplay: true
            },
            musicanim: "",
            classtype: this.$route.query.state, //1是视频，2是音频
            options: {
                pullUpLoad: false
            },
            value: '',
            placeholder: "我来说几句",
            clearable: {
                visible: true,
                blurHidden: true
            },
            show: false,
            classid: this.$route.query.classid,
            goods_image: '',
            goods_name: '',
            goods_jingle:'',
            goods_price: '',
            goods_click: '',
            introduction: '',
            goods_images: '',
            mrgoodimg: '',
            videolist: '', //视频列表
            chapterlist:'',//开启选集视频列表
            allvideolist:'',//开启选集后数据列表
            audiolist:'',//音频列表
            videosrc: "", //视频地址
            playindex: 0, //初始化默认播放下标为0
            xiabiao: 0,
            morenum: 8, //课程章节条数 默认8条
            morenumpl: 8, //评价条数 默认8条
            msglists: [], //评价列表
            msglistes: [],
            collectstate: '', //收藏状态
            goodsStatezj: 0,//是否开启章节
            goods_discount: '',
            chapterindex: 1,
            zjtext: '',
            msglen: '',
            zjid: '',
            optionvalue: '',
            checkedNames: [],
            arr: [],
            order_pay: '',
            discountoption: 0,
            quan: '',
            val: 1,
            tel: '',
            disabled: false,
            yipics: false,
            quanxuan: false,
            sphei: false,
            vantab: {
                list: [
                    "课程介绍",
                    "课程目录",
                    "笔记",
                ],
                color: "#21C891",
                background: "transparent",
                linewidth: "16px",
                lineheight: "2px",
                activecolor: "#333333",
                defaultcolor: "#333333",
                swipethreshold: 4,
                border: false,
                swipeable: true
            },
            zhidingpic: "",
            zhidingname: "",
            zhidingtime: "",
            keyval: 1,
            indexlogo: 'http://yijiaobao.com.cn/wap/images/logo1.png',
            desc: "一个帮爸妈养娃省心省力的平台，汇集全国名师名医，提高孩子成绩，实时儿科问诊，还有超多育儿福利资源，快来领取吧~",
            url: process.env.VUE_APP_SERVICE_URLS,
            present: process.env.VUE_APP_SERVICE_URLS + "#/class?classid=" + this.$route.query.classid + "&state="+this.$route.query.state ,
            fromflag: true,
            xxflag: true,
            noticecontent: '',
            doctoractive: false,
            video_active: 0,
            listdata: [],
            scrollEvents: ['before-scroll-start'],
            doctorid: '',
            phone_num: '',
            gm: '',
            duration:'', //音频时间
            videoalltime: '',
            videonowtime: '',
            expert_image: '',
            index1: 0,
            wechatshow: false,//二维码
            shareimg: '',//分享佣金海报
            share_images: '',//分享海报背景
            shareheard:'',//分享用户头像
            shareimgname:'',
            share_uid: 0,
            sharereception: this.$route.query.shareuid,//分享接受uid
            share_price: 0,//分享获取佣金
            share_cont: 0,
            wechatdata: true,
            wximg: '',
            DiscountsCode: false,
            DiscountsVerify: false,
            focusDis: false,
            yqmCode: '',
            codeDiscount: {},
            zekou: 1,
            yjprice: '',
            remend: false,
            allbuy: false,
            allbuystatic: false,
            goods_complete: 0,
            goods_buytext: '选集购买',
            goods_sample: 0, //是否咨询
            goods_state_chapter: 0, //是否开启小结购买
            isconsult: false,
            consult:{
                titles:'',
                describes:''
            },//咨询数据
            goodsstategift: 0,//是否开启送礼物
            gift:{
                isunfold: false,
                datalist:[],
                conditiondata: [], //满足条件
            }
        }
    },
    methods: {
        scrollnow() {
            this.$refs.scroll.refresh();
        },
        govideo(id) {
            this.classid = id

            this.list1();
            this.list2();
            this.list3();
            this.list4();
            this.list5();

            if (this.index1 != 0) {
                this.videosrc = ''
                this.zjtext = ''
                this.zjid = ''
                this.playindex = 0
            }


        },
        godoctor() {
            this.$router.push({
                path: '/doctor',
                query: {
                    id: this.doctorid
                }
            })
        },
        swipererke() {
            this.$nextTick(() => {
                this.swiperek = new Swiper('.swipererke', {
                    paginationClickable: true,
                    autoplay: false,
                    loop: false,
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    autoplayDisableOnInteraction: false,
                })
            });
        },

        pitchtab(index) {
            this.currentTab = index;
            this.$nextTick(() => {
                this.$refs.scroll.refresh()
            });
            switch (this.currentTab) {
                case 0:
                    this.options.pullUpLoad = false;
                    break;
                case 1:
                    if(this.classtype == 1){
                    this.options.pullUpLoad = {
                        txt: {
                          more: '努力刷新中~',
                          noMore: '已经滑到底啦~'
                        }
                      };
                    }else{
                        this.options.pullUpLoad = {
                            txt: {
                              more: '努力刷新中~',
                              noMore: '已经滑到底啦~'
                            }
                          };
                    }
                    break;
                case 2:
                    if (this.msglists == null) {
                        this.options.pullUpLoad = false;
                    } else {
                        this.options.pullUpLoad = {
                            threshold: 0,
                            txt: {
                                more: '上拉加载更多笔记',
                                noMore: '没有更多笔记'
                            }
                        }
                    }
                    this.$refs.scroll.refresh();
                    break;
            }
        },
        MusicAnimation(anim) {
            this.musicanim = anim;
        },
        mengcengview() {
            this.show = false;
        },
        selectionsbuy() {
            if (this.key) {
                this.show = true;
                this.sphei = false;
                if(this.classtype == 1){
                document.getElementById("myVideo").pause();
                }
                this.$nextTick(() => {
                    this.$refs.scrolls.refresh();
                });
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        
     
        onPullingUp() {
            switch (this.currentTab) {
                case 0:
                    break;
                case 1:
                    if(this.morenum < this.allvideolist.length){
                      setTimeout(() => {
                        this.morenum += this.morenum;
                        this.$refs.scroll.forceUpdate(true);
                        this.$refs.scroll.refresh();
                      }, 1500); 
                     
                    }else{
                        this.$refs.scroll.forceUpdate();
                        this.$refs.scroll.refresh();
                    }
                    break;
                case 2:
                    if (this.morenumpl < this.msglists.length) {
                        this.morenumpl = this.morenumpl + 8;
                        this.$refs.scroll.forceUpdate(true);
                        this.$refs.scroll.refresh();
                    } else {
                        this.$refs.scroll.forceUpdate();
                        this.$refs.scroll.refresh();
                    }
                    break;
                default:
                    break;
            }
            
        },
        list1() {
            if (this.key) {

                classapi.loginvideodetail(this.key, this.classid,this.classtype).then(res => {
                    this.goods_image = res.data.datas.brief.goods_image;
                    this.goods_name = res.data.datas.brief.goods_name;
                    this.goods_jingle = res.data.datas.brief.goods_jingle;
                    this.goods_price = res.data.datas.brief.goods_price;
                    this.goods_click = common.number(res.data.datas.brief.goods_click);
                    this.goods_discount = res.data.datas.brief.goods_discount;
                    this.introduction = res.data.datas.brief.introduction;
                    this.goods_images = res.data.datas.brief.goods_images;
                    this.mrgoodimg = res.data.datas.brief.goods_images;
                    this.goodsStatezj = res.data.datas.brief.goods_state_zj;
                    this.goods_sample = res.data.datas.brief.goods_sample; //开启咨询
                    this.goods_state_chapter = res.data.datas.brief.goods_state_chapter;
                    this.consult = res.data.datas.brief.goods_sample_info;
                    this.goodsstategift = parseInt(res.data.datas.brief.goods_state_gift);//开启礼物
                    this.gift.datalist =  res.data.datas.brief.goods_state_gift_info;
                    if(parseInt(this.goodsStatezj) == 0){
                        this.videolist = res.data.datas.details
                        this.allvideolist = this.videolist
                        this.videosrc = this.videolist[0].video_address
                        this.zjtext = this.videolist[0].courseware
                        this.zjid = this.videolist[0].vo_id
                        this.videoalltime = this.videolist[0].durations
                        this.duration = this.videolist[0].duration
                        this.audiolist=this.videolist.filter(item=> item.gm == 1||item.freession == 1)
                     } else {
                        this.goods_buytext = '章节购买';
                        this.chapterlist = res.data.datas.details.data
                        this.videosrc = this.chapterlist[0].chapter_text[0].video_address
                        this.zjtext = this.chapterlist[0].chapter_text[0].courseware
                        this.zjid = this.chapterlist[0].chapter_text[0].vo_id
                        this.playindex = this.chapterlist[0].chapter_text[0].vo_id
                        this.videoalltime = this.chapterlist[0].chapter_text[0].durations
                        this.duration = this.chapterlist[0].chapter_text[0].duration
                        this.allvideolist = res.data.datas.details.wu
                        
                        for (let iterator of this.chapterlist) {
                            this.videolist=[...this.videolist,...iterator.chapter_text]
                        }
                        this.videolist=[...this.videolist,...this.allvideolist]
                        this.morenum = 4
                        this.audiolist=this.videolist.filter(item=> item.gm == 1||item.freession == 1)
                     }
                     this.vantab.list = [
                        "课程介绍",
                        "课程目录(" + this.videolist.length + ")",
                        "笔记(" + this.msglen + ")",
                     ];
                     if(this.classtype == 2){
                         this.vantab.list[0]= '课程内容'
                     }
                    this.gm = res.data.datas.gm;
                    this.phone_num = res.data.datas.member_mobile;
                    this.doctorid = res.data.datas.brief.goods_expert;
                    this.listdata = res.data.datas.brief.tuijian
                    var discounts = this.goods_discount.split(",");
                    this.expert_image = res.data.datas.brief.expert_image;
                    this.goods_complete = res.data.datas.brief.goods_complete;
                    var arrdis = '';
                    for (let i in discounts) {
                        arrdis += discounts[i].split("-") + ','
                    }
                    arrdis = arrdis.substring(0, arrdis.length - 1);
                    var disarr = arrdis.split(",");
                    var jishu = [];
                    var oushu = [];
                    for (let j in disarr) {
                        if (j % 2 == 0) {
                            oushu.push(disarr[j]);
                        } else {
                            jishu.push(disarr[j]);
                        }
                    }
                    var quan = [];
                    for (let p in jishu) {
                        quan.push({
                            "gao": oushu[p],
                            "di": jishu[p],
                            "index": p
                        })
                    }
                    this.quan = quan;
                    this.list6();
                    this.recommend();
                    if(parseInt(this.goods_complete) == 1){
                          this.allbuy = true;
                          this.goods_buytext = '立即购买';
                          this.checkall();
                          this.$nextTick(() => {
                            if(this.discountoption == 0){
                                this.goods_buytext = '已购买';
                                this.allbuystatic = true;
                             }
                        });
                    }else{
                        this.allbuy = false;
                    }
                    
                    let shareis=res.data.datas.brief.goods_state_share //是否开启分享返现
                    if(parseInt(shareis) == 1){
                       this.share_images = res.data.datas.brief.share_images  //分享背景图片
                       this.share_price = res.data.datas.brief.share_price  //分享佣金
                       this.share_cont = res.data.datas.brief.share_reserve_price //金额上限分享
                       this.getshareuid()
                    }
                    
                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        this.toast(errmsg);
                    }
                });
                
            } else {
                classapi.videodetail(this.classid,this.classtype).then(res => {
                    this.goods_image = res.data.datas.brief.goods_image;
                    this.mrgoodimg = res.data.datas.brief.goods_images;
                    this.goods_name = res.data.datas.brief.goods_name;
                    this.goods_price = res.data.datas.brief.goods_price;
                    this.goods_click = common.number(res.data.datas.brief.goods_click);
                    this.goodsStatezj = res.data.datas.brief.goods_state_zj;

                    this.goods_sample = res.data.datas.brief.goods_sample; //开启咨询
                    this.consult = res.data.datas.brief.goods_sample_info;
                    this.goods_state_chapter = res.data.datas.brief.goods_state_chapter;
                    
                    this.goodsstategift = res.data.datas.brief.goods_state_gift;//开启礼物
                    this.gift.datalist =  res.data.datas.brief.goods_state_gift_info;
                    if(parseInt(this.goodsStatezj) == 0){
                        this.videolist = res.data.datas.details
                        this.allvideolist = this.videolist
                        this.videosrc = this.videolist[0].video_address
                        this.zjtext = this.videolist[0].courseware
                        this.zjid = this.videolist[0].vo_id
                        this.videoalltime = this.videolist[0].durations
                        this.duration = this.videolist[0].duration
                        this.audiolist=this.videolist.filter(item=> item.gm == 1||item.freession == 1)
                     } else {
                        this.goods_buytext = '章节购买';
                        this.chapterlist = res.data.datas.details.data
                        this.videosrc = this.chapterlist[0].chapter_text[0].video_address
                        this.zjtext = this.chapterlist[0].chapter_text[0].courseware
                        this.zjid = this.chapterlist[0].chapter_text[0].vo_id
                        this.playindex = this.chapterlist[0].chapter_text[0].vo_id
                        this.videoalltime = this.chapterlist[0].chapter_text[0].durations
                        this.duration = this.chapterlist[0].chapter_text[0].duration
                        this.allvideolist = res.data.datas.details.wu
                        
                        for (let iterator of this.chapterlist) {
                            this.videolist=[...this.videolist,...iterator.chapter_text]
                        }
                        this.videolist=[...this.videolist,...this.allvideolist]
                        this.morenum = 4
                        this.audiolist=this.videolist.filter(item=> item.gm == 1||item.freession == 1)
                     }
                     this.vantab.list = [
                        "课程介绍",
                        "课程目录(" + this.videolist.length + ")",
                        "笔记(" + this.msglen + ")",
                    ];
                    if(this.classtype == 2){
                        this.vantab.list[0]= '课程内容'
                    }
                    this.introduction = res.data.datas.brief.introduction;
                    this.goods_images = res.data.datas.brief.goods_images;
                    this.goods_discount = res.data.datas.brief.goods_discount;
                    this.goods_complete = res.data.datas.brief.goods_complete;
                    
                    this.list6();
                    this.recommend();
                    if(parseInt(this.goods_complete) == 1){
                        this.allbuy = true;
                        this.goods_buytext = '立即购买';
                        this.checkall();
                        this.$nextTick(() => {
                          if(this.discountoption == 0){
                              this.goods_buytext = '已购买';
                              this.allbuystatic = true;
                           }
                      });
                  }else{
                      this.allbuy = false;
                     
                  }
                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        this.toast(errmsg);
                    }
                });
            }
           
        },
        list2() {
            classapi.msglist(this.classid).then(res => {
                if (common.dataisnull(res.data.datas.msg)) {
                    if (common.dataisnull(res.data.datas.zhiding)) {
                        this.msglistes = res.data.datas.zhiding
                        this.zhidingpic = this.msglistes[0].member_avatar
                        this.zhidingname = this.msglistes[0].nicknames
                        this.zhidingtime = this.msglistes[0].comment_addtime
                        this.$refs.comment.innerHTML = this.msglistes[0].comment_content
                        var msg = res.data.datas.msg;
                        var zhidingid = res.data.datas.zhiding[0].comment_id;
                        var indexs;
                        msg.map((item, i) => {
                            if (msg[i].comment_id == zhidingid) {
                                indexs = i
                            }
                        });
                        msg.splice(indexs, 1);

                        this.msglists = msg
                        this.msglen = this.msglists.length + 1
                    } else {
                        this.msglists = res.data.datas.msg
                        this.msglen = this.msglists.length
                        this.msglistes = null
                    }
                } else {
                    this.msglists = null;
                    this.msglen = 0
                }
                this.vantab.list = [
                    "课程介绍",
                    "课程目录(" + this.videolist.length + ")",
                    "笔记(" + this.msglen + ")",
                ];
                this.loding = false;
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
            
        },
        list3() {
            if (this.key) {
                classapi.collectstate(this.key, this.classid).then(res => {
                    this.collectstate = res.data.datas;
                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        this.toast(errmsg);
                    }
                });
            }
        },
        list4(val) {
            classapi.collection(this.key, this.classid, val).then(res => {}).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list5() {
            if (this.key) {
                if (document.getElementById("myVideo").paused == false) {
                    classapi.addlearning(this.key, this.classid, this.zjid, this.videolist.length).then(res => {}).catch(err => {
                        if (err.message != "interrupt") {
                            let errmsg = '请求失败';
                            if (err.message.includes('timeout')) {
                                errmsg = "请检查网络再刷新重试"
                            }
                            this.toast(errmsg);
                        }
                    });
                }
            }
        },
        spalltime() {
            let index = 0;
            if (this.index1 != '') {
                index = this.index1;
            }
            let vodata=this.videolist;
            let  alltime= vodata.filter(item=> item.vo_id == this.playindex)[0]
            this.videoalltime = alltime.durations
            this.duration = alltime.duration
        },
        bofang() {
            if (!this.key) {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            } else {
                this.sphei = true;
                document.getElementById("myVideo").play();
                if(this.classtype == 2) {
                    this.audioclassimg()
                }
            }

        },
        audioclassimg(){
            this.options.pullUpLoad = false;
            this.$refs.scroll.scrollTo(0, -480,1000);
            this.currentTab = 0
            if(this.videolist.filter(item=>item.vo_id == this.playindex)[0].image){
            this.goods_images = this.videolist.filter(item=>item.vo_id == this.playindex)[0].image
            }else{
                this.goods_images = this.mrgoodimg
            }
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        audioprve(index, src, courseware, vo_id, duration, durations){ //音频组件通讯
            this.chapterindex = index
            this.videosrc = src
            this.$refs.myVideo.src = src
            this.zjtext = courseware
            this.zjid = vo_id
            this.playindex = vo_id
            this.duration = duration
            this.durations = durations
            this.$nextTick(() => {
                this.$refs.myVideo.load();
                document.getElementById('myVideo').play();
                this.yipics = true
           });
           this.$refs.audiochild.chushi();
           this.$refs.audiochild.xsroll();
           this.audioclassimg()
           
        },
        audionext(index, src, courseware, vo_id, duration, durations){ //音频组件通讯
            this.chapterindex = index
            this.videosrc = src
            this.$refs.myVideo.src = src
            this.zjtext = courseware
            this.zjid = vo_id
            this.playindex = vo_id
            this.duration = duration
            this.durations = durations
            this.$nextTick(() => {
                this.$refs.myVideo.load();
                document.getElementById('myVideo').play();
                this.yipics = true
           });
           this.$refs.audiochild.chushi();
           this.$refs.audiochild.xsroll();
           this.audioclassimg()
        },
        astate(item){  //音频播放状态
           this.yipics = item
        },
        morenbofang(){
            this.sphei = true;
            document.getElementById("myVideo").play();
        },
        section(value){   //章节购买组件传值
             this.checkedNames=value
        },
        giftoff(){ //礼物展开闭合
          
            if(this.gift.isunfold){
                this.gift.isunfold=false
            }else{
                if(this.gift.conditiondata.length != 0){
                    this.gift.isunfold=true
                }
            }
        },
        //祖传代码请勿动
        listbtn(index, freession, gm, video_address, courseware, vo_id) {
           
            if (freession == 0 && gm != 1) {
                
                this.toast("该章节需要购买才能继续学习哦");
                this.selectionsbuy()
                return false;
            } else if (!this.key) {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            } else if (!common.validateTel(this.phone_num) && freession != 1) {
                this.$router.push({
                    path: '/binding',
                    query: {
                        back: true
                    }
                })
            }else{
            this.chapterindex = index;
            this.playindex = vo_id;
            this.videosrc = video_address
            this.zjtext = courseware
            this.zjid = vo_id;
            this.$refs.myVideo.src = this.videosrc;
            this.sphei = true;
            this.$nextTick(() => {
                this.$refs.myVideo.load();
                document.getElementById('myVideo').play();
           });
            this.yipics = true;
            this.$refs.scroll.scrollTo(0, 0);
            if(this.classtype == 2) {
              this.$refs.audiochild.chushi();
              this.$refs.audiochild.xsroll();
              this.audioclassimg()
            }
            this.list5();
            this.spalltime();
          }
        },
        morebtn() {
            this.morenum = this.morenum + 8;
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        send() {
            if (this.key) {
                if (this.value == '') {
                    this.toast('请输入评价内容');
                    return false;
                }
                classapi.msgadd(this.key, this.classid, this.value).then(res => {
                    this.toast('感谢您的评价');
                    var arr = [];
                    arr.push.apply(arr, [res.data.datas])
                    if (this.msglists == null) {
                        this.msglists = []
                    }
                    this.msglen = this.msglen + 1;
                    this.msglists = arr.concat(this.msglists);
                    this.list = [
                        "课程介绍",
                        "课程目录(" + this.videolist.length + ")",
                        "笔记(" + this.msglen + ")",
                    ];
                    this.$refs.scroll.refresh();
                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        this.toast(errmsg);
                    }
                });
                this.value = ''
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        colltctionbtn() {
            if (this.key) {
                if (this.collectstate == 0) {
                    this.list4(1);
                    this.collectstate = 1
                } else {
                    this.list4(0);
                    this.collectstate = 0
                }
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        buyclass(id) {
            if (this.key) {
                if (this.optionvalue == '') {
                    this.toast('至少勾选一个章节！！！');
                } else {
                    this.disabled = true;
                    this.toast("订单正在提交中...");
                     if(this.sharereception && parseInt(this.discountoption) > parseInt(this.share_cont)){
                        classapi.shareorder(this.key, 2, this.classtype, this.optionvalue, id, this.discountoption, this.order_pay, this.codeDiscount,this.gift.conditiondata.id,this.sharereception).then(res => {
                            this.disabled = false;
                            this.$router.push({
                                name: 'pay',
                                query: {
                                    id: id,
                                    state: 1,
                                    pay_sn: res.data.datas.pay_sn,
                                }
                            })
                        }).catch(err => {
                            if (err.message != "interrupt") {
                                let errmsg = '请求失败';
                                if (err.message.includes('timeout')) {
                                    errmsg = "请检查网络再刷新重试"
                                }
                                this.toast(errmsg);
                            }
                        });
                        
                     }else{
                        classapi.order(this.key, 2, this.classtype, this.optionvalue, id, this.discountoption, this.order_pay, this.codeDiscount,this.gift.conditiondata.id).then(res => {
                            this.disabled = false;
                            this.$router.push({
                                name: 'pay',
                                query: {
                                    id: id,
                                    state: 1,
                                    pay_sn: res.data.datas.pay_sn,
                                }
                            })
                        }).catch(err => {
                            if (err.message != "interrupt") {
                                let errmsg = '请求失败';
                                if (err.message.includes('timeout')) {
                                    errmsg = "请检查网络再刷新重试"
                                }
                                this.toast(errmsg);
                            }
                        });
                     }
                }
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        checkedBox(i) {
            if (this.arr.includes(i)) {
                this.arr = this.arr.filter(function (ele) {
                    return ele != i;
                });
            } else {
                this.arr.push(i);
            }
        },
        checkall() {
            if (this.quanxuan) {
                this.checkedNames = [];
                this.quanxuan = false;
                for (let i in this.videolist) {
                    this.arr = this.arr.filter(function (ele) {
                        return ele != i;
                    });
                }
            } else {
                this.quanxuan = true;
                this.checkedNames = [];
                for (let i in this.videolist) {
                    if (this.videolist[i].freession == 0 && this.videolist[i].gm != 1) {
                        this.arr.push(parseFloat(i));
                        this.checkedNames.push(this.videolist[i].vo_id + ',' + this.videolist[i].video_price)
                    }
                }
            }
        },
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        list6() {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                share_yp(this.keyval, this.classid, this.goods_name, this.indexlogo, this.desc, this.url, this.present);
            }
        },
        back() {
            if (!document.getElementById("myVideo").paused) {
                document.getElementById("myVideo").pause()
                if (window.history.length <= 2) {
                    this.$router.push({
                        path: '/',
                        query: {
                            activeindex: this.index
                        }
                    })
                }
            } else {
                if (window.history.length <= 2) {
                    this.$router.push({
                        path: '/',
                        query: {
                            activeindex: this.index
                        }
                    })
                }else{
                    this.$router.go(-1);
                }
               
            }
        },
        backindex() {
            this.$router.push({
                path: '/'
            })
        },
        scrollcheck() {
            this.$refs.scroll.enable();
        },
        videocheck() {
            this.$refs.scroll.disable();
        },
        xx() {
            this.xxflag = false;
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        list7() {
            classapi.notice().then(res => {
                this.noticecontent = res.data.datas[0].briefs;
                this.wximg = res.data.datas[0].case_image;
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },

        addEventListeners: function () {
            let self = this;
            self.$refs.myVideo.addEventListener('timeupdate', self._currentTime),
                self.$refs.myVideo.addEventListener('canplay', self._durationTime)
        },
        removeEventListeners: function () {
            let self = this;
            self.$refs.myVideo.removeEventListener('timeupdate', self._currentTime)
            self.$refs.myVideo.removeEventListener('canplay', self._durationTime)
        },
        _currentTime: function () {
            let self = this;
            self.videonowtime = parseInt(self.$refs.myVideo.currentTime)
        },
        _durationTime: function () {
            let self = this;
            if (parseInt(self.$refs.myVideo.duration) == 0) {
                this.spalltime();
            } else {
                self.videoalltime = parseInt(self.$refs.myVideo.duration)
            }
            this.videoall()
        },

        videoall() {
            setInterval(() => {
                let self = this
                if (self.videoalltime / 2 <= self.videonowtime && self.remend == true) {
                    self.video_active = 1;
                    self.swipererke();
                }

                if (self.videoalltime / 3 <= self.videonowtime && this.key && self.expert_image != undefined) {
                    self.doctoractive = true;
                    
                }
            }, 1000);
        },
        wechat() {
            document.getElementById("myVideo").pause();
            this.sphei = false;
            this.wechatshow = true;
        },
        closeWechat() {
            this.wechatdata = false;
        },
        checkDiscountsode() {
            if (this.DiscountsCode) {
                this.DiscountsCode = false;
            } else {
                this.DiscountsCode = true;
            }

        },

        yzcode() {
            let _this = this;
            this.yjprice = this.discountoption;
            let qian = this.discountoption;
            if (_this.yqmCode.length >= 1) {
                _this.focusDis = true;
            }
            if (_this.yqmCode.length >= 6) {

                classapi.yqmcode(_this.key, _this.yqmCode).then(res => {
                    if (res.data.datas.error != null) {
                        _this.DiscountsVerify = false;
                        Notify({
                            message: res.data.datas.error,
                            type: "danger",
                            duration: 3000
                        });
                        _this.zekou = 1;
                    } else {
                        if (res.data.datas != 0) {
                            if (res.data.datas.status == 1) {
                                _this.DiscountsVerify = true;
                                _this.zekou = res.data.datas.discount / 100;
                                _this.discountoption = (qian * _this.zekou).toFixed(2);
                                _this.codeDiscount.code_result = 1;
                                _this.codeDiscount.tationcode = res.data.datas.tationcode;
                                _this.codeDiscount.discount = res.data.datas.discount;
                                Notify({
                                    message: '邀请码验证成功，您已获得专属' + res.data.datas.discount / 10 + '折优惠',
                                    type: "success",
                                    duration: 5000
                                });
                            }

                        } else {
                            Notify({
                                message: '邀请码错误！请重新输入',
                                type: "danger",
                                duration: 2000
                            });
                            _this.yqmCode = '';
                            _this.DiscountsVerify = false;
                            _this.zekou = 1;
                        }
                    }

                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        _this.toast(errmsg);
                    }
                });

            } else {
                _this.DiscountsVerify = false;
            }
        },
        recommend(){
            for (let i in this.videolist) {
                if (this.videolist[i].gm == 1) {
                     this.remend = true;
                }
            }
        },
        getshareuid(){  //获取分享用户id
            classapi.users(this.key).then(res=>{
                this.share_uid = res.data.datas.member_info.member_id
                this.shareheard = res.data.datas.member_info.avator
             }).catch(err => {
                 if (err.message != "interrupt") {
                     let errmsg = '请求失败';
                     if (err.message.includes('timeout')) {
                         errmsg = "请检查网络再刷新重试"
                     }
                     this.toast(errmsg);
                 }
             });
        },
        onimgshare(path){  //分享组件处理
            if(this.key){
               if(!localStorage.getItem(`shareimg-${this.classid}`)){
               let name_img = 'add'
               classapi.sharbg(name_img, this.shareheard,this.share_images,path,this.key).then(res=>{
                    this.shareimgname = res.data.datas
                    this.shareimg=`http://yijiaobao.com.cn/haibao/${res.data.datas}`;
                    localStorage.setItem(`shareimg-${this.classid}`,this.shareimg)
               }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
             }else{
                this.shareimg = localStorage.getItem(`shareimg-${this.classid}`)
             }
            }else{
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        removeshare(){
            classapi.sharemove(this.shareimgname,this.key).then(res=>{
                
            })
        },
        consultclick(){
             if(this.isconsult){
                 this.isconsult=false
             }else{
                this.isconsult=true
             }
        },
        gogroup(){
            this.$router.push({
                  name:'groupclass',
                  query: {
                    classid: this.classid
                  }
            })
            
        }
    },
    beforeCreate() {

    },
    created() {
        var sharefrom = window.location.href;
        if(!this.$route.query.state){
            this.classtype = 1
        }
        if (sharefrom.split("from=")[1]) {
            this.fromflag = false
            window.location.href = this.present
        }
        if (this.fromflag) {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                this.order_pay = 'H5'
            } else {
                this.order_pay = 'wap'
            }
            this.list1();
            this.list2();
            this.list3();
            this.list7();
            let _this = this;
            document.onkeydown = function (event) {
                if (event.keyCode == 13) {
                    _this.send();
                }
            }
        }

    },
    watch: {
        checkedNames() {
           
            var ckallarr = [];
            for (let i in this.videolist) {
                if (this.videolist[i].freession == 0 && this.videolist[i].gm != 1) {
                    ckallarr.push(this.videolist[i].vo_id + ',' + this.videolist[i].video_price)
                }
            }
            if (ckallarr.length == this.checkedNames.length) {
                this.quanxuan = true;
            } else {
                this.quanxuan = false;
            }
            var optionval = [];
            var allprice = 0;
            for (let i in this.checkedNames) {
                var spval = this.checkedNames[i].split(",");
                if (spval[0].length > 0) {
                    optionval.push(spval[0]);
                    allprice += parseFloat(spval[1]);
                }
            }
            var ckvals = '';
            ckvals += optionval + ","
            this.optionvalue = ckvals.substring(0, ckvals.length - 1);
            this.discountoption = allprice.toFixed(2);
            var arrquan = [];
            var qian = this.discountoption;
            let jian;
            var mjmax = false;
            for (let p in this.quan) {

                if (qian >= parseFloat(this.quan[p].gao)) {
                    jian = this.quan[p].index;

                    mjmax = true;
                }
            }
            let liwu = false;
            this.gift.conditiondata = [];
            for(let w in this.gift.datalist){
                if(qian >= parseFloat(this.gift.datalist[w].gift_price)){
                    liwu = true;
                    this.gift.conditiondata = this.gift.datalist[w]
                    this.gift.isunfold = true
                }
            }
            if(this.gift.conditiondata.length==0){
                this.gift.isunfold = false
            }
            var prices;
            if (mjmax) {

                Notify({
                    message: "已为您自动选择满" + this.quan[jian].gao + "减" + this.quan[jian].di + "的优惠券",
                    type: "success",
                    duration: 1000
                });
                this.yjprice = (qian - this.quan[jian].di).toFixed(2);
                this.discountoption = ((qian - this.quan[jian].di) * this.zekou).toFixed(2);
            } else {
                this.yjprice = qian;
                this.discountoption = (qian * this.zekou).toFixed(2);
            }
        },


    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
            this.$refs.scrolls.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
            this.$refs.scrolls.refresh();
        }
        if(this.classtype == 1){
        var that = this;
        document.getElementById("myVideo").addEventListener('play', function () {
            that.yipics = true;
        }, false);
        this.addEventListeners()
        }
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        
    },
    beforeDestroyed() {
        this.removeEventListeners()
    },
    destroyed(){
        if(this.key){
            localStorage.removeItem(`shareimg-${this.classid}`)
            this.removeshare()
        }
        window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },
}