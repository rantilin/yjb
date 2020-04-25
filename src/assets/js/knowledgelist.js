import Vue from "vue";
import common from "./common";
import knowledgelistapi from "@/api/KnowledgelistApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'knowledgelist',
    data() {
        return {
            comname: '',
            nocontent: require("../image/nocontent.png"),
            wledgelist: [],
            id: '',
            curpage: 1,
            options: {
                pullUpLoad: false
            },
            setTotal: '',
            loding: true,
        }
    },
    methods: {
        list1() {
            knowledgelistapi.wledgelist(this.id, this.curpage).then(res => {
                if (common.dataisnull(res.data.datas.list)) {
                    var list = res.data.datas.list;
                    this.setTotal = res.data.datas.list[0].setTotal;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.wledgelist = list;
                    this.options.pullUpLoad = {
                        threshold: -50,
                        txt: {
                            more: '上拉加载更多文章',
                            noMore: '没有更多文章'
                        }
                    }
                } else {
                    this.wledgelist = null;
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
                knowledgelistapi.wledgelist(this.id, this.curpage).then(res => {
                    var list = res.data.datas.list;
                    for (let i in list) {
                        list[i].goods_click = common.number(list[i].goods_click);
                    }
                    this.wledgelist = this.wledgelist.concat(list);
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
        listbtn() {
            this.$router.push({
                name: 'knowledgedetails',
                query: {
                    id: event.currentTarget.dataset.id,
                }
            })
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.comname = this.$route.query.name;
        this.list1();
    },
    mounted() {

    }

}