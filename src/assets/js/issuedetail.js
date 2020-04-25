import Vue from "vue";
import common from "./common";
import meiyong from "./ap";
import WeCahtApi from "@/api/WeCahtApi";
import commonpay from "./commonpay";
import issuedetailapi from "@/api/IssuedetailApi";
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
    name: 'issuedetail',
    data() {
        return {
            comname: '问题详情',
            chakan: '', //1代表该用户未查看订单，2代表查看了订单
            payway: 1, //1代表微信，2代表支付宝
            key: this.$store.state.key.value,
            id: this.$route.query.id,
            questionsprice: this.$store.state.answerprice,
            expert_image: "",
            expert_name: "",
            expert_title: "",
            expert_hospital: "",
            description: '',
            dialogue: '',
            expert_id: '',
            relevantlist: [],
            loding: true,
            show: false,
            disabled: false,
            buytext: '立即购买',
            order_pay: '',
            num: 0,
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
        examine() {
            this.$router.push({
                path: '/issuedetail'
            })
        },
        seemore() {
            this.$router.push({
                name: 'conversation',
                query: {
                    id: this.id,
                }
            })
        },
        godoctor() {
            this.$router.push({
                name: 'doctor',
                query: {
                    id: this.expert_id,
                }
            })
        },
        othergodoctor(ids) {
            this.$router.push({
                name: 'doctor',
                query: {
                    id: ids,
                }
            })
        },
        examine(ids) {
            this.$router.push({
                name: 'issuedetail',
                query: {
                    id: ids,
                }
            })
        },
        seeorder() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (this.payway == cur) {
                return false;
            } else {
                this.payway = cur;
            }
        },
        tijiaobiaodan() {
            var queryParam = '';
            Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach(function(ele) {
                queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
            });
            var gotoUrl = document.querySelector("#pay_form").getAttribute('action') + '?' + queryParam;
            _AP.pay(gotoUrl);
        },
        buywaybtn() {
            this.disabled = true;
            this.buytext = '正在生成订单...';
            issuedetailapi.order(this.key, this.id, this.questionsprice, this.order_pay).then(res => {
                //payway为1就是微信支付
                if (this.payway == 1) {
                    // 在微信里面
                    if (this.order_pay == 'H5') {
                        commonpay.wxpay(this.key, res.data.datas.pay_sn, '精品问答', this.questionsprice, '', 'new_order');
                    } else {
                        commonpay.wapwxpay(this.key, res.data.datas.pay_sn, '精品问答', this.questionsprice, '', 'new_order');
                    }
                } else {
                    if (this.order_pay == 'H5') {
                        WeCahtApi.zfb(this.key, res.data.datas.pay_sn, '精品问答', this.questionsprice, '', 'new_order').then(res => {
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
                        commonpay.zfb(this.key, res.data.datas.pay_sn, '精品问答', this.questionsprice, '', 'new_order');
                    }
                }
                this.buytext = '请耐心等待';
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
                this.buytext = '请耐心等待';
            });
        },
        list1() {
            issuedetailapi.buydetail(this.key, this.id).then(res => {
                this.num = res.data.datas.num
                this.expert_id = res.data.datas.qusert.expert_id
                this.expert_image = res.data.datas.qusert.expert_image
                this.expert_name = res.data.datas.qusert.expert_name
                this.expert_title = res.data.datas.qusert.expert_title
                this.expert_hospital = res.data.datas.qusert.expert_hospital
                this.description = res.data.datas.qusert.description
                this.dialogue = res.data.datas.qusert.duihua.dialogue
                if (common.dataisnull(res.data.datas.relevant)) {
                    this.relevantlist = res.data.datas.relevant
                } else {
                    this.relevantlist = null
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
        list2() {
            issuedetailapi.problem_buy(this.key, this.id).then(res => {
                if (res.data.datas.tw_order == 1 || res.data.datas.wd_order == 1) {
                    this.chakan = 2
                } else {
                    this.chakan = 1
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
    },
    created() {
        if (this.key) {
            this.list1();
            this.list2();
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                this.order_pay = 'H5'
            } else {
                this.order_pay = 'wap'
            }
        } else {
            this.$router.push({ path: '/login' })
        }
    },
    watch: {
        '$route' (to, from) { // 监听路由是否变化
            if (to.query.id !== from.query.id) {
                this.id = to.query.id
                this.loding = true;
                this.list1();
                this.list2();
                if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                    this.order_pay = 'H5'
                } else {
                    this.order_pay = 'wap'
                }
            }
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