import Vue from "vue";
import common from "./common";
import doctorapi from "@/api/DoctorApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import {
    Image
} from 'vant';
Vue.use(Image);
export default {
    name: 'doctor',
    data() {
        return {
            comname: '医生主页',
            nocontent: require("../image/nomsg.png"),
            questionsprice: this.$store.state.answerprice,
            key: this.$store.state.key.value,
            expert_image: '',
            expert_name: '',
            expert_title: '',
            expert_hospital: '',
            expert_score: '',
            tw_price: '',
            dh_price: '',
            expert_brief: '',
            expert_goods: '',
            expert_tw: '',
            expert_dh: '',
            expert_sum: '',
            curpage: 1,
            setTotal: '',
            morebtntext: '点击加载更多',
            disableds: false,
            problem: [],
            imgs: [],
            loding: true,
            morenum: 8, //课程章节条数 默认8条
            morenumpl: 8, //评价条数 默认8条
            msglists: null, //评价列表
            curpages: 1,
            options: {
                pullUpLoad: false
            },
            setTotals: '',
            isShowMore: false,
            zhankaitext: '',
            zhuangtai: true,
            member_mobile: "",
        }
    },
    methods: {
        showmoreDesc() {
            if (this.zhuangtai) {
                this.zhankaitext = "收起";
                this.zhuangtai = false;
            } else {
                this.zhankaitext = "展开";
                this.zhuangtai = true;
            }
        },
        consultway(index) {
            if (this.key) {
                if (this.member_mobile) {
                    this.$router.push({
                        name: 'consult',
                        query: {
                            id: index,
                            doctorid: this.$route.query.id
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/binding',
                        query: {
                            back: true
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
        showImagePreview() {
            this.$createImagePreview({
                imgs: this.imgs
            }).show()
        },
        list1() {
            doctorapi.expertdetails(this.$route.query.id).then(res => {
                this.expert_image = res.data.datas.details.expert_image
                this.imgs.push(this.expert_image);
                this.expert_name = res.data.datas.details.expert_name
                this.expert_title = res.data.datas.details.expert_title
                this.expert_hospital = res.data.datas.details.expert_hospital
                this.expert_score = res.data.datas.details.expert_score
                this.tw_price = res.data.datas.details.tw_price
                this.dh_price = res.data.datas.details.dh_price
                this.expert_brief = res.data.datas.details.expert_brief
                this.expert_goods = res.data.datas.details.expert_miaoshu
                this.expert_tw = res.data.datas.details.expert_tw
                this.expert_dh = res.data.datas.details.expert_dh
                this.expert_sum = res.data.datas.details.expert_sum
                if (this.expert_brief.length > 100) {
                    this.isShowMore = true;
                    this.zhankaitext = "展开";
                }
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
        list2() {
            doctorapi.problemlist(this.$route.query.id, this.curpage).then(res => {
                if (common.dataisnull(res.data.datas.problem)) {
                    this.problem = res.data.datas.problem;
                    this.setTotal = res.data.datas.setTotal;
                } else {
                    this.problem = null;
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
        list3() {
            doctorapi.msglist(this.$route.query.id, this.curpages).then(res => {
                this.msglists = res.data.datas;
                if (this.msglists == null) {
                    this.options.pullUpLoad = false;
                } else {
                    this.setTotals = res.data.datas[0].setTotal
                    this.options.pullUpLoad = {
                        threshold: 0,
                        txt: {
                            more: '上拉加载更多评论',
                            noMore: '没有更多评论'
                        }
                    }
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
        list4() {
            let _this = this;
            doctorapi.yzphone(_this.key).then(res => {
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
        onPullingUp() {
            if (this.curpages < this.setTotals) {
                this.curpages++;
                doctorapi.msglist(this.$route.query.id, this.curpages).then(res => {
                    this.msglists = this.msglists.concat(res.data.datas);
                    setTimeout(() => {
                        this.$refs.scroll.forceUpdate(true);
                        this.$refs.scroll.refresh();
                    }, 10);
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
                setTimeout(() => {
                    this.$refs.scroll.forceUpdate();
                    this.$refs.scroll.refresh();
                }, 10);
            }
        },
        morebtn() {
            if (this.curpage < this.setTotal) {
                this.disableds = true;
                this.curpage++;
                this.morebtntext = '正在加载中...'
                doctorapi.problemlist(this.$route.query.id, this.curpage).then(res => {
                    this.problem = this.problem.concat(res.data.datas.problem);
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
    },
    created() {
        this.list1();
        this.list2();
        this.list3();
        this.list4();
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        }
    }
}