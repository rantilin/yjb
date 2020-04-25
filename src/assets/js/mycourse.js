import Vue from "vue";
import common from "./common";
import mycourseapi from "@/api/MycourseApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'mycourse',
    components: {},
    data() {
        return {
            comname: '我的课程',
            currentTab: 0,
            key: this.$store.state.key.value,
            bartab: [{ name: "宝宝看看" }, { name: "宝宝听听" }],
            nocontent: require("../image/nocontent.png"),
            videolist: [],
            audiolist: [],
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
                if (this.videolist != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.audiolist != null) {
                    this.$refs.scroll2.refresh();
                }
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
                if (this.videolist != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.audiolist != null) {
                    this.$refs.scroll2.refresh();
                }
            });
        },
        list1() {
            mycourseapi.courselist(this.key).then(res => {
                if (common.dataisnull(res.data.datas.sp)) {
                    this.videolist = res.data.datas.sp;
                } else {
                    this.videolist = null;
                }
                if (common.dataisnull(res.data.datas.yp)) {
                    this.audiolist = res.data.datas.yp;
                } else {
                    this.audiolist = null;
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
        touch(id) {
            clearInterval(this.Loop);
            this.opc = true;
            this.Loop = setTimeout(function() {
                this.$createDialog({
                    type: 'confirm',
                    title: '课程删除',
                    content: '是否删除此课程？',
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
                        mycourseapi.dellist(this.key, id).then(res => {
                            toast.hide()
                            this.toast('删除成功');
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
    },
    created() {
        if (this.key) {
            this.list1();

        } else {
            this.$router.push({ path: '/login' })
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.videolist != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.audiolist != null) {
                this.$refs.scroll2.refresh();
            }
        });
        window.onresize = () => {
            if (this.videolist != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.audiolist != null) {
                this.$refs.scroll2.refresh();
            }
        }
    }
}