import Vue from "vue";
import meiyong from "./ap";
import WeCahtApi from "@/api/WeCahtApi";
import qusertpayapi from "@/api/QusertpayApi";
import commonpay from "./commonpay";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead)
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'qusertpay',
    data() {
        return {
            comname: '支付',
            payway: 1, //1代表微信，2代表支付宝
            qusertid: this.$route.query.qusertid,
            ordersn: this.$route.query.ordersn,
            key: this.$store.state.key.value,
            tw: require("../image/tuwenpay.png"),
            dh: require("../image/dianhuapay.png"),
            wd: require("../image/wenda.png"),
            order_pay: '',
            loding: true,
            classtext: '',
            class_order: "",
            description: "",
            order_amount: '',
            qusert_tel: '',
            texts: '',
            out_trade_no: '',
            partner: '',
            payment_type: '',
            seller_id: '',
            subject: '',
            total_fee: '',
            sign: '',
        }
    },
    methods: {
        switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (this.payway == cur) {
                return false;
            } else {
                this.payway = cur;
            }
        },
        list1() {
            qusertpayapi.zixun(this.qusertid).then(res => {
                this.description = res.data.datas.qusert.description;
                this.qusert_tel = res.data.datas.qusert.qusert_tel;
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

        list3() {
            qusertpayapi.orderdetail(this.key, this.ordersn).then(res => {
                this.order_amount = res.data.datas[0].order_amount;
                this.class_order = res.data.datas[0].class_order;
                if (this.class_order == 3) {
                    this.texts = '图文咨询'
                }
                if (this.class_order == 4) {
                    this.texts = '电话咨询'
                }
                if (this.class_order == 5) {
                    this.texts = '精品问答'
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
        tijiaobiaodan() {
            var queryParam = '';
            Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach(function(ele) {
                queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
            });
            var gotoUrl = document.querySelector("#pay_form").getAttribute('action') + '?' + queryParam;
            _AP.pay(gotoUrl);
        },
        gobuy() {
            if (this.payway == 1) {
                // 在微信里面
                if (this.order_pay == 'H5') {
                    commonpay.wxpay(this.key, this.ordersn, this.texts, this.order_amount, '', 'new_order');
                } else {
                    commonpay.wapwxpay(this.key, this.ordersn, this.texts, this.order_amount, '', 'new_order');
                }
            } else {
                if (this.order_pay == 'H5') {
                    WeCahtApi.zfb(this.key, this.ordersn, this.texts, this.order_amount, '', 'new_order').then(res => {
                        this.$refs.fromdatas.innerHTML = res.data
                        this.out_trade_no = document.getElementsByName('out_trade_no')[0].value;
                        this.partner = document.getElementsByName('partner')[0].value;
                        this.payment_type = document.getElementsByName('payment_type')[0].value;
                        this.seller_id = document.getElementsByName('seller_id')[0].value;
                        this.subject = document.getElementsByName('subject')[0].value;
                        this.total_fee = document.getElementsByName('total_fee')[0].value;
                        this.sign = document.getElementsByName('sign')[0].value;
                        this.tijiaobiaodan();
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
                    commonpay.zfb(this.key, this.ordersn, this.texts, this.order_amount, '', 'new_order');
                }
            }
        }
    },
    created() {
        if (this.key) {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                this.order_pay = 'H5'
            } else {
                this.order_pay = 'wap'
            }
            this.list1();
            this.list3();
        } else {
            this.$router.push({ path: '/login' })
        }

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