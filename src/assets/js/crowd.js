import Vue from "vue";
import crowdapi from "@/api/CrowdApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import {
    Image,
    Tab,
    Tabs
} from 'vant';
import vueSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
Vue.use(vueSwiper);
Vue.use(Image).use(Tab).use(Tabs);
export default {
    name: 'crowd',
    components: {},
    data() {
        return {
            comname: '',
            case_image: "",
            columnm: "",
            remarks: "",
            infolist: [],
            xia_list: [],
            active: 0,
            currentTab: 0,
            currentTabs: 0,
            loding: true,
            gc_id: '',
            erweimapic: '',
            listnull: false,
            vantab: {
                list: [

                ],
                color: "#21C891",
                background: "transparent",
                linewidth: "16px",
                lineheight: "2px",
                activecolor: "#333333",
                defaultcolor: "#333333",
                swipethreshold: 4,
                border: false,
                swipeable: true
            },
            swiperOption: {
                slidesPerView: "auto",
                freeMode: true,
                spaceBetween: 0,
                loop:false
            }
        }
    },
    methods: {
       
        switchNav(index) {
            if (this.currentTab == index) {
                return false;
            } else {
                const toast = this.$createToast({
                    time: 1000,
                    txt: '正在加载'
                })
                toast.show()
                this.currentTab = index;
                this.currentTabs = 0;
                this.xia_list = this.infolist[this.currentTab].xia_list.class_list
                this.gc_id = this.infolist[this.currentTab].xia_list.class_list[this.currentTabs].gc_id;
                this.list3(this.gc_id);
            }
        },
        pitchtab(index) {
            this.currentTab = index;
            const toast = this.$createToast({
                time: 1000,
                txt: '正在加载'
            })
            toast.show()
            this.currentTab = index;
            this.currentTabs = 0;
            this.xia_list = this.infolist[this.currentTab].xia_list.class_list
            this.gc_id = this.infolist[this.currentTab].xia_list.class_list[this.currentTabs].gc_id;
            this.list3(this.gc_id);
        },
        listbtn(indexs) {
            if (this.currentTabs == indexs) {
                return false;
            } else {
                const toast = this.$createToast({
                    time: 1000,
                    txt: '正在加载'
                })
                toast.show()
                this.currentTabs = indexs;
                this.gc_id = this.infolist[this.currentTab].xia_list.class_list[this.currentTabs].gc_id;
                this.list3(this.gc_id);
            }
        },

        list1() {
            crowdapi.crowdlist().then(res => {
                this.case_image = res.data.datas[0].case_image;
                this.columnm = res.data.datas[0].columnm;
                this.remarks = res.data.datas[0].remarks;
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
            crowdapi.infolist().then(res => {
                this.infolist = res.data.datas.class_list
                for (let i in this.infolist) {
                    this.vantab.list.push(this.infolist[i].gc_name)
                }
                this.listnull = true;
                this.xia_list = this.infolist[this.currentTab].xia_list.class_list
                this.gc_id = this.infolist[this.currentTab].xia_list.class_list[this.currentTabs].gc_id
                this.list3(this.gc_id);
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
        list3(gc_id) {
            crowdapi.cation_list(gc_id).then(res => {
                this.erweimapic = res.data.datas[0].case_image;
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
        this.list1();
        this.list2();
    },
    mounted() {

    }
}