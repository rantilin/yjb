import Vue from "vue";
import loginapi from "@/api/LoginApi";
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
            comname: '',
            value: '',
            placeholder: '请输入手机号码',
            type: 'number',
            maxlength: 11,
            autofocus: true,
            autocomplete: true,
            clearable: {
                visible: true,
                blurHidden: true
            },
            yzmvalue: '',
            yzmplaceholder: '请输入短信验证码',
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
        xieyi() {
            if (this.xieyistyle) {
                this.xieyistyle = false;
            } else {
                this.xieyistyle = true;
            }
        },
        chakanxieyi() {
            this.xieyihide = true;
        },
        parentClose() {
            this.xieyihide = false;
        },
        huoquyzm() {
            if (this.xieyistyle) {
                if (this.value != '') {
                    if (common.validateTel(this.value)) {
                        const _this = this;
                        _this.yzmdis = true,
                            times = setInterval(function() {
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
            } else {
                this.toast = this.$createToast({
                    txt: '请勾选医教宝用户隐私政策！',
                    type: 'warn'
                })
                this.toast.show()
            }
        },
        loginsub() {
            if (this.xieyistyle) {
                if (this.value != '') {
                    if (common.validateTel(this.value)) {
                        if (this.yzmvalue != '') {
                            if (this.yzmvalue == yzms) {
                                this.logindis = true
                                if (flag) {
                                    //去登陆  获取保存key
                                    loginapi.onreg(this.value).then(reson => {
                                            if (reson.data.datas.error == null) {
                                                var dataes = { value: reson.data.datas.key, expirse: new Date().getTime() + 7 * 24 * 3600 * 10000 };
                                                window.localStorage.setItem('key', JSON.stringify(dataes));
                                                //判断是否由参数
                                                const toast = this.$createToast({
                                                    txt: '登录成功',
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
                                } else {
                                    loginapi.offreg(this.value).then(resoff => {
                                        if (resoff.data.datas.error == null) {
                                            var dataes = { value: resoff.data.datas.key, expirse: new Date().getTime() + 7 * 24 * 3600 * 1000 };
                                            window.localStorage.setItem('key', JSON.stringify(dataes));
                                            //判断是否由参数
                                            const toast = this.$createToast({
                                                txt: '登录成功',
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
                                                txt: resoff.data.datas.error,
                                                type: 'txt'
                                            })
                                            this.toast.show()
                                        }
                                    })
                                }
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
            } else {
                this.toast = this.$createToast({
                    txt: '请勾选医教宝用户隐私政策！',
                    type: 'warn'
                })
                this.toast.show()
            }
        },
        //手机号获取验证码 为0表示该手机没注册》注册 为1表示该手机已注册》去登录
        phoneyzm(value) {
            loginapi.phoneyzm(value).then(res => {
                if (res.data.datas == 0) {
                    flag = false;
                    loginapi.yzmreg(value).then(resl => {
                        yzms = resl.data.datas.yzm;
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
                    loginapi.yzmlogin(value).then(resr => {
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
    created() {
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            this.$router.push({
                path: "/shouquan"
            });
        }
    },
    mounted() {},
    beforeDestroy() {
        clearInterval(times);
    },
};