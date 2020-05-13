import Vue from "vue";
import loginapi from "@/api/bindingApi";
import common from "./common";
import ComponentHead from '@/components/ComponentHead';
import ComponentXieyi from '@/components/ComponentXieyi';
Vue.use(ComponentHead);
Vue.use(ComponentXieyi);
Vue.component('component-head', ComponentHead)
Vue.component('component-xieyi', ComponentXieyi)
var yzms;
var time = 60;
var times;
var flag;
export default {
    name: 'login',
    components: {
        ComponentHead,
        ComponentXieyi,
    },
    data() {
        return {
            key: this.$store.state.key.value,
            comname: '',
            value: '',
            setid: this.$route.query.id,
            title: '',
            content: '',
            placeholder: '      请输入手机号码',
            type: 'number',
            msssg: '',
            maxlength: 11,
            autofocus: true,
            autocomplete: true,
            clearable: {
                visible: true,
                blurHidden: true
            },
            yzmvalue: '',
            yzmplaceholder: '      请输入短信验证码',
            yzmtype: 'number',
            yzmmaxlength: 4,
            yzmautofocus: false,
            yzmautocomplete: true,
            yzmclearable: {
                visible: true,
                blurHidden: true
            },
            xieyistyle: true,
            yzmdis: false,
            yzmtext: '获取验证码',
            logindis: false,
            xieyihide: false,
            loginscss: false,
        };
    },
    methods: {

        chakanxieyi() {
            this.xieyihide = true;
        },
        parentClose() {
            this.xieyihide = false;
        },
        titletext() {
            console.log(this.setid)
            if (this.setid == 1) {
                this.title = '修改手机号',
                    this.content = ''
            } else {
                this.title = '绑定您的手机号',
                    this.content = '根据《网络安全法》第三章第二十四条要求同时保障账号安全，请尽快完成手机号绑定验证，感谢理解！'
            }
        },
        huoquyzm() {
            if (this.value != '') {
                if (common.validateTel(this.value)) {
                    const _this = this;
                    _this.yzmdis = true,
                        times = setInterval(function () {
                            time--;
                            _this.yzmtext = "(" + time + ")s后可重新发送"
                            if (time <= 0) {
                                clearInterval(times);
                                _this.yzmdis = false
                                _this.yzmtext = "重新发送"
                                time = 60;
                            }
                        }, 1000);

                    this.phoneyzm(this.value);
                } else {
                    this.toast = this.$createToast({
                        txt: '手机号格式不正确',
                        type: 'warn'
                    })
                    this.toast.show()
                    this.autofocus = true;
                }
            } else {
                this.toast = this.$createToast({
                    txt: '手机号不能为空',
                    type: 'warn'
                })
                this.toast.show()
                this.autofocus = true;
            }
        },
        loginsub() {

            if (this.value != '') {

                if (common.validateTel(this.value)) {

                    if (this.yzmvalue != '') {

                        if (this.yzmvalue == yzms) {

                            this.logindis = true


                            //去登陆  获取保存key
                            loginapi.onreg(this.value, this.key).then(reson => {
                                if (reson.data.datas.error == null) {
                                    if (this.setid == 1) {
                                        this.msssg = '修改成功'
                                    } else {
                                        this.msssg = '绑定成功'
                                    }
                                    const toast = this.$createToast({
                                        txt: this.msssg,
                                        type: 'correct',
                                        time: 2000,
                                        $events: {
                                            timeout: () => {
                                                this.logindis = false;
                                                if (this.$route.query.redirect) {
                                                    this.$router.replace({
                                                        path: this.$route.query.redirect
                                                    })
                                                }
                                                if (this.$route.query.back) {
                                                    this.$router.go(-1);
                                                } else {
                                                    if (this.$route.query.redirect == undefined) {
                                                        this.$router.replace({
                                                            path: '/'
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    })
                                    toast.show()
                                } else {
                                    this.toast = this.$createToast({
                                        txt: reson.data.datas.error,
                                        type: 'txt'
                                    })
                                    this.toast.show()
                                }
                            })
                            //去注册  获取保存key

                            const toast = this.$createToast({
                                text: '该手机号已被绑定',
                                type: 'correct',
                                time: 2000
                            })
                            // toast.show()

                        } else {
                            this.toast = this.$createToast({
                                txt: '验证码有误',
                                type: 'warn'
                            })
                            this.toast.show()
                            this.yzmautofocus = true;
                        }
                    } else {
                        this.toast = this.$createToast({
                            txt: '验证码不能为空',
                            type: 'warn'
                        })
                        this.toast.show()
                        this.yzmautofocus = true;
                    }
                } else {
                    this.toast = this.$createToast({
                        txt: '手机号格式不正确',
                        type: 'warn'
                    })
                    this.toast.show()
                    this.autofocus = true;
                }
            } else {
                this.toast = this.$createToast({
                    txt: '手机号不能为空',
                    type: 'warn'
                })
                this.toast.show()
                this.autofocus = true;
            }

        },
        //手机号获取验证码 为0表示该手机没注册》注册 为1表示该手机已注册》去登录
        phoneyzm(value) {
            console.log(this.key)
            loginapi.phoneyzm(value).then(res => {
                if (res.data.datas == 0) {
                    flag = false;
                    loginapi.yzmreg(value).then(res => {
                        yzms = res.data.datas.yzm;
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
                if (res.data.datas == 1) {
                    flag = true;
                    loginapi.yzmreg(value).then(resr => {
                        yzms = resr.data.datas.yzm;
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
            }).catch(err => {
                console.log(err);
            });
        },
        phoneinput() {
            if (common.validateTel(this.value)) {
                this.loginscss = true;
            } else {
                this.loginscss = false;
            }
        },
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        }
    },

    mounted() {
        this.titletext();
    },
    beforeDestroy() {
        clearInterval(times);
    },
};