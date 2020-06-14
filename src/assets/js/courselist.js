import Vue from 'vue';
import common from '@/assets/js/common'
import courselistapi from "@/api/CourselistApi";
import {
  PullRefresh,
  List,
  Image as VanImage
} from 'vant';
Vue.use(PullRefresh).use(List).use(VanImage);
import ComponentLoading from '@/components/ComponentLoading';

export default {
  name: 'courselist',
  components: {
    ComponentLoading
  },
  data() {
    return {
      index: this.$route.query.index,
      id: this.$route.query.id,
      commontitlename:this.$route.query.num,
      cumlist: [],
      cumindex: 0,
      cumid: '',
      yjblist: [],
      curpage: 1,
      total: 1,
      cummore: true,
      options: {
        pullUpLoad: {
          txt: {
            more: '上拉加载更多视频',
            noMore: '没有更多视频'
          }
        }
      },
      loding: true,
    }
  },
  created() {
    this.initdata()
  },
  methods: {
    back() {
      if (window.history.length <= 2) {
        this.$router.push({
          path: '/',
          query: {
            activeindex: this.index,
          }
        })
      } else {
        this.$router.push({
          path: '/',
          query: {
            activeindex: this.index,
          }
        })
      }
      localStorage.removeItem('lanmuvals');
    },
    initdata() {
      courselistapi.column(this.id).then(res => {
        this.cumlist = res.data.datas;
        this.cumid = this.cumlist[0].id;
        this.onLoad()
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

    number(val) {
      return common.number(val)
    },
    ceshi() {
      console.log(123);
    },
    cumteb(index, itemid) {
      this.loding = true
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, 0);
      });
      this.yjblist = []
      this.cumindex = index
      this.cumid = itemid
      this.cummore = true
      this.curpage = 1
      this.total = 1
      this.onLoad()
    },
    onLoad() {
      let _this = this
      if (_this.cummore) {
        courselistapi.newsplist(_this.id, _this.cumid, _this.curpage).then(res => {
          let _list = res.data.datas.list
          _this.loding = false
          if (_list[0].setTotal) {
            _this.total = _list[0].setTotal
          }
          _this.yjblist = [..._this.yjblist, ..._list]
          _this.$refs.scroll.refresh();
          if (_this.total > _this.curpage) {
            _this.curpage = parseInt(_this.curpage) + 1
            _this.cummore = true
          } else {
            _this.$refs.scroll.forceUpdate();
            _this.$refs.scroll.refresh();
            _this.cummore = false
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
        _this.$refs.scroll.forceUpdate();
        _this.$refs.scroll.refresh();
      }
      
    },
    godetail(id, item, index) {
      if (item == 1) {
        this.$router.push({
                name: 'class',
                query: {
                    classid: id,
                    index: index
                }
      })
      } else {
        this.$router.push({
                name: 'audio',
                query: {
                    classid: id,
                    index: index
                }
      })
      }
    }
  }
};