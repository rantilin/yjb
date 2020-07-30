import Vue from "vue";
import common from "./common";
import myorderapi from "@/api/MyorderApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
import { CountDown } from 'vant';
Vue.use(CountDown);
export default {
    name: 'myorder',
    components: {},
    data() {
        return {
            comname: '我的订单',
            currentTab: 0,
            key: this.$store.state.key.value,
            bartab: [{ name: "全部" }, { name: "待付款" }, { name: "已完成" }, { name: "待评价" }],
            nocontent: require("../image/noorder.png"),
            orderlist: [],
            weizhifu: [],
            yizhifu: [],
            daipingjia: [],
            doctormatching: require("../image/doctormatching.png"),
            loding: true,
            opc: true,
            vantab: {
                list: [
                    "全部",
                    "待付款",
                    "已完成",
                    "待评价",
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
                if (this.orderlist != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.weizhifu != '') {
                    this.$refs.scroll2.refresh();
                }
                if (this.yizhifu != '') {
                    this.$refs.scroll3.refresh();
                }
                if (this.daipingjia != '') {
                    this.$refs.scroll4.refresh();
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
                if (this.orderlist != null) {
                    this.$refs.scroll1.refresh();
                }
                if (this.weizhifu != '') {
                    this.$refs.scroll2.refresh();
                }
                if (this.yizhifu != '') {
                    this.$refs.scroll3.refresh();
                }
                if (this.daipingjia != '') {
                    this.$refs.scroll4.refresh();
                }
            });
        },
        list1() {
            myorderapi.orderlist(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.orderlist = res.data.datas;
                    for (let i in this.orderlist) {
                        if (this.orderlist[i].order_state == 10) {
                            this.weizhifu.push(this.orderlist[i]);
                        } else {
                            this.yizhifu.push(this.orderlist[i]);
                            if (this.orderlist[i].class_order == 3 || this.orderlist[i].class_order == 4) {
                                this.daipingjia.push(this.orderlist[i]);
                            }
                        }
                    }
                } else {
                    this.orderlist = null
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
                    title: '订单删除',
                    content: '是否删除此订单？',
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
                        myorderapi.dellist(this.key, id).then(res => {
                            toast.hide()
                            this.toast('删除成功');
                            this.weizhifu = [];
                            this.yizhifu = [];
                            this.daipingjia = [];
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
        gopage(class_order, order_state, goods_id, qusert_id, order_sn) {
            if (this.opc) {
                //视频
                if (class_order == 1) {
                    this.$router.push({
                        name: 'class',
                        query: {
                            classid: goods_id,
                            state: 1
                        }
                    })
                }
                //音频
                if (class_order == 2) {
                    this.$router.push({
                        name: 'class',
                        query: {
                            classid: goods_id,
                            state: 2
                        }
                    })
                }
                //训练班
                if (class_order == 6) {
                    this.$router.push({
                        name: 'paygroup',
                        query: {
                            id: goods_id,
                        }
                    })
                }
                //图文
                if (class_order == 3) {
                    if (order_state == 10) {
                        this.toast('点击支付才能查看');
                    } else {
                        this.$router.push({
                            name: 'chat',
                            query: {
                                id: qusert_id,
                            }
                        })
                    }
                }
                //电话
                if (class_order == 4) {
                    if (order_state == 10) {
                        this.toast('点击支付电话咨询');
                    }
                    if (order_state == 20) {
                        this.toast('请耐心等待专家来电');
                    }
                    if (order_state == 30) {
                        this.toast('咨询已完成');
                    }
                }
                //精品
                if (class_order == 5) {
                    if (order_state == 10) {
                        this.toast('点击支付才能查看');
                    } else {
                        this.$router.push({
                            name: 'conversation',
                            query: {
                                id: qusert_id,
                            }
                        })
                    }
                }
            }
        },
        gopay(class_order, order_state, goods_id, qusert_id, order_sn) {
            if (this.opc) {
                //视频
                if (class_order == 1) {
                    if (order_state == 10) {
                        this.$router.push({
                            name: 'pay',
                            query: {
                                id: goods_id,
                                state: 1,
                                pay_sn: order_sn,
                            }
                        })
                    }
                }
                //音频
                if (class_order == 2) {
                    if (order_state == 10) {
                        this.$router.push({
                            name: 'pay',
                            query: {
                                id: goods_id,
                                state: 2,
                                pay_sn: order_sn,
                            }
                        })
                    }
                }
                //训练班
                if (class_order == 6) {
                    if (order_state == 10) {
                        this.$router.push({
                            name: 'pay',
                            query: {
                                id: goods_id,
                                state: 6,
                                pay_sn: order_sn,
                            }
                        })
                    }
                }
                //图文
                if (class_order == 3) {
                    this.$router.push({
                        name: 'qusertpay',
                        query: {
                            qusertid: qusert_id,
                            ordersn: order_sn
                        }
                    })
                }
                //电话
                if (class_order == 4) {
                    this.$router.push({
                        name: 'qusertpay',
                        query: {
                            qusertid: qusert_id,
                            ordersn: order_sn
                        }
                    })
                }
                //精品
                if (class_order == 5) {
                    this.$router.push({
                        name: 'qusertpay',
                        query: {
                            qusertid: qusert_id,
                            ordersn: order_sn
                        }
                    })
                }
            }
        },
        gomsg(expert_id, order_sn, status_column) {
            if (status_column == 0) {
                this.$router.push({
                    name: 'comment',
                    query: {
                        doctorid: expert_id,
                        ordersn: order_sn
                    }
                })
            } else {
                this.$router.push({
                    name: 'doctor',
                    query: {
                        id: expert_id,
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
            if (this.orderlist != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.weizhifu != '') {
                this.$refs.scroll2.refresh();
            }
            if (this.yizhifu != '') {
                this.$refs.scroll3.refresh();
            }
            if (this.daipingjia != '') {
                this.$refs.scroll4.refresh();
            }
        });
        window.onresize = () => {
            if (this.orderlist != null) {
                this.$refs.scroll1.refresh();
            }
            if (this.weizhifu != '') {
                this.$refs.scroll2.refresh();
            }
            if (this.yizhifu != '') {
                this.$refs.scroll3.refresh();
            }
            if (this.daipingjia != '') {
                this.$refs.scroll4.refresh();
            }
        }
    },
    filters: {
        dataFormat(item1, item2) {
            return (item1 + parseInt(item2))*1000 - new Date().getTime();
        }
    }
}