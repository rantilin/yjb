import axios from 'axios'
//自定义创建axios
const request = axios.create({
        baseURL: process.env.VUE_APP_BASE_API,
       // baseURL: 'http://ceshi.yijiaobao.com.cn/mobile/',
        // timeout: 10,
    })
    //请求拦截器
request.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.reject(error);
    })
    //响应拦截器
axios.interceptors.response.use(response => {
    // response.data  可以获取到相应的数据
    return response
}, error => {
    return Promise.reject(error);
})

export default request