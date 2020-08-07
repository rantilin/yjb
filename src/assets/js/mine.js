import Vue from 'vue';
import mineapi from "@/api/MineApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    components: {},
    data() {
        return {
            key: this.$store.state.key.value,
            minelist: [
                { pic: require("../image/wallet.png"), name: "我的钱包" },
                { pic: require("../image/order.png"), name: "我的订单" },
                { pic: require("../image/class.png"), name: "我的课程" },
                { pic: require("../image/consult.png"), name: "我的咨询" },
                { pic: require("../image/collet.png"), name: "我的收藏" },
                { pic: require("../image/record.png"), name: "学习记录" },
            ],
            avator: '',
            nicknames: '',
            autograph: '',
            loding: true,
            stateapi: false,
            tel: '',
            order: '',
            toker: ''
        };
    },
    methods: {
        databtn(index) {
            if (this.key) {
                switch (index) {
                    case 0:
                        this.$router.push({
                            path: '/Mywallet'
                        })
                        break;
                    case 1:
                        this.$router.push({
                            path: '/myorder'
                        })
                        break;
                    case 2:
                        this.$router.push({
                            path: '/mycourse'
                        })
                        break;
                    case 3:
                        this.$router.push({
                            path: '/myconsult'
                        })
                        break;
                    case 4:
                        this.$router.push({
                            path: '/mycollect'
                        })
                        break;
                    case 5:
                        this.$router.push({
                            path: '/learningrecord'
                        })
                        break;
                }
            } else {
                this.$router.push({
                    path: '/login'
                })
            }
        },
        set() {
            if (this.key) {
                this.$router.push({
                    path: '/set'
                })
            } else {
                this.$router.push({
                    path: '/login'
                })
            }
        },
        gologin() {
            this.$router.push({
                path: '/login'
            })
        },
        list1() {
            mineapi.users(this.key).then(res => {
                this.avator = res.data.datas.member_info.avator;
                this.nicknames = res.data.datas.member_info.nicknames;
                this.autograph = res.data.datas.member_info.autograph;
                this.tel = res.data.datas.member_info.member_mobile;

                this.loding = false;
                this.stateapi = true;
                window.localStorage.setItem('phone', this.tel)
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
            mineapi.order(this.key).then(res => {

                this.order = res.data.datas
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
            mineapi.toker(this.key).then(res => {

                this.toker = res.data.datas
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

    },
    activated() {
        if (!this.stateapi) {
            this.loding = true;
            if (this.key) {
                this.list1();
                this.list2();
                this.list3()
            } else {
                this.avator = require("../image/offlogin.png");
                this.nicknames = '欢迎来到医教宝';
                this.autograph = '登录后获取更多精彩内容';
            }
        }
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        }

    }
};