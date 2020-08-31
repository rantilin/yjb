import Vue from "vue";
import common from "./common";
import paygroupapi from "@/api/PaygroupApi";
import Lottie from "vue-lottie/src/lottie.vue";
import musicAnim from "@/assets/json/playaudionew.json";
import ComponentLoading from '@/components/ComponentLoading';
import VueWechatTitle from 'vue-wechat-title';
import {
    Dialog
} from 'vant';
Vue.use(VueWechatTitle);
import {
    Image,
    Tab,
    Tabs,
    Popup
} from 'vant';
Vue.use(Image).use(Tab).use(Tabs).use(Popup)
import {
    share_yp
} from './share';
export default {
    name: 'paygroup',
    components: {
        Lottie,
        ComponentLoading
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            comname: '班级详情',
            avtiveindex: 0,
            headflag: false,
            key: this.$store.state.key.value,
            id: this.$route.query.id,
            nocontent: require("../image/nomsg.png"),
            datas: [],
            morenumpl: 8, //评价条数 默认8条
            msglists: [],
            msglistes: [], //评价列表
            loding: true,
            msglen: 0,
            value: '',
            goods_image: '',
            indexlogo: 'http://yijiaobao.com.cn/wap/images/logo1.png',
            placeholder: "我来说几句",
            clearable: {
                visible: true,
                blurHidden: true
            },
            options: {
                pullUpLoad: false
            },
            dialogshows: false,
            dialogtext: '',
            apply: false,
            applicant: false,
            vantab: {
                list: [
                    "详情介绍",
                    "课程目录",
                    "评论",
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
            member_mobile: "",
            musicoption: {
                animationData: musicAnim,
                loop: true,
                autoplay: true
            },
            complimentary: { //赠品
                index: 0,
                videolist: [],
                sphei: false,
                comnum: 0,
                videosrc: "", //视频地址
                playindex: 0, //初始化默认播放下标为0
                xiabiao: 0,
                morenum: 8, //课程章节条数 默认8条
                yipics: false,
                zjtext: '',
                zjid: '',
                gm: false,
            },
            sharename: '',
            desc: "一个帮爸妈养娃省心省力的平台，加入班级社群为您提供更贴心的服务",
            url: process.env.VUE_APP_SERVICE_URLS,
            present: process.env.VUE_APP_SERVICE_URLS + "#/paygroup?id=" + this.$route.query.id + "",
            isRouterAlive: true,
            isDiscuss: false,
            isboard:false,
        }
    },
    methods: {
        reloads() {
            window.location.reload();
        },
        back() {
            if (window.history.length <= 2) {
                this.$router.push({
                    path: '/',
                    query: {
                        activeindex: this.index,
                    }
                })
            } else {
                this.$router.push({
                    path: '/',
                    query: {
                        activeindex: this.index,
                    }
                })
            }
            localStorage.removeItem('lanmuvals');
        },
        H5() {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                this.dialogtext = "长按扫码添加微信"
            } else {
                this.dialogtext = "截屏保存图片识别"
            }
        },
        consultbtn() {
            this.dialogshows = true;
        },
        mengcengview() {
            this.dialogshows = false;
        },
        nowpay() {
            this.isboard = true
        },
        pitchtab(index) {
            this.avtiveindex = index;
            if (this.complimentary.comnum > 0) {
                switch (this.avtiveindex) {
                    case 0:
                        this.options.pullUpLoad = false;
                        break;
                    case 1:
                        this.options.pullUpLoad = {
                            txt: {
                              more: '上拉加载更多视频',
                              noMore: '没有更多视频'
                            }
                          };
                        break;
                    case 2:
                        if (this.msglists == null) {
                            this.options.pullUpLoad = false;
                        } else {
                            this.options.pullUpLoad = {
                                threshold: 0,
                                txt: {
                                    more: '上拉加载更多评论',
                                    noMore: '没有更多评论'
                                }
                            }
                        }
                        this.$refs.scroll.refresh();
                        break;
                }
            } else {
                switch (this.avtiveindex) {
                    case 0:
                        this.options.pullUpLoad = false;
                        this.isDiscuss = false;
                        break;
                    case 1:
                        this.isDiscuss = true;
                        if (this.msglists == null) {
                            this.options.pullUpLoad = false;
                        } else {
                            this.options.pullUpLoad = {
                                threshold: 0,
                                txt: {
                                    more: '上拉加载更多评论',
                                    noMore: '没有更多评论'
                                }
                            }
                        }
                        this.$refs.scroll.refresh();
                        break;
                }
            }
        },
        scroll(probeType) {
            if (-probeType.y >= 34) {
                this.headflag = true;
            } else {
                this.headflag = false;
            }
        },
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        onPullingUp() {
            
            switch (this.avtiveindex) {
                case 0:
                    break;
                case 1:
                    if(this.complimentary.morenum < this.complimentary.comnum){
                       
                      setTimeout(() => {
                        this.complimentary.morenum = this.complimentary.morenum + 4;
                        this.$refs.scroll.forceUpdate(true);
                        this.$refs.scroll.refresh();
                      }, 1500); 
                     
                    }else{
                       
                        this.$refs.scroll.forceUpdate();
                        this.$refs.scroll.refresh();
                    }
                    break;
                case 2:
                    close.log(12);
                    if (this.morenumpl < this.msglists.length) {
                        this.morenumpl = this.morenumpl + 4;
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
        send() {
            if (this.key) {
                if (this.value == '') {
                    this.toast('请输入评价内容');
                    return false;
                }
                paygroupapi.addmsg(this.key, this.id, this.value).then(res => {
                    this.toast('感谢您的评价');
                    var arr = [];
                    arr.push.apply(arr, [res.data.datas])
                    if (this.msglists == null) {
                        this.msglists = []
                    }
                    this.msglen = this.msglen + 1;
                    this.msglists = arr.concat(this.msglists);
                    if (this.complimentary.comnum > 0) {
                        this.vantab.list = [
                            "详情介绍",
                            "课程目录(" + this.complimentary.comnum + ")",
                            "评价(" + this.msglen + ")",
                        ]
                    } else {
                        this.vantab.list = [
                            "详情介绍",
                            "评价(" + this.msglen + ")",
                        ]
                    }
                    this.$refs.scroll.refresh();
                }).catch(err => {
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        //this.toast(errmsg);
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
        list1() {
            paygroupapi.lists(this.id).then(res => {
                this.datas = res.data.datas;
                this.goods_image = res.data.datas.goods_image;
                this.comname = res.data.datas.goods_name;
                this.sharename = res.data.datas.goods_name;
                let applel = this.datas.applicant
                let applicantnum = applel.split("/");
                if (parseInt(applicantnum[0]) >= parseInt(applicantnum[1])) {
                    this.applicant = false
                } else {
                    this.applicant = true
                }
                this.loding = false;

                let zeng = res.data.datas.zeng;

                if (Object.keys(zeng).length != 0) {
                    this.complimentary.videolist = res.data.datas.zeng;
                    this.complimentary.comnum = res.data.datas.zeng.length;
                    this.complimentary.videosrc = this.complimentary.videolist[this.complimentary.playindex].video_address;
                    this.complimentary.zjtext = this.complimentary.videolist[this.complimentary.playindex].courseware;
                    this.complimentary.zjid = this.complimentary.videolist[this.complimentary.playindex].vo_id;
                }
                if (this.complimentary.comnum > 0) {
                    this.vantab.list = [
                        "详情介绍",
                        "课程目录(" + this.complimentary.comnum + ")",
                        "评价(" + this.msglen + ")",
                    ]
                } else {
                    this.vantab.list = [
                        "详情介绍",
                        "评价(" + this.msglen + ")",
                    ]
                }
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    //this.toast(errmsg);
                }
            });
        },
        list2() {
            paygroupapi.msglist(this.id).then(res => {
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
                if (this.complimentary.comnum > 0) {
                    this.vantab.list = [
                        "详情介绍",
                        "课程目录(" + this.complimentary.comnum + ")",
                        "评价(" + this.msglen + ")",
                    ]
                } else {
                    this.vantab.list = [
                        "详情介绍",
                        "评价(" + this.msglen + ")",
                    ]
                }
                this.list5();
            }).catch(err => {
                console.log(err)
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    //this.toast(errmsg);
                }
            });
        },
        list3() {
            paygroupapi.apply(this.key, 6, this.id).then(res => {
                if (res.data.datas == '0') {
                    this.apply = true;
                    this.complimentary.gm = false;
                } else {
                    if (res.data.datas[0].gm == 1 || res.data.datas[0].gm == null) {
                        this.apply = false;
                        this.complimentary.gm = true;
                    }
                }
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    //this.toast(errmsg);
                }
            });
        },
        list4() {
            let _this = this;
            paygroupapi.yzphone(_this.key).then(res => {
                if (res.data.datas.member_mobile != "") {
                    this.member_mobile = res.data.datas.member_mobile;
                }
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    //this.toast(errmsg);
                }
            });
        },
        list5() {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                share_yp(this.keyval, 1, this.sharename, this.indexlogo, this.desc, this.url, this.present);
            }
        },
        videocheck() {
            this.$refs.scroll.disable();
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
                this.complimentary.sphei = true;
                this.complimentary.yipics = true;
                this.avtiveindex = 1;
                document.getElementById("myVideo").play();
            }

        },
        morenbofang() {
            if (this.complimentary.videosrc != '') {
                this.complimentary.sphei = true;
                this.complimentary.yipics = true;
            }
            document.getElementById("myVideo").play();
        },
        listbtn(index) {
            this.complimentary.index = index;
            if (this.complimentary.videolist[index].freession == 0 && this.apply) {

                this.toast("该章节报名后才能继续学习哦");
                return false;
            } else if (!this.key) {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            } else if (!common.validateTel(this.member_mobile)) {
                this.$router.push({
                    path: '/binding',
                    query: {
                        back: true
                    }
                })
            }

            this.complimentary.playindex = index;
            this.complimentary.videosrc = this.complimentary.videolist[this.complimentary.playindex].video_address
            this.complimentary.zjtext = this.complimentary.videolist[this.complimentary.playindex].courseware
            this.complimentary.zjid = this.complimentary.videolist[this.complimentary.playindex].vo_id
            this.complimentary.sphei = true;
            this.$refs.myVideo.src = this.complimentary.videosrc;
            this.$nextTick(() => {
                this.$refs.myVideo.load();
                document.getElementById('myVideo').play();
            });
            this.complimentary.yipics = true;
            this.$refs.scroll.scrollTo(0, 0);
        },
        morebtn() {
            this.complimentary.morenum = this.complimentary.morenum + 8;
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        MusicAnimation(anim) {
            this.musicanim = anim;
        },
        goneweb(){
            window.location.href = `http://m.yijiaobao.com.cn/wap/#${this.$route.path}?${common.convertObj(this.$route.query)}`
        },
        boardclose(){
            this.isboard = false
            if (this.key) {
                if (this.applicant) {
                    if (this.apply) {
                        let timestamp = Date.parse(new Date()).toString();
                        timestamp = timestamp.substr(0, 10);
                        if (timestamp > this.datas.query_start_time) {
                            if (timestamp < this.datas.query_end_time) {
                                if (!common.validateTel(this.member_mobile)) {
                                    this.$router.push({
                                        path: '/binding',
                                        query: {
                                            back: true
                                        }
                                    })
                                } else {
                                    this.$router.push({
                                        path: '/information',
                                        query: {
                                            price: this.datas.goods_price,
                                            id: this.id
                                        }
                                    })
                                }
                            } else {
                                if (this.datas.goods_url) {
                                    var cs = this.datas.goods_url.split('?')[1];
                                    var cs_arr = cs.split('&');
                                    var cs = {};
                                    for (var i = 0; i < cs_arr.length; i++) {
                                        cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
                                    }
                                    this.toast("报名时间已过，正在为您跳转链接");
                                    setTimeout(() => {
                                        window.location.href = "/#/paygroup?id=" + cs.id + "&index=2";
                                    }, 2000)
                                    // window.open("/#/paygroup?id="+cs.id+"&index=2");

                                } else {
                                    this.toast("报名时间已过");
                                }

                            }
                        } else {
                            this.toast("报名时间还没到")
                        }
                    } else {
                        this.toast("您已报名过了")
                    }
                } else {
                    if (this.datas.goods_url) {
                        var cs = this.datas.goods_url.split('?')[1];
                        var cs_arr = cs.split('&');
                        var cs = {};
                        for (var i = 0; i < cs_arr.length; i++) {
                            cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
                        }
                        // window.open("/#/paygroup?id="+cs.id+"&index=2");

                        this.toast("报名人数已满，正在为您跳转链接");
                        setTimeout(() => {
                            window.location.href = "/#/paygroup?id=" + cs.id + "&index=2";
                        }, 2000)
                    } else {
                        this.toast("报名人数已满")
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
            
        }

    },
    created() {
        this.list1();
        this.list3();
        this.list4();
        this.list2();
        this.H5();
        let _this = this;
        document.onkeydown = function (event) {
            if (event.keyCode == 13) {
                _this.send();
            }

        }

    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        };
        var that = this;
        document.getElementById("myVideo").addEventListener('play', function () {
            that.complimentary.yipics = true;
        }, false);
    },
    watch: { //监听路由变化
        $route(to, from) {
            this.reloads();
        }
    }

}