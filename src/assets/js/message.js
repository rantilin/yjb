import Vue from 'vue';
import common from "./common";
import messageapi from "@/api/MessageApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
import { setInterval } from 'core-js';
Vue.use(Image);
export default {
    name: 'message',
    components: {},
    data() {
        return {
            nocontent: require("../image/nomsg.png"),
            key: this.$store.state.key.value,
            chatlists: [],
            chatlist: [],
            loding: true,
            stateapi: false,
            xiaoshi: '',
            fenzhong: '',
            chatlistlength: '',
            imageurl: require('../image/xt.png'),

        };
    },
    methods: {
        list1() {
            messageapi.chatlist(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.chatlists = res.data.datas;
                } else {
                    this.chatlists = null
                }
                this.loding = false;
                this.stateapi = true;
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
            messageapi.chatxitong(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.chatlist = res.data.datas;

                } else {
                    this.chatlist = null
                }
                this.loding = false;
                this.stateapi = true;
                this.chatlistlength = res.data.datas

            }).catch(err => {

            });
        },
        chat(id) {
            this.$router.push({
                name: 'chat',
                query: {
                    id: id,
                }
            })
        },


    },
    created() {

    },
    activated() {
        if (!this.stateapi) {
            this.loding = true;
            if (this.key) {
                this.list2()
                this.list1();

            }
        }
        if (this.chatlists != null) {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        }
        setInterval(() => {
            this.$router.go(0)
        }, 300000)
    },
    mounted() {
        if (this.chatlists != null) {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
            window.onresize = () => {
                this.$refs.scroll.refresh();
            }
        }
        let time = new Date()
        this.xiaoshi = time.getHours();
        this.fenzhong = time.getMinutes()
    }
}