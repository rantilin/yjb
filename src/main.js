import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import { toast } from "./utils/Toast";
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.toast = toast;
axios.defaults.timeout = 15000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
//====

const CancelToken = axios.CancelToken;
Vue.$httpRequestList = [];



//路由守卫
router.beforeEach((to, from, next) => {
    //无论是刷新还是跳转路由 第一个进入的就是这个路由前置钩子函数
    var data = JSON.parse(localStorage.getItem('key'));
    if (data != null) {
        if (data.expirse != null && data.expirse < new Date().getTime()) {
            localStorage.removeItem('key');
        } else {
            store.dispatch('addtoken', data)
        }
    }
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (Vue.$httpRequestList.length > 0) { //强行中断时才向下执行
        Vue.$httpRequestList.forEach(item => {
            item('interrupt'); //给个标志，中断请求
        })
    }
    if (to.meta.requireAuth) {
        if (store.state.key) {
            next()
        } else {
            router.push({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function() {
        return axios(config);
    });
});
const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')