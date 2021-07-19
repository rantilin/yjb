import Vue from "vue";
import common from "./common";
import meiyong from "./ap";
import payapi from "@/api/PayApi";
import WeCahtApi from "@/api/WeCahtApi";
import commonpay from "./commonpay";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead)
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import {
    Toast,
    Dialog
} from 'vant';
Vue.use(Toast).use(Dialog);
import {
    Image
} from 'vant';
import {
    Notify
} from "vant";
Vue.use(Image);
export default {
    name: 'pay',
    data() {
        return {
            comname: '支付',
            payway: '1', //1代表微信，2代表支付宝 3代表卡密支付
            goods_image: '',
            goods_name: '',
            goods_price: '',
            goods_click: '',
            goods_promotion_price: '',
            grouplist: '',
            orderusermsg: '',
            id: this.$route.query.id,
            state: this.$route.query.state,
            pay_sn: this.$route.query.pay_sn,
            key: this.$store.state.key.value,
            listenorlook: '',
            order_pay: '',
            classtext: '',
            text: '',
            price: '',
            loding: true,
            out_trade_no: '',
            partner: '',
            payment_type: '',
            seller_id: '',
            subject: '',
            total_fee: '',
            sign: '',
            payshow: true,
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
            markprice: 0,
            goods_amount: 0,
            discount: 1,
            reduction_amount: 0,
            isagree: false, //是否同意协议
            agreement: 0, //是否开启协议
            agreetext: '',//协议标题
            agreeimg:'',
        }
    },
    methods: {
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
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        list1() {
            payapi.videodetail(this.id).then(res => {
                this.goods_image = res.data.datas.brief.goods_image;
                this.goods_name = res.data.datas.brief.goods_name;
                this.goods_price = res.data.datas.brief.goods_price;
                this.goods_click = common.number(res.data.datas.brief.goods_click)
                this.agreement = res.data.datas.brief.goods_state_agreement
                this.agreeimg = res.data.datas.brief.agreement_images
                this.agreetext = res.data.datas.brief.agreement_name
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
            payapi.audiodetail(this.id).then(res => {
                this.goods_image = res.data.datas.brief.goods_image;
                this.goods_name = res.data.datas.brief.goods_name;
                this.goods_price = res.data.datas.brief.goods_price;
                this.goods_click = common.number(res.data.datas.brief.goods_click);
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
            payapi.orderdetail(this.key, this.pay_sn).then(res => {
                this.price = res.data.datas[0].order_amount;
                this.markprice = res.data.datas[0].service_amount;
                this.goods_amount = res.data.datas[0].goods_amount;
                this.reduction_amount = res.data.datas[0].reduction_amount;
                if(res.data.datas[0].discount){
                    this.discount =  res.data.datas[0].discount/100;
                }
                
                if (this.state == 6) {
                    this.orderusermsg = res.data.datas[0];
                }
                this.activatecode.chapter = res.data.datas[0].room_audio_id;
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
        list4() {
            payapi.groupdetail(this.id).then(res => {
                this.grouplist = res.data.datas
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
        tijiaobiaodan() {
            var queryParam = '';
            Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach(function (ele) {
                queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
            });
            var gotoUrl = document.querySelector("#pay_form").getAttribute('action') + '?' + queryParam;
            _AP.pay(gotoUrl);
        },
        gobuy() {
            switch (this.agreement){
                case "0":
                    this.pay()
                    break;
                case "1":
                    if(this.isagree){
                        this.pay();
                    }else{
                        this.toast('请先勾选同意协议');
                    }
                    break;
                default:
                    this.pay();
                    break;
            }

        },
        pay(){
            switch (this.payway) {
                case '1':
                    // 在微信里面
                    if (this.order_pay == 'H5') {
                        commonpay.wxpay(this.key, this.pay_sn, this.classtext, this.price, this.id, 'new_order');
                    } else {
                        commonpay.wapwxpay(this.key, this.pay_sn, this.classtext, this.price, this.id, 'new_order');
                    }
                    break;
                case '2':
                    if (this.order_pay == 'H5') {
                        WeCahtApi.zfb(this.key, this.pay_sn, this.classtext, this.price, this.id, 'new_order').then(res => {
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
                        commonpay.zfb(this.key, this.pay_sn, this.classtext, this.price, this.id, 'new_order');
                    }
                    break;
                case '3':

                    break;
                default:
                    console.log(123);
            }
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
                                    payapi.eaitordersn(this.key, this.pay_sn, 2, this.activatecode.id, this.activatecode.kalman_code).then(res => {
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
        },
        changeisagree(){
            if(this.isagree){
                this.isagree = false
            }else{
                this.isagree = true
            }
        },
        gogree(){
            this.$router.push({
                path: '/agree',
                query: {
                    imgsrc: encodeURIComponent(this.agreeimg)
                }
            })
        }
    },
    created() {
        if (this.key) {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                this.order_pay = 'H5'
            } else {
                this.order_pay = 'wap'
            }
            if (this.state == 1) {
                this.list1();
                this.classtext = '视频课程'
                this.text = '合计';
                this.listenorlook = '看';
                this.activatecode.kalman_id = 1;
            }

            if (this.state == 2) {
                this.list2();
                this.classtext = '音频课程';
                this.text = '合计';
                this.listenorlook = '听'
                this.activatecode.kalman_id = 1;
            }
            if (this.state == 6) {
                this.list4();
                this.classtext = '入群订单';
                this.activatecode.kalman_id = 3;
            }
            this.list3();
        } else {
            this.$router.push({
                path: '/login'
            })
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