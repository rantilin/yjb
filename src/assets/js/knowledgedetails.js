import Vue from "vue";
import common from "./common";
import knowledgedetailsapi from "@/api/KnowledgedetailsApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'knowledgedetails',
    data() {
        return {
            comname: '知识详情',
            nocontent: require("../image/nomsg.png"),
            key: this.$store.state.key.value,
            value: '',
            placeholder: "我来说几句",
            clearable: {
                visible: true,
                blurHidden: true
            },
            focusval: false,
            id: '',
            atitle: '',
            thumbnail: '',
            expert_image: '',
            expert_mender: '',
            expert_name: '',
            expert_title: '',
            expert_hospital: '',
            unscramble: '',
            wxtjlist: [],
            msglistes: [],
            collectstate: '', //收藏状态
            loding: true,
            msglen: 0,
            scrollEvents: ['before-scroll-start'],
        }
    },
    methods: {
        scrollnow() {
            this.$refs.scroll.refresh();
        },
        list1() {
            knowledgedetailsapi.konwdetail(this.id).then(res => {
                this.atitle = res.data.datas.details[0].atitle;
                this.thumbnail = res.data.datas.details[0].thumbnail;
                this.expert_image = res.data.datas.details[0].expert_image;
                this.expert_mender = res.data.datas.details[0].expert_mender;
                this.expert_name = res.data.datas.details[0].expert_name;
                this.expert_title = res.data.datas.details[0].expert_title;
                this.expert_hospital = res.data.datas.details[0].expert_hospital;
                this.unscramble = res.data.datas.details[0].unscramble;
                this.$refs.content.innerHTML = res.data.datas.details[0].acontent;
                if (common.dataisnull(res.data.datas.wxtj)) {
                    this.wxtjlist = res.data.datas.wxtj;
                } else {
                    this.wxtjlist = null;
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
            knowledgedetailsapi.msglists(this.id).then(res => {
                if (common.dataisnull(res.data.datas.msg)) {
                    this.msglistes = res.data.datas.msg;
                    this.msglen = this.msglistes.length;
                } else {
                    this.msglistes = null;
                    this.msglen = 0
                }
                this.$nextTick(() => {
                    this.$refs.scroll.refresh();
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
        },
        list3() {
            if (this.key) {
                knowledgedetailsapi.collectstate(this.key, this.id).then(res => {
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
            knowledgedetailsapi.collection(this.key, this.id, val).then(res => {

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
            knowledgedetailsapi.addcollection(this.id).then(res => {}).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        sends() {
            if (this.key) {
                if (this.value == '') {
                    this.toast('请输入评价内容');
                    this.focusval = false;
                    return false;
                }
                knowledgedetailsapi.addmsg(this.key, this.id, this.value).then(res => {
                    if (res.data.datas == 1) {
                        this.toast('感谢您的评价');
                        this.list2();
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
                this.value = ''
                this.focusval = false;
            } else {
                this.focusval = false;
                this.$router.push({
                    path: '/login',
                    query: { back: true }
                })
            }
        },
        wxtjbtn(id) {
            this.$router.push({
                path: '/knowledgedetails',
                query: { id: id }
            })
        },
        focus() {
            this.focusval = true;
        },
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        colltctionbtn() {
            if (this.key) {
                if (this.collectstate == 0) {
                    this.toast('收藏成功');
                    this.list4(1);
                    this.collectstate = 1
                } else {
                    this.list4(0);
                    this.collectstate = 0
                }
            } else {
                this.$router.push({
                    path: '/login',
                    query: { back: true }
                })
            }
        },
        godoctor() {
            this.$router.push({
                path: '/doctor',
                query: { id: this.expert_mender }
            })
        },
    },
    created() {
        this.id = this.$route.query.id;
        this.list1();
        this.list2();
        this.list3();
        this.list5();
        let _this = this;
        document.onkeydown = function(event) {
            if (event.keyCode == 13) {
                _this.toast('提交请求' + _this.value);
                _this.focusval = false;
            }

        }
    },
    watch: {
        '$route' (to, from) {
            if (to.query.id !== from.query.id) {
                this.loding = true;
                this.id = to.query.id
                this.list1();
                this.list2();
                this.list3();
                this.list5();
                this.$nextTick(() => {
                    this.$refs.scroll.scrollTo(0, 0, 0);
                    this.$refs.scroll.refresh();
                });
                let _this = this;
                document.onkeydown = function(event) {
                    if (event.keyCode == 13) {
                        _this.toast('提交请求' + _this.value);
                        _this.focusval = false;
                    }

                }
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
            window.onresize = () => {
                this.$refs.scroll.refresh();
            }
        }, 200)
    }
}