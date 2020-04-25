import Vue from 'vue';
import common from "./common";
import meiyong from "./ap";
import WeCahtApi from "@/api/WeCahtApi";
import commonpay from "./commonpay";
import consultapi from "@/api/ConsultApi";
import payapi from "@/api/PayApi";
import ComponentLoading from '@/components/ComponentLoading';
import DisCode from '@/components/DisCode';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import {
    Image,
    Uploader,
    ActionSheet,
    Notify,
    Toast
} from 'vant';
Vue.use(Image);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(Toast);
export default {
    name: 'consult',
    components: {
        DisCode,
    },
    data() {
        return {
            key: this.$store.state.key.value,
            state: '', //1代表匹配医师图文咨询，2代表匹配医师电话咨询，3代表指定医师图文咨询，4代表指定医师电话咨询，
            payway: 1, //1代表微信，2代表支付宝
            consultname: "",
            value: '',
            textareas: '',
            textnum: 0,
            filenum: 0,
            show: false,
            doctormatching: require("../image/dhzx.png"),
            fileList: [],
            imgbase: [],
            twprice: '',
            dhprice: '',
            buywayprice: '',
            order_pay: '',
            doctorid: '',
            expert_image: "",
            expert_name: "",
            expert_title: "",
            loding: true,
            expertid: '',
            disabled: false,
            buytext: '立即购买',
            out_trade_no: '',
            partner: '',
            payment_type: '',
            seller_id: '',
            subject: '',
            total_fee: '',
            sign: '',
            codeDiscount: {},
            payshow: true,
            kamishow: true,
            activatecode: { //卡密
                id: '',
                code_result: '2',
                kalman_code: '',
                codeshow: false,
                textcode: '',
                kalman_id: '',
                kalman_kzb_id: this.$route.query.id,
                chapter: '',
                duration_s: '',
                price: '',
            },
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        afterRead(file) {
            this.imgbase.push(file.content);
        },
        del(detail) {
            this.imgbase.splice(this.imgbase.indexOf(detail.content), 1)
        },
        submit() {
            if (this.state == '1' || this.state == '3') {
                if (this.textareas == '') {
                    this.toast('问题描述必填', 'warn');
                } else {
                    this.show = true;
                }
            } else {
                if (this.value == '') {
                    this.toast('手机号码必填', 'warn');
                } else {
                    if (common.validateTel(this.value)) {
                        this.show = true;
                    } else {
                        this.toast('请输入有效的手机号码', 'warn');
                    }
                }
            }
        },
        close() {
            this.show = false;
        },
        switchNav(event) {
            var cur = event.currentTarget.dataset.current;
            if (cur == 3) {
                this.activatecode.codeshow = true;
                this.payshow = false;
            } else {
                this.activatecode.codeshow = false;
                this.payshow = true;
            }
            if (this.payway == cur) {
                return false;
            } else {
                this.payway = cur;
            }
        },
        tijiaobiaodan() {
            var queryParam = '';
            Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach(function (ele) {
                queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
            });
            var gotoUrl = document.querySelector("#pay_form").getAttribute('action') + '?' + queryParam;
            _AP.pay(gotoUrl);
        },
        buywaybtn() {
            this.disabled = true;
            this.buytext = '正在生成订单...';
            if (this.state == '1' || this.state == '3') {
                consultapi.tworder(this.key, this.imgbase, this.textareas, this.buywayprice, this.order_pay, this.expertid, this.codeDiscount).then(res => {
                    //payway为1就是微信支付
                    if (this.payway == 1) {
                        // 在微信里面
                        if (this.order_pay == 'H5') {
                            commonpay.wxpay(this.key, res.data.datas.pay_sn, '图文咨询', this.buywayprice, '', 'new_order');
                        } else {
                            commonpay.wapwxpay(this.key, res.data.datas.pay_sn, '图文咨询', this.buywayprice, '', 'new_order');
                        }
                    } else {

                        if (this.order_pay == 'H5') {
                            WeCahtApi.zfb(this.key, res.data.datas.pay_sn, '图文咨询', this.buywayprice, '', 'new_order').then(res => {
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
                            commonpay.zfb(this.key, res.data.datas.pay_sn, '图文咨询', this.buywayprice, '', 'new_order');
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
            } else {
                consultapi.dhorder(this.key, this.imgbase, this.textareas, this.value, this.buywayprice, this.order_pay, this.expertid, this.codeDiscount).then(res => {
                    //payway为1就是微信支付
                    if (this.payway == 1) {
                        // 在微信里面
                        if (this.order_pay == 'H5') {
                            commonpay.wxpay(this.key, res.data.datas.pay_sn, '电话咨询', this.buywayprice, '', 'new_order');
                        } else {
                            commonpay.wapwxpay(this.key, res.data.datas.pay_sn, '电话咨询', this.buywayprice, '', 'new_order');
                        }
                    } else {
                        if (this.order_pay == 'H5') {
                            WeCahtApi.zfb(this.key, res.data.datas.pay_sn, '电话咨询', this.buywayprice, '', 'new_order').then(res => {
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
                            commonpay.zfb(this.key, res.data.datas.pay_sn, '电话咨询', this.buywayprice, '', 'new_order');
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
            }
        },
        list2() {
            consultapi.allprice().then(res => {
                this.buywayprice = res.data.datas[0].tw_amount;
            })
        },
        list28() {
            consultapi.allprice().then(res => {
                this.buywayprice = res.data.datas[0].dh_amount
            })
        },
        list1() {
            consultapi.doctordetail(this.doctorid).then(res => {
                if (this.state == 3) {
                    this.buywayprice = res.data.datas.details.tw_price
                }
                if (this.state == 4) {
                    this.buywayprice = res.data.datas.details.dh_price
                }
                this.expert_image = res.data.datas.details.expert_image
                this.expert_name = res.data.datas.details.expert_name
                this.expert_title = res.data.datas.details.expert_title
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
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        discoucode(item1, item2) {
            this.buywayprice = item1;
            this.codeDiscount = item2;
        },
        activate() {
            if (this.activatecode.textcode.length > 0) {
                Toast("卡密验证中...");
                payapi.activate(this.key, this.activatecode.kalman_id, this.activatecode.kalman_kzb_id, this.activatecode.textcode, this.activatecode.chapter).then(res => {
                    if (res.data.datas.error != null) {
                        Toast.fail(res.data.datas.error);
                    } else {
                        if (res.data.datas != 0) {
                            if (res.data.datas.msg != null) {
                                Toast.fail(res.data.datas.msg);
                            } else {
                                if (res.data.datas.status == 0) {
                                    Toast.fail('卡密已被禁用');

                                } else {
                                    this.activatecode.id = res.data.datas.id;
                                    this.activatecode.kalman_code = res.data.datas.kalman_code;

                                    Toast("卡密激活中...");
                                    consultapi.tworder(this.key, this.imgbase, this.textareas, this.buywayprice, this.order_pay, this.expertid, this.codeDiscount).then(res => {

                                        payapi.eaitordersn(this.key, res.data.datas.pay_sn, 2, this.activatecode.id, this.activatecode.kalman_code).then(res => {
                                            if (res.data.datas == 1) {
                                                Toast.success('卡密激活成功');
                                                this.$router.push({
                                                    path: '/myorder',
                                                    query: {
                                                        back: true
                                                    }
                                                })
                                            } else {
                                                Toast.fail('网络错误！请重新验证');
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

                                }
                            }
                        } else {
                            Toast.fail('卡密错误,请重新输入');
                            this.activatecode.textcode = '';
                        }

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
            } else {
                Toast.fail('请输入卡密激活码');
            }
        }
    },
    created() {
        this.state = this.$route.query.id;
        this.doctorid = this.$route.query.doctorid;
        switch (parseInt(this.state)) {
            case 1:

                this.consultname = "图文咨询";
                this.expertid = 0
                this.loding = false;
                this.kamishow = false;
                this.list2();
                break;
            case 2:

                this.consultname = "电话咨询";
                this.expertid = 0
                this.loding = false;
                this.kamishow = false;
                this.list28();
                break;
            case 3:
                this.consultname = "图文咨询";
                this.expertid = this.doctorid
                this.list1();
                break;
            case 4:
                this.consultname = "电话咨询";
                this.expertid = this.doctorid
                this.list1();
                break;
        }
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            this.order_pay = 'H5'
        } else {
            this.order_pay = 'wap'
        }
    },
    mounted() {},
    watch: {
        textareas() {
            this.textnum = this.textareas.length;
        },
        fileList() {
            this.filenum = this.fileList.length;
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
};