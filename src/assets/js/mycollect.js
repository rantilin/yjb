import Vue from "vue";
import common from "./common";
import mycollectapi from "@/api/MycollectApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'mycollect',
    components: {},
    data() {
        return {
            comname: '我的收藏',
            currentTab: 0,
            key: this.$store.state.key.value,
            nocontent: require("../image/nocontent.png"),
            list: [],
            videolist: [],
            audiolist: [],
            wzlist: [],
            loding: true,
            opc: true,
            vantab: {
                list: [
                    "宝宝看看",
                    "宝宝听听",
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
        }
    },
    methods: {
        pitchtab(index) {
            this.currentTab = index;
            this.$nextTick(() => {
                if (this.videolist.length > 0) {
                    this.$refs.scroll1.refresh();
                }
                if (this.audiolist.length > 0) {
                    this.$refs.scroll2.refresh();
                }
                // if (this.wzlist != null) {
                //     this.$refs.scroll3.refresh();
                // }
            });
        },
        switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (this.currentTab == cur) {
                return false;
            } else {
                this.currentTab = cur;
            }
            this.$nextTick(() => {
                if (this.videolist.length > 0) {
                    this.$refs.scroll1.refresh();
                }
                if (this.audiolist.length > 0) {
                    this.$refs.scroll2.refresh();
                }
                // if (this.wzlist != null) {
                //     this.$refs.scroll3.refresh();
                // }
            });
        },
        list1() {
            mycollectapi.collectlist(this.key).then(res => {
                this.list = res.data.datas;
                if (common.dataisnull(this.list)) {
                    for (let i in this.list) {
                        if (this.list[i].room_state == 1) {
                            this.videolist.push(this.list[i]);
                        } else {
                            this.audiolist.push(this.list[i]);
                        }
                    }
                } else {
                    this.list = null
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
            mycollectapi.wzcollectlist(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.wzlist = res.data.datas;
                } else {
                    this.wzlist = null
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
        touch(id) {
            clearInterval(this.Loop);
            this.opc = true;
            this.Loop = setTimeout(function() {
                this.$createDialog({
                    type: 'confirm',
                    title: '收藏删除',
                    content: '是否删除此收藏？',
                    confirmBtn: {
                        text: '删除',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        const toast = this.$createToast({
                            time: 0,
                            txt: '正在删除'
                        })
                        toast.show()
                        mycollectapi.delvideolist(this.key, id).then(res => {
                            toast.hide()
                            this.toast('删除成功');
                            this.videolist = [];
                            this.audiolist = [];
                            this.list1();
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
                }).show()
                this.opc = false;
            }.bind(this), 800);
        },
        cleartime() {
            clearInterval(this.Loop);
        },
        touchs(id) {
            clearInterval(this.Loops);
            this.opc = true;
            this.Loops = setTimeout(function() {
                this.$createDialog({
                    type: 'confirm',
                    title: '收藏删除',
                    content: '是否删除此收藏？',
                    confirmBtn: {
                        text: '删除',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        const toast = this.$createToast({
                            time: 0,
                            txt: '正在删除'
                        })
                        toast.show()
                        mycollectapi.delwzlist(this.key, id).then(res => {
                            toast.hide()
                            this.toast('删除成功');
                            this.list2();
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
                }).show()
                this.opc = false;
            }.bind(this), 800);
        },
        cleartimes() {
            clearInterval(this.Loops);
        },
        goaudio(id) {
            if (this.opc) {
                this.$router.push({
                    name: 'audio',
                    query: {
                        classid: id,
                    }
                })
            }
        },
        goclass(id) {
            if (this.opc) {
                this.$router.push({
                    name: 'class',
                    query: {
                        classid: id,
                    }
                })
            }
        },
        gowenzhang(id) {
            if (this.opc) {
                this.$router.push({
                    name: 'knowledgedetails',
                    query: {
                        id: id,
                    }
                })
            }
        }
    },
    created() {
        if (this.key) {
            this.list1();
            // this.list2();
        } else {
            this.$router.push({ path: '/login' })
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.videolist.length > 0) {
                this.$refs.scroll1.refresh();
            }
            if (this.audiolist.length > 0) {
                this.$refs.scroll2.refresh();
            }
            // if (this.wzlist != null) {
            //     this.$refs.scroll3.refresh();
            // }
        });
        window.onresize = () => {
            if (this.videolist.length > 0) {
                this.$refs.scroll1.refresh();
            }
            if (this.audiolist.length > 0) {
                this.$refs.scroll2.refresh();
            }
            // if (this.wzlist != null) {
            //     this.$refs.scroll3.refresh();
            // }
        }
    }
}