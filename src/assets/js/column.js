import Vue from "vue";
import common from "./common";
import columnapi from "@/api/ColumnApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, ActionSheet } from 'vant';
Vue.use(Image);
Vue.use(ActionSheet);
export default {
    name: 'column',
    data() {
        return {
            comname: this.$route.query.name,
            nocontent: require("../image/nocontent.png"),
            show: false,
            columnlist: [],
            key: this.$store.state.key.value,
            loding: true,
            tw: '',
            dh: '',
            twkq: '',
            dhkq: '',
            doctorid: '',
        }
    },
    methods: {
        askdoctor(tw, dh, twkq, dhkq, doctorid) {
            if (this.key) {
                this.tw = tw;
                this.dh = dh;
                this.twkq = twkq;
                this.dhkq = dhkq;
                this.show = true;
                this.doctorid = doctorid;
            } else {
                this.$router.push({
                    path: '/login',
                    query: { back: true }
                })
            }
        },
        close() {
            this.show = false;
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
        list1() {
            columnapi.caselist(this.$route.query.id).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.columnlist = res.data.datas
                } else {
                    this.columnlist = null
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
    },
    created() {
        this.list1();
    },
    mounted() {
        if (this.columnlist != null) {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
            window.onresize = () => {
                this.$refs.scroll.refresh();
            }
        }
    }

}