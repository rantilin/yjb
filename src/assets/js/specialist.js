import Vue from 'vue';
import common from "./common";
import {
    share_yp
} from './share';
import specialistapi from "@/api/SpecialistApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import {
    Image,
    ActionSheet,
    NoticeBar,
    Tab,
    Tabs
} from 'vant';
Vue.use(Image).use(ActionSheet).use(NoticeBar).use(Tab).use(Tabs);
export default {
    name: 'specialist',
    components: {},
    data() {
        return {
            currentTab: 0,
            currentTabs: 0,
            currentTabes: 0,
            questionsprice: this.$store.state.answerprice,
            show: false,
            loding: true,
            key: this.$store.state.key.value,
            nocontent: require("../image/nocontent.png"),
            column: [],
            wentilist: [{
                name: '全部'
            }, {
                name: '小儿肺炎'
            }, {
                name: '湿疹'
            }, {
                name: '小儿黄疸'
            }, ],
            wenti: [{
                name: '问题1'
            }, {
                name: '问题2'
            }, {
                name: '问题3'
            }, {
                name: '问题4'
            }, ],
            items: [{
                'a': 1
            }, {
                'a': 2
            }, {
                'a': 3
            }],
            expertlist: [],
            diseaselist: [],
            diseaselistinfo: [],
            diseaseid: '',
            curpage: 1,
            setTotal: '',
            morebtntext: '点击加载更多',
            disableds: false,
            rmqusertlist: [],
            rmqusertid: '',
            curpages: 1,
            setTotals: '',
            morebtntexts: '点击加载更多',
            disabledss: false,
            tw: '',
            dh: '',
            twkq: '',
            dhkq: '',
            doctorid: '',
            keyval: 1,
            sharename: '专家咨询-医教宝',
            indexlogo: 'http://yijiaobao.com.cn/wap/images/logo1.png',
            desc: "孩子咳嗽发烧常见感冒？发育迟缓，语言落后，多动抽动等问题？这里有专业医生，为你在线解答",
            url: process.env.VUE_APP_SERVICE_URLS,
            present: process.env.VUE_APP_SERVICE_URLS + "#/botnav/specialist",
            noticetext: false,
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p6: '',
            stateapi: false,
            vantab: {
                list: [
                    "知名专家",
                    "热门问题",
                ],
                color: "#21C891",
                background: "transparent",
                linewidth: "20px",
                lineheight: "3px",
                activecolor: "#333333",
                defaultcolor: "#333333",
                swipethreshold: 4,
                border: false,
                swipeable: true
            },
            fromflag: true,
            member_mobile: "",
        };
    },
    methods: {
        allapitrue() {
            if (this.p1 == true && this.p2 == true && this.p3 == true && this.p4 == true && this.p6 == true) {
                this.stateapi = true;
            } else {
                this.stateapi = false;
            }
        },
        pitchtab(index) {
            this.currentTab = index;
        },
        askdoctor(tw, dh, twkq, dhkq, doctorid) {
            if (this.key) {
                if (this.member_mobile == '') {
                    this.$router.push({
                        path: '/binding',
                        query: {
                            back: true
                        }
                    })
                }
                this.tw = tw;
                this.dh = dh;
                this.twkq = twkq;
                this.dhkq = dhkq;
                this.show = true;
                this.doctorid = doctorid;
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        close() {
            this.show = false;
        },
        switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (this.currentTab == cur) {
                return false;
            } else {
                this.currentTab = cur;
            }
        },
        switchNavs(event) {
            this.morebtntext = '点击加载更多';
            this.curpage = 1;
            var curs = event.currentTarget.dataset.current;
            if (this.currentTabs == curs) {
                return false;
            } else {
                const toast = this.$createToast({
                    time: 1000,
                    txt: '正在加载'
                })
                toast.show()
                this.currentTabs = curs;
                this.diseaseid = event.currentTarget.dataset.id;
                this.list3();
            }
        },
        switchNaves(event) {
            var cures = event.currentTarget.dataset.current;
            if (this.currentTabes == cures) {
                return false;
            } else {
                const toast = this.$createToast({
                    time: 1000,
                    txt: '正在加载'
                })
                toast.show()
                this.currentTabes = cures;
                this.rmqusertid = event.currentTarget.dataset.id;
                this.list4();
            }
        },
        consulttext() {
            if (this.key) {
                if (this.member_mobile == '') {
                    this.$router.push({
                        path: '/binding',
                        query: {
                            back: true
                        }
                    })
                } else {
                    this.$router.push({
                        name: 'consult',
                        query: {
                            id: 1,
                        }
                    })
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
        consultphone() {
            if (this.key) {
                this.$router.push({
                    name: 'consult',
                    query: {
                        id: 2,
                    }
                })
            } else {
                this.$router.push({
                    path: '/login',
                    query: {
                        back: true
                    }
                })
            }
        },
        consultway(index) {
            this.$router.push({
                name: 'consult',
                query: {
                    id: index,
                    doctorid: this.doctorid
                }
            })
        },
        godoctor(ids) {
            this.$router.push({
                name: 'doctor',
                query: {
                    id: ids,
                }
            })
        },
        examine(ids) {
            if (this.key) {
                if (this.member_mobile == '') {
                    this.$router.push({
                        path: '/binding',
                        query: {
                            back: true
                        }
                    })
                } else {
                    this.$router.push({
                        name: 'issuedetail',
                        query: {
                            id: ids,
                        }
                    })
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
        list1() {
            specialistapi.expert_list().then(res => {
                this.column = res.data.datas.bingli;
                this.expertlist = res.data.datas.expert;
                this.p1 = true;
                this.allapitrue();
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
            specialistapi.disease_list().then(res => {
                this.diseaselist = res.data.datas.bingz;
                var arr = [{
                    "columnm": "全部",
                    "id": "static"
                }];
                this.diseaselist = arr.concat(this.diseaselist);
                this.diseaseid = this.diseaselist[0].id;
                this.rmqusertid = this.diseaselist[0].id;
                this.p2 = true;
                this.allapitrue();
                this.list3();
                this.list4();
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
            specialistapi.disease_list_info(this.diseaseid, this.curpage).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.diseaselistinfo = res.data.datas
                    this.setTotal = res.data.datas[0].setTotal
                } else {
                    this.diseaselistinfo = null
                }
                this.loding = false;
                this.p3 = true;
                this.allapitrue();
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
        list4() {
            specialistapi.rm_qusert(this.rmqusertid, this.curpages).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.rmqusertlist = res.data.datas
                    this.setTotals = res.data.datas[0].setTotal
                } else {
                    this.rmqusertlist = null
                }
                this.p4 = true;
                this.allapitrue();
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
        list5() {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {

                share_yp(this.keyval, 1, this.sharename, this.indexlogo, this.desc, this.url, this.present);
            }
        },
        morebtn() {
            if (this.curpage < this.setTotal) {
                this.disableds = true;
                this.curpage++;
                this.morebtntext = '正在加载中...'
                specialistapi.disease_list_info(this.diseaseid, this.curpage).then(res => {
                    this.diseaselistinfo = this.diseaselistinfo.concat(res.data.datas);
                    this.morebtntext = '点击加载更多'
                    this.disableds = false;
                    this.$nextTick(() => {
                        this.$refs.scroll.refresh()
                    });
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
                this.morebtntext = '暂无更多'
            }
        },
        morebtns() {
            if (this.curpages < this.setTotals) {
                this.disabledss = true;
                this.curpages++;
                this.morebtntexts = '正在加载中...'
                specialistapi.rm_qusert(this.rmqusertid, this.curpages).then(res => {
                    this.rmqusertlist = this.rmqusertlist.concat(res.data.datas);
                    this.morebtntexts = '点击加载更多'
                    this.disabledss = false;
                    this.$nextTick(() => {
                        this.$refs.scroll.refresh()
                    });
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
                this.morebtntexts = '暂无更多'
            }
        },
        columnbtn(id, name) {
            this.$router.push({
                name: 'column',
                query: {
                    id: id,
                    name: name
                }
            })
        },
        list6() {
            specialistapi.notice().then(res => {
                if (res.data.datas == null) {
                    this.noticetext = false;
                } else {
                    this.noticetext = res.data.datas[0]
                }
                this.p6 = true;
                this.allapitrue();
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
        bdiphone() {
            let _this = this;
            specialistapi.yzphone(_this.key).then(res => {
                if (common.dataisnull(res.data.datas.member_mobile)) {
                    this.member_mobile = res.data.datas.member_mobile;
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
    },
    beforeCreate() {

    },
    created() {
        var sharefrom = window.location.href;
        if (sharefrom.split("from=")[1]) {
            this.fromflag = false
            window.location.href = this.present
        }
        this.bdiphone();
    },
    activated() {
        if (this.fromflag) {
            this.list5();
            if (!this.stateapi) {
                this.loding = true;
                this.list6();
                this.list1();
                this.list2();
            }
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
                this.$refs.scrolls.refresh();
            });
        }
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
    }
};