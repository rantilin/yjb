import Vue from "vue";
import common from "./common";
import videoclassapi from "@/api/VideoclassApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Tab, Tabs } from 'vant';
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'videoclass',
    data() {
        return {
            index: this.$route.query.index,
            comname: '',
            active: '',
            nocontent: require("../image/nocontent.png"),
            id: this.$route.query.id,
            num: this.$route.query.num,
            splist: [],
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
        pitchtab() {
            window.localStorage.setItem('lanmuvals', this.active);
            this.gc_id = this.list[this.active].id;
            this.curpage = 1;
            const toast = this.$createToast({
                time: 1000,
                txt: '正在加载'
            })
            toast.show()
            this.list4();
        },
        onPullingUp() {
            if (this.curpage < this.setTotal) {
                this.curpage++;
                videoclassapi.newsplist(this.id, this.gc_id, this.curpage).then(res => {
                    var list = res.data.datas.list;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.splist = this.splist.concat(list);
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
                this.$refs.scroll.forceUpdate();
                this.$refs.scroll.refresh();
            }
        },
        goclass(id) {
            this.$router.push({
                name: 'class',
                query: {
                    classid: id,
                }
            })
        },
        list3() {
            videoclassapi.column(this.id).then(res => {
                this.list = res.data.datas;
                this.list.map((item, i) => {
                    this.vantab.list.push(this.list[i].lmname)
                });
                if (parseInt(localStorage.getItem('lanmuvals')) >= 0) {
                    this.active = parseInt(localStorage.getItem('lanmuvals'));
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
            videoclassapi.newsplist(this.id, this.gc_id, this.curpage).then(res => {
                if (common.dataisnull(res.data.datas.list)) {
                    var list = res.data.datas.list;
                    this.setTotal = res.data.datas.list[0].setTotal;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.splist = list;
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
                    this.splist = null;
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
        numname() {
            switch (parseInt(this.num)) {
                case 1:
                    this.comname = "普通儿科"
                    break;
                case 2:
                    this.comname = "大咖专栏"
                    break;
                case 3:
                    this.comname = "成绩提升"
                    break;
                case 4:
                    this.comname = "宝宝看看"
                    break;
                case 5:
                    this.comname = "健康公开课"
                    break;
                case 6:
                    this.comname = "育儿公开课"
                    break;
            }
        }
    },
    created() {
        this.numname();
        this.list3();
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