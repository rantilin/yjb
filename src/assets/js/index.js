import indexapi from "@/api/IndexApi";
import common from "./common";
import { share_yp } from './share';
import ComponentLoading from '@/components/ComponentLoading';
import Indexlayout from '@/components/Indexlayout';
import classlist from '@/components/classlist';
import recommend from '@/components/recommend';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
import vueSwiper from 'vue-awesome-swiper'
Vue.use(vueSwiper)
export default {
    name: 'index',
    components: {
        ComponentLoading,
        Indexlayout,
        classlist,
        recommend,
    },
    data() {
        return { 
            avtiveindex: 0,
            indexdata:['new_index_one','new_index_two', '' , 'new_index_three'],
            recomdata:['new_index_jktj','new_index_yrtj'],
            shouquankey: this.$route.query.key,
            vantab: {
                list: [
                    "健康",
                    "育儿",
                    "班级",
                    "免费课"
                ],
                color: "#21C891",
                background: "#ffffff",
                linewidth: "16px",
                lineheight: "2px",
                activecolor: "#21C891",
                defaultcolor: "#333333",
                swipethreshold: 4,
                border: false,
                swipeable: true
            },
            border: false,
            swipeable: true,
            swipers: '',
            swiperek: '',
            swipercj: '',
            swiperkk: '',
            swipertt: '',
            swiperjk: '',
            swiperye: '',
            swiperlist: [],
            swiperlist1: [],
            swiperlist2: [],
            bjlist: [],
            listdata: [],
            tjdata:[],
            loding: true,
            keyval: 1,
            sharename: '医教宝',
            indexlogo: 'http://yijiaobao.com.cn/wap/images/logo1.png',
            desc: "一个帮爸妈养娃省心省力的平台，汇集全国名师名医，提高孩子成绩，实时儿科问诊，还有超多育儿福利资源，快来领取吧~",
            url: process.env.VUE_APP_SERVICE_URLS,
            present: process.env.VUE_APP_SERVICE_URLS,
            p1: '',
            p2: '',
            p3: '',
            stateapi: false,
            scrollEvents: ['before-scroll-start'],
            fromflag: true,
            tjpage: 1, //推荐分页
        };
    },
    methods: {
        scrollnow() {
            this.$refs.scroll.refresh();
        },
        //首页banner
        swiperbanner() {
            this.$nextTick(() => {

                this.swipers = new Swiper('.swiperbanner', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: false,
                    loop: false,
                    slidesPerView: 1.08,
                    spaceBetween: 12,
                    loopedSlides: 3,
                    autoplayDisableOnInteraction: false,
                })

            });
        },
        
        avtivelist1() {
            this.swiperbanner();
        },
        avtivelist2() {
            this.swiperbanner();
        },
        avtivelist3() {
            this.swiperbanner();
        },
        avtivelist4() {
            this.swiperbanner();
        },
        activelist(avtiveindex) {
            switch (avtiveindex) {
                case 0:
                    this.avtivelist1();
                    break;
                case 1:
                    this.avtivelist2();
                    break;
                case 2:
                    this.avtivelist3();
                    break;
                case 3:
                    this.avtivelist4();
                    break;
            }
        },
        destroy1() {
            this.$nextTick(() => {
                this.swipers.destroy(false);
                this.swiperek.destroy(false);
            });
        },
        destroy2() {
            this.$nextTick(() => {
                //this.swipers.destroy(false);
                // this.swipercj.destroy(false);
                //this.swiperkk.destroy(false);
                //this.swipertt.destroy(false);
            });
        },
        destroy3() {
            this.$nextTick(() => {
                // this.swipers.destroy(false);
            });
        },
        destroy4() {
            this.$nextTick(() => {
                // this.swipers.destroy(false);
                this.swiperjk.destroy(false);
                this.swiperye.destroy(false);
            });
        },
        destroylist(avtiveindex) {
            switch (avtiveindex) {
                case 0:
                    this.destroy1();
                    break;
                case 1:
                    this.destroy2();
                    break;
                case 2:
                    this.destroy3();
                    break;
                case 3:
                    this.destroy4();
                    break;
            }
        },
        pitchtab(index) {
            this.loding=true
            // const toast = this.$createToast({
            //     time: 0,
            //     txt: '正在加载'
            // })
            //toast.show();
            setTimeout(() => {
                
                //this.destroylist(this.avtiveindex);
                this.avtiveindex = index;
                if (this.avtiveindex == 0) this.swiperlist = this.swiperlist1
                else this.swiperlist = this.swiperlist2
                    // this.swipers.slideTo(0, 0, false);
                this.activelist(this.avtiveindex);
                this.$nextTick(() => {
                    this.$refs.scroll.refresh();
                });
                let avtindex=this.avtiveindex
                if( avtindex == 0 || avtindex == 1 || avtindex == 3){
                    this.list2()
                }
                if(avtindex == 0 || avtindex == 1){
                    this.list5()
                }
                if(avtindex == 2){
                    this.loding = false
                }
                this.$refs.scroll.scrollTo(0, 0);
                // toast.hide();
            }, 200)

        },
        moreteb(value){
           if(value == 0){
            this.avtiveindex=1
            this.pitchtab(1)
           }else{
            this.$router.push({
                name: 'specialist',
            })
           }
        },
        gopage(url) {
            if (url != '') window.location.href = url
        },
        list1() {
            indexapi.swiperlist().then(res => {
                this.swiperlist1 = res.data.datas.one;
                this.swiperlist2 = res.data.datas.two;
                if (this.avtiveindex == 0) this.swiperlist = this.swiperlist1
                else this.swiperlist = this.swiperlist2
                this.swiperbanner();
                this.p1 = true;
                this.allapitrue();
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
            indexapi.realllist(this.indexdata[this.avtiveindex]).then(res => {
                this.listdata = res.data.datas;
                this.loding = false;
                this.p2 = true;
                this.allapitrue();
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
            indexapi.classlist().then(res => {
                this.bjlist = res.data.datas;
                this.p3 = true;
                this.allapitrue();
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
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                share_yp(this.keyval, 1, this.sharename, this.indexlogo, this.desc, this.url, this.present);
            }
        },
        list5(){
            indexapi.recomlist(this.recomdata[this.avtiveindex], this.tjpage).then(res=>{
                this.tjdata = res.data.datas;
            })
        },
        number(val) {
            return common.number(val);
        },
        classbtn(val, num, index) {
            this.$router.push({
                name: 'videoclass',
                query: {
                    id: val,
                    num: num,
                    index: index,
                }
            })
        },
        audiobtn(val) {
            this.$router.push({
                name: 'babyto',
                query: {
                    id: val,
                }
            })
        },
        govideo(id, index) {
            this.$router.push({
                name: 'class',
                query: {
                    classid: id,
                    index: index
                }
            })
        },
        goaudio(id, index) {
            this.$router.push({
                name: 'audio',
                query: {
                    classid: id,
                    index: index
                }
            })
        },
        group(id, index) {
            this.$router.push({
                name: 'paygroup',
                query: {
                    id: id,
                    index: index
                }
            })
        },
        
        welfare(id) {
            this.$router.push({
                name: 'welfare',
                query: {
                    id: id,
                }
            })
        },
        allapitrue() {
            if (this.p1 == true && this.p2 == true && this.p3 == true) {
                this.stateapi = true;
            } else {
                this.stateapi = false;
            }
        }
    },
    beforeCreate() {},
    created() {
        var sharefrom = window.location.href;
        if (sharefrom.split("from=")[1]) {
            this.fromflag = false
            window.location.href = this.present
        }
    },
    activated() {
        if (this.fromflag) {
            this.list4();
            if (!this.stateapi) {
                this.loding = true;
                if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                    if (this.shouquankey) {
                        var dataes = { value: this.shouquankey, expirse: new Date().getTime() + 7 * 24 * 3600 * 1000 };
                        window.localStorage.setItem('key', JSON.stringify(dataes));
                        this.$router.push({
                            path: localStorage.getItem('souquanpath'),
                            query: JSON.parse(localStorage.getItem('souquanquery'))
                        });
                        
                    }
                }
                this.list1();
                this.list2();
                this.list3();
                this.list5();
            }
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        }
    },
    mounted() {
        if (this.$route.query.activeindex == undefined) {
            this.avtiveindex = 0
        } else {
            this.avtiveindex = this.$route.query.activeindex
        }
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        }
    },

};