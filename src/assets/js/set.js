import Vue from "vue";
import setapi from "@/api/SetApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import { VueCropper } from "vue-cropper";
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'set',
    components: {
        vueCropper: VueCropper
    },
    data() {
        return {
            comname: '设置',
            key: this.$store.state.key.value,
            picshow: false,
            headImg: "",
            toastup: '',
            crap: false,
            previews: {},
            option: {
                img: "",
                outputSize: 1, //剪切后的图片质量（0.1-1）
                full: false, //输出原图比例截图 props名full
                outputType: "png",
                canMove: true,
                original: false,
                canMoveBox: false,
                autoCrop: true,
                fixedBox: true
            },
            fileName: "", //本机文件地址
            downImg: "#",
            uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
            avator: '',
            nicknames: '',
            autograph: '',
            member_sex: '',
            member_mobile: '',
        }
    },
    methods: {
        //上传图片（点击上传按钮）
        finish() {
            // console.log(this.option.img);
            this.toastup = this.$createToast({
                time: 0,
                txt: '正在上传中'
            })
            this.$refs.cropper.getCropData((data) => {
                this.model = true
                this.modelSrc = data
                this.list2();
            })
            this.toastup.show()
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data;
        },
        //选择本地图片
        uploadImg(e) {
            var file = e.target.files[0];
            this.fileName = file.name;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                this.toast("类型必须是图片");
                return false;
            }
            var reader = new FileReader();
            reader.onload = e => {
                this.option.img = e.target.result;
                // console.log(this.option.img)
                this.picshow = true;
                document.getElementById("targetImg").setAttribute('type', 'text')
            };
            reader.readAsDataURL(file);
        },
        cancel() {
            this.picshow = false;
            document.getElementById("targetImg").setAttribute('type', 'file')

        },
        dialog(val, valueref, sx) {
            this.$createDialog({
                type: 'prompt',
                title: val,
                prompt: {
                    value: valueref,
                    placeholder: '请输入'
                },
                onConfirm: (e, promptValue) => {
                    if (promptValue == '') {
                        this.toast('修改信息不能为空');
                        return false;
                    }
                    this.toast('正在修改中...');
                    switch (sx) {
                        case 1:
                            setapi.nicknames(this.key, promptValue).then(res => {
                                this.nicknames = promptValue;
                                this.toast('修改成功');
                            }).catch(err => {
                                if (err.message != "interrupt") {
                                    let errmsg = '请求失败';
                                    if (err.message.includes('timeout')) {
                                        errmsg = "请检查网络再刷新重试"
                                    }
                                    this.toast(errmsg);
                                }
                            });
                            break;
                        case 2:
                            setapi.autograph(this.key, promptValue).then(res => {
                                this.autograph = promptValue;
                                this.toast('修改成功');
                            }).catch(err => {
                                if (err.message != "interrupt") {
                                    let errmsg = '请求失败';
                                    if (err.message.includes('timeout')) {
                                        errmsg = "请检查网络再刷新重试"
                                    }
                                    this.toast(errmsg);
                                }
                            });
                            break;
                        case 3:
                            setapi.member_mobile(this.key, promptValue).then(res => {
                                this.member_mobile = promptValue;
                                this.toast('修改成功');
                            }).catch(err => {
                                if (err.message != "interrupt") {
                                    let errmsg = '请求失败';
                                    if (err.message.includes('timeout')) {
                                        errmsg = "请检查网络再刷新重试"
                                    }
                                    this.toast(errmsg);
                                }
                            });
                            break;
                    }


                }
            }).show()
        },
        alternc() {
            let valtext = '修改昵称'
            let valueref = this.$refs.nc.innerText
            this.dialog(valtext, valueref, 1);
        },
        altergq() {
            let valtext = '修改签名'
            let valueref = this.$refs.qm.innerText
            this.dialog(valtext, valueref, 2);
        },
        alterxb() {
            this.$createDialog({
                type: 'confirm',
                title: '修改性别',
                confirmBtn: {
                    text: '女',
                    active: true,
                },
                cancelBtn: {
                    text: '男',
                    active: true,
                },
                onConfirm: () => {
                    this.toast('正在修改中...');
                    setapi.member_sex(this.key, 2).then(res => {
                        this.member_sex = '女'
                        this.toast('修改成功');
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
                onCancel: () => {
                    this.toast('正在修改中...');
                    setapi.member_sex(this.key, 1).then(res => {
                        this.member_sex = '男'
                        this.toast('修改成功');
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
            }).show()
        },
        altersj() {
            // let valtext = '修改手机号'
            // let valueref = this.$refs.sj.innerText
            // this.dialog(valtext, valueref, 3);
            this.$router.push({ path: '/binding', query: { id: 1 } })
        },
        list1() {
            setapi.users(this.key).then(res => {
                this.avator = res.data.datas.member_info.avator;
                this.nicknames = res.data.datas.member_info.nicknames;
                this.autograph = res.data.datas.member_info.autograph;
                if (res.data.datas.member_info.member_sex == 1) {
                    this.member_sex = '男'
                } else {
                    this.member_sex = '女'
                }
                this.member_mobile = res.data.datas.member_info.member_mobile;
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
            setapi.userpic(this.key, this.modelSrc).then(res => {
                this.picshow = false;
                this.toastup.hide();
                this.toast('上传成功');
                this.avator = this.modelSrc;
                document.getElementById("targetImg").setAttribute('type', 'file')
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
        exit() {
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-sad',
                title: '您真的要退出吗？',
                confirmBtn: {
                    text: '确定',
                    active: false,
                },
                cancelBtn: {
                    text: '取消',
                    active: true,
                },
                onConfirm: () => {
                    const toast = this.$createToast({
                        txt: '注销成功',
                        type: 'correct',
                        time: 1000,
                        $events: {
                            timeout: () => {
                                this.$store.dispatch('deltoken', '')
                                localStorage.removeItem('key')
                                this.$router.push({ path: '/' })
                            }
                        }
                    })
                    toast.show()
                }
            }).show()
        }
    },
    created() {
        if (this.key) {
            this.list1();
        } else {
            this.$router.push({ path: '/' })
        }
    }
}