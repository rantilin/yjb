import Vue from "vue";
import common from "./common";
import babytoapi from "@/api/BabytoApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'babyto',
    data() {
        return {
            comname: '宝宝听听',
            active: '',
            nocontent: require("../image/nocontent.png"),
            id: this.$route.query.id,
            yplist: [],
            list: [],
            curpage: 1,
            options: {
                pullUpLoad: false
            },
            setTotal: '',
            gc_id: '',
            loding: true,
            vantab: {
                list: [],
                color: "#21C891",
                background: "#ffffff",
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
        back() {
            this.$router.go(-1);
            localStorage.removeItem('lanmuval');
        },
        pitchtab(index) {
            window.localStorage.setItem('lanmuval', this.active);
            this.gc_id = this.list[this.active].id;
            this.curpage = 1;
            const toast = this.$createToast({
                time: 1000,
                txt: '正在加载'
            })
            toast.show()
            this.list4();
        },
        list3() {
            babytoapi.column(this.id).then(res => {
                this.list = res.data.datas;
                this.list.map((item, i) => {
                    this.vantab.list.push(this.list[i].lmname)
                });
                if (parseInt(localStorage.getItem('lanmuval')) >= 0) {
                    this.active = parseInt(localStorage.getItem('lanmuval'));
                    this.gc_id = res.data.datas[this.active].id
                } else {
                    this.active = 0;
                    this.gc_id = res.data.datas[this.active].id
                }
                this.list4();
            }).catch(err => {
                //用户手动切换页面时强行中断不抛出异常
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
            babytoapi.newsplist(this.id, this.gc_id, this.curpage).then(res => {
                if (common.dataisnull(res.data.datas.list)) {
                    var list = res.data.datas.list;
                    this.setTotal = res.data.datas.list[0].setTotal;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.yplist = list;
                    this.options.pullUpLoad = {
                        threshold: -50,
                        txt: {
                            more: '上拉加载更多视频',
                            noMore: '没有更多视频'
                        }
                    }
                    this.$nextTick(() => {
                        this.$refs.scroll.scrollTo(0, 0);
                    });
                } else {
                    this.yplist = null;
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
        onPullingUp() {
            if (this.curpage < this.setTotal) {
                this.curpage++;
                babytoapi.newsplist(this.id, this.gc_id, this.curpage).then(res => {
                    var list = res.data.datas.list;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.yplist = this.yplist.concat(list);
                    setTimeout(() => {
                        this.$refs.scroll.forceUpdate(true);
                        this.$refs.scroll.refresh();
                    }, 10);
                }).catch(err => {
                    //用户手动切换页面时强行中断不抛出异常
                    if (err.message != "interrupt") {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        this.toast(errmsg);
                    }
                });
            } else {
                this.$refs.scroll.forceUpdate();
                this.$refs.scroll.refresh();
            }
        },
        goaudio(id) {
            this.$router.push({
                name: 'audio',
                query: {
                    classid: id,
                }
            })
        }
    },
    created() {
        this.list3();
    },
    mounted() {
        if (this.yplist != null) {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
            window.onresize = () => {
                this.$refs.scroll.refresh();
            }
        }
    }
}