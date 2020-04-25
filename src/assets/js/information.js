import Vue from "vue";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import informationapi from "@/api/InformationApi";
import DisCode from '@/components/DisCode';
export default {
    name: 'information',
    components: {
        DisCode,
    },
    data() {
        return {
            comname: '信息填写',
            valname: '',
            valage: '',
            valgrade: '',
            valwechat: '',
            key: this.$store.state.key.value,
            id: this.$route.query.id,
            price: this.$route.query.price,
            order_pay: '',
            disabled: false,
            codeDiscount:{},
        }
    },
    methods: {
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        discoucode(item1, item2) {
            this.price = item1;
            this.codeDiscount = item2;
        },
        submit() {
            if (this.valname != '') {
                if (this.valage != '') {
                    if (this.valgrade != '') {
                        if (this.valwechat != '') {
                            this.disabled = true;
                            const toast = this.$createToast({
                                time: 0,
                                txt: '订单正在提交'
                            })
                            toast.show()
                            informationapi.order(this.key, 1, 6, this.price, this.price, this.order_pay, this.id, this.valname, this.valage, this.valgrade, this.valwechat, this.codeDiscount).then(res => {
                                toast.hide();
                                this.disabled = false;
                                this.$router.push({
                                    name: 'pay',
                                    query: {
                                        id: this.id,
                                        state: 6,
                                        pay_sn: res.data.datas.pay_sn,
                                    }
                                })
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
                            this.toast("请输入微信号");
                        }
                    } else {
                        this.toast("请输入年级");
                    }
                } else {
                    this.toast("请输入孩子年龄");
                }
            } else {
                this.toast("请输入孩子姓名");
            }


        }
    },
    created() {
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            this.order_pay = 'H5'
        } else {
            this.order_pay = 'wap'
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