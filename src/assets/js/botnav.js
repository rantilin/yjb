import common from "./common";
import botnavapi from "@/api/BotnavApi";
export default {
    name: 'botnav',
    data() {
        return {
            transitionName: "slide-left",
            currentTab: 0,
            tabindex: 1,
            msgnum: 0,
            key: this.$store.state.key.value,
            stateapi: false,
            chatlistlength: '',
            num: ''
        };
    },
    methods: {
        switchNav(index) {
            if (this.currentTab == index) {
                return false;
            } else {
                this.currentTab = index;
            }
            switch (parseInt(this.currentTab)) {
                case 0:
                    this.$router.push({
                        path: "/botnav/index"
                    });
                    break;
                case 1:
                    this.$router.push({
                        path: "/botnav/specialist"
                    });
                    break;
                case 2:
                    this.$router.push({
                        path: "/botnav/message"
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/botnav/mine"
                    });
                    break;
            }
            if (this.tabindex > this.currentTab) {
                this.transitionName = "slide-right"
            } else {
                this.transitionName = "slide-left"
            }
            this.tabindex = this.currentTab
        },
        list1() {
            botnavapi.chatlist(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.msgnum = res.data.datas[0].ordert_duihua[0].wd;
                }

                this.num = this.msgnum + this.chatlistlength;

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
            botnavapi.chatxitong(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.chatlistlength = res.data.datas
                }

                this.num = this.msgnum + this.chatlistlength;

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
    },

    created() {
        switch (this.$route.path) {
            case "/botnav/index":
                this.currentTab = 0
                break;
            case "/botnav/specialist":
                this.currentTab = 1
                break;
            case "/botnav/message":
                this.currentTab = 2
                break;
            case "/botnav/mine":
                this.currentTab = 3
                break;
        }
        if (!this.stateapi) {
            if (this.key) {
                this.list1();
                this.list2();

            }
        }
    },
    mounted() {
        // setInterval(() => {
        //     this.list1();
        //     this.list2()
        // }, 300000)
    }
};