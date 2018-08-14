
import Vue from 'vue'
import axios from 'axios'
import {Indicator} from 'mint-ui'
Vue.component(Indicator)
let CancelToken = axios.CancelToken //取消请求
let cancelFlag = true
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 20000
axios.interceptors.request.use(config => {
    let requestName = config.data.requestName
    if (requestName) {
        if (axios[requestName] && axios[requestName].cancel) {
            axios[requestName].cancel()
        }
        config.cancelToken = new CancelToken (c => {
            axios[requestName] = {}
            axios[requestName].cancel = c
           
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(config => {
    cancelFlag = true
    Indicator.close()
    return config
}, error => {
    cancelFlag = true
    Indicator.close()
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
            error.message = `连接错误${error.response.status}`
        }
      } else {
        error.message = "连接到服务器失败"
      }
    return Promise.reject(error.message)
})

export default axios