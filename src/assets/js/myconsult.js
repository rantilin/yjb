import Vue from "vue";
import common from "./common";
import myconsultapi from "@/api/MyconsultApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'myconsult',
    components: {},
    data() {
        return {
            comname: '我的咨询',
            currentTab: 0,
            questionsprice: this.$store.state.answerprice,
            key: this.$store.state.key.value,
            bartab: [{ name: "我的提问" }, { name: "我的旁听" }],
            nocontent: require("../image/nocontent.png"),
            myconsultq: [],
            myconsultp: [],
            loding: true,
            vantab: {
                list: [
                    "我的提问",
                    "我的旁听",
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
                if (this.myconsultq != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.myconsultp != null) {
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
                if (this.myconsultq != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.myconsultp != null) {
                    this.$refs.scroll2.refresh();
                }
            });
        },
        list1() {
            myconsultapi.consultlist(this.key).then(res => {
                if (common.dataisnull(res.data.datas.tw)) {
                    this.myconsultq = res.data.datas.tw;
                } else {
                    this.myconsultq = null;
                }
                if (common.dataisnull(res.data.datas.pt)) {
                    this.myconsultp = res.data.datas.pt;
                } else {
                    this.myconsultp = null;
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
        godoctor(id) {
            this.$router.push({
                path: '/doctor',
                query: { id: id }
            })
        },
        dellist(id, val) {
            if (val == 1) {
                var title = '提问删除'
                var content = '是否删除此提问？'
            } else {
                var title = '旁听删除'
                var content = '是否删除此旁听？'
            }
            this.$createDialog({
                type: 'confirm',
                title: title,
                content: content,
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
                    myconsultapi.dellist(this.key, id).then(res => {
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
        },
        touch(id, val) {
            clearInterval(this.Loop);
            this.Loop = setTimeout(function() {
                this.dellist(id, val);
            }.bind(this), 800);
        },
        cleartime() {
            clearInterval(this.Loop);
        },
        examine(ids) {
            this.$router.push({
                name: 'conversation',
                query: {
                    id: ids,
                }
            })
        },
        chat(id, val, state) {
            if (val == 3) {
                this.$router.push({
                    name: 'chat',
                    query: {
                        id: id,
                    }
                })
            } else {
                if (state == 20) {
                    this.toast('请耐心等待专家来电');
                }
                if (state == 30) {
                    this.toast('咨询已完成');
                }
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
            if (this.myconsultq != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.myconsultp != null) {
                this.$refs.scroll2.refresh();
            }
        });
        window.onresize = () => {
            if (this.myconsultq != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.myconsultp != null) {
                this.$refs.scroll2.refresh();
            }
        }
    }
}