import Vue from "vue";
import common from "./common";
import { share_yp } from './share';
import audioapi from "@/api/AudioApi";
import Lottie from "vue-lottie/src/lottie.vue";
import musicAnim from "@/assets/json/playaudionew.json";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Slider } from 'vant';
Vue.use(Image).use(Slider);
export default {
    name: 'audio',
    components: {
        Lottie
    },
    data() {
        return {
            key: this.$store.state.key.value,
            loding: true,
            audio: '',
            video: '',
            musicoption: {
                animationData: musicAnim,
                loop: true,
                autoplay: true
            },
            musicanim: "",
            classid: this.$route.query.classid,
            goods_image: '',
            goods_name: '',
            goods_price: '',
            goods_click: '',
            introduction: '',
            goods_images: '',
            audiolist: '',
            audiosrc: "",
            playindex: 0,
            xiabiao: 0,
            morenum: 8,
            collectstate: '',
            zjtext: '',
            msglen: '',
            startime: '0:00',
            duration: '0:00',
            durations: '0',
            playfalg: false,
            changdu: '',
            progresswidth: 0,
            progressleft: 0,
            zongshichang: '',
            zjid: '',
            goumai: 0,
            disabled: false,
            indexlogo: 'http://yijiaobao.com.cn/wap/images/logo1.png',
            desc: "一个帮爸妈养娃省心省力的平台，汇集全国名师名医，提高孩子成绩，实时儿科问诊，还有超多育儿福利资源，快来领取吧~",
            url: process.env.VUE_APP_SERVICE_URLS,
            present: process.env.VUE_APP_SERVICE_URLS + "#/audio?classid=" + this.$route.query.classid + "",
            yipics: false,
            shareshow: false,
            currentTimes: '',
            keyval: 1,
            fromflag: true,
            xxflag: true,
            noticecontent: '',
            index: this.$route.query.index,
            member_mobile: '',
        }
    },
    methods: {
        back() {
            if (window.history.length <= 2) {
                this.$router.push({
                    path: '/'
                })
            } else {
                this.$router.go(-1);
            }
            localStorage.removeItem('lanmuvals');
        },
        fanhui() {
            this.$router.push({
                path: '/',
                query: {
                    activeindex: this.index
                }
            })
        },
        backindex() {
            this.$router.push({
                path: '/'
            })
        },
        MusicAnimation(anim) {
            this.musicanim = anim;
        },
        list1() {
            audioapi.audiodetail(this.classid).then(res => {
                this.goods_image = res.data.datas.brief.goods_image;
                this.goods_name = res.data.datas.brief.goods_name;
                this.goods_price = res.data.datas.brief.goods_price;
                this.goods_click = common.number(res.data.datas.brief.goods_click);
                this.audiolist = res.data.datas.details;
                this.audiosrc = this.audiolist[this.playindex].video_address
                this.zjtext = this.audiolist[this.playindex].courseware
                this.duration = this.audiolist[this.playindex].duration
                this.durations = this.audiolist[this.playindex].durations
                this.zjid = this.audiolist[this.playindex].vo_id
                var shichang = 0;
                for (let i in this.audiolist) {
                    shichang += this.audiolist[i].durations
                }
                this.zongshichang = common.FormatTime(shichang);
                this.loding = false
                this.list5();
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
        list2() {
            if (this.key) {
                audioapi.collectstate(this.key, this.classid).then(res => {
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
        list3(val) {
            audioapi.collection(this.key, this.classid, val).then(res => {}).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list4() {
            if (this.key) {
                if (document.getElementById("myAudio").paused == false) {
                    audioapi.addlearning(this.key, this.classid, this.zjid, this.audiolist.length).then(res => {}).catch(err => {

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
        list5() {
            if (this.key) {
                share_yp(this.key, this.classid, this.goods_name, this.indexlogo, this.desc, this.url, this.present);
                audioapi.order_yz(this.key, this.classid).then(res => {
                    if (res.data.datas == 0) {
                        audioapi.audioshare(this.key, this.classid).then(res => {
                            if (res.data.datas >= 2) {
                                audioapi.order(this.key, 3, 2, this.classid, this.goods_price, this.order_pay).then(res => {
                                    this.goumai = 1
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
                        this.goumai = 1
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
                if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                    share_yp(this.keyval, this.classid, this.goods_name, this.indexlogo, this.desc, this.url, this.present);
                }
            }
        },
        listphone() {
            let _this = this;
            audioapi.yzphone(_this.key).then(res => {
                if (common.dataisnull(res.data.datas.member_mobile)) {
                    // this.member_mobile = res.data.datas.member_mobile;
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
        },
        listbtn(index) {
            if (this.goumai != 1) {
                if (this.audiolist[index].freession == 0) {
                    this.toast("该章节需要购买才能继续学习哦");
                    return false;
                }
            }
            if (!common.validateTel(this.member_mobile) && this.audiolist[index].freession != 1) {
                this.$router.push({
                    path: '/binding',
                    query: {
                        back: true
                    }
                })
            }
            this.chushi();
            this.xiabiao = index;
            this.audiosrc = '';
            this.playindex = index;
            this.audiosrc = this.audiolist[this.playindex].video_address
            this.zjtext = this.audiolist[this.playindex].courseware
            this.zjid = this.audiolist[this.playindex].vo_id
            this.duration = this.audiolist[this.playindex].duration
            this.durations = this.audiolist[this.playindex].durations
            this.playfalg = true;
            this.yipics = true;
            setTimeout(() => {
                document.getElementById("myAudio").play();
                var _this = this;
                var audiotd = document.querySelector(".audiotd").offsetWidth;
                var audiomove = document.querySelector(".audiomove").offsetWidth;
                var audiodot = document.querySelector(".audiodot").offsetWidth;
                _this.audio.ontimeupdate = function() {
                    if (_this.audio.currentTime >= 0) {
                        _this.startime = common.FormatTime(_this.audio.currentTime);
                    }
                    var percent = _this.audio.currentTime / _this.durations;
                    var jindu = (percent * 100) + "%";
                    _this.progresswidth = jindu;
                    _this.progressleft = percent * audiomove - (audiodot / 2);
                    _this.changdu = audiotd - audiodot;
                };
                this.list4();
            }, 100)
        },
        prve() {
            this.xiabiao--;
            if (this.xiabiao >= 0) {
                this.playfalg = false;
                document.getElementById("myAudio").pause();
                this.audiosrc = '';
                this.chushi();
                this.playindex = this.xiabiao;
                this.audiosrc = this.audiolist[this.playindex].video_address
                this.zjtext = this.audiolist[this.playindex].courseware
                this.zjid = this.audiolist[this.playindex].vo_id
                this.duration = this.audiolist[this.playindex].duration
                this.durations = this.audiolist[this.playindex].durations
            } else {
                this.xiabiao++;
                this.toast('上面没有啦')
            }
        },
        plays() {
            if (this.playfalg) {
                this.playfalg = false;
                document.getElementById("myAudio").pause();
            } else {
                this.playfalg = true;
                this.yipics = true;
                document.getElementById("myAudio").play();
                var _this = this;
                var audiotd = document.querySelector(".audiotd").offsetWidth;
                var audiomove = document.querySelector(".audiomove").offsetWidth;
                var audiodot = document.querySelector(".audiodot").offsetWidth;
                _this.audio.ontimeupdate = function() {
                    if (_this.audio.currentTime >= 0) {
                        _this.startime = common.FormatTime(_this.audio.currentTime);
                    }
                    var percent = _this.audio.currentTime / _this.durations;
                    var jindu = (percent * 100) + "%";
                    _this.progresswidth = jindu;
                    _this.progressleft = percent * audiomove - (audiodot / 2);
                    _this.changdu = audiotd - audiodot;
                };
                this.list4();
            }
        },
        next() {
            this.xiabiao++;
            if (this.xiabiao < this.audiolist.length) {
                let freession = this.audiolist[this.xiabiao].freession
                if (this.goumai == 1) {
                    freession = 1;
                }
                if (freession == 1) {
                    if (this.xiabiao + 1 > this.morenum) {
                        this.morenum = this.morenum + 8;
                        this.$nextTick(() => {
                            this.$refs.scroll.refresh();
                        });
                    }
                    this.playfalg = false;
                    document.getElementById("myAudio").pause();
                    this.chushi();
                    this.audiosrc = '';
                    this.playindex = this.xiabiao;
                    this.audiosrc = this.audiolist[this.playindex].video_address
                    this.zjtext = this.audiolist[this.playindex].courseware
                    this.zjid = this.audiolist[this.playindex].vo_id
                    this.duration = this.audiolist[this.playindex].duration
                    this.durations = this.audiolist[this.playindex].durations
                } else {
                    this.xiabiao--;
                    this.toast('该章节需要购买才能继续学习哦')
                }
            } else {
                this.xiabiao--;
                this.toast('已经到底啦')
            }
        },
        morebtn() {
            this.morenum = this.morenum + 8;
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        colltctionbtn() {
            if (this.key) {
                if (this.collectstate == 0) {
                    this.list3(1);
                    this.collectstate = 1
                    this.toast('收藏成功');
                } else {
                    this.list3(0);
                    this.collectstate = 0
                }
            } else {
                this.$router.push({
                    path: '/login',
                    query: { back: true }
                })
            }
        },
        buyclass(id) {
            if (this.key) {
                this.disabled = true;
                const toast = this.$createToast({
                    time: 0,
                    txt: '订单正在提交'
                })
                toast.show()
                audioapi.order(this.key, 1, 2, id, this.goods_price, this.order_pay).then(res => {
                    toast.hide();
                    this.disabled = false;
                    this.$router.push({
                        name: 'pay',
                        query: {
                            id: id,
                            state: 2,
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

            } else {
                this.$router.push({
                    path: '/login',
                    query: { back: true }
                })
            }
        },
        chushi() {
            this.audio = document.getElementById("myAudio");
            var audiotd = document.querySelector(".audiotd").offsetWidth;
            var audiodot = document.querySelector(".audiodot").offsetWidth;
            this.changdu = audiotd - audiodot;
            this.progressleft = -(audiodot / 2);
            this.progresswidth = 0;
            this.startime = '0:00';
        },
        sharebtn() {
            this.shareshow = true;
        },
        qrsharebtn() {
            this.shareshow = false;
        },
        starts() {

        },
        moves(e) {
            this.playfalg = false;
            document.getElementById("myAudio").pause();
            var windowwidth = document.documentElement.clientWidth;
            var audiotd = document.querySelector(".audiotd").offsetWidth;
            var audiomove = document.querySelector(".audiomove").offsetWidth;
            var audiodot = document.querySelector(".audiodot").offsetWidth;
            this.changdu = audiotd - audiodot;
            var pageX = e.touches[0].pageX - ((windowwidth - audiotd) / 2);
            if (pageX <= 0) {
                pageX = 0
            }
            if (pageX >= audiotd) {
                pageX = audiotd
            }
            var percent = pageX / audiotd;
            this.progresswidth = (percent * 100) + "%";
            this.progressleft = percent * audiomove - (audiodot / 2);
            this.currentTimes = pageX / (audiotd) * this.durations;
            this.startime = common.FormatTime(this.currentTimes);
        },
        ends() {
            this.playfalg = true;
            this.yipics = true;
            document.getElementById("myAudio").play();
            this.audio.currentTime = this.currentTimes;
            if (parseInt(this.currentTimes) == parseInt(this.durations)) {
                this.playfalg = false;
            }
        },
        xx() {
            this.xxflag = false;
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
        list6() {
            audioapi.notice().then(res => {
                this.noticecontent = res.data.datas[0].briefs
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
    beforeCreate() {

    },
    created() {
        var sharefrom = window.location.href;
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
            this.list6();
            this.listphone();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        }
        this.chushi();
        var md = document.getElementsByTagName("video")[0];
        md.addEventListener("ended", () => {
            this.playfalg = false;
            document.getElementById("myAudio").pause();
        })
    }
}