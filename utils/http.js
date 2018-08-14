import Vue from 'vue'
import axios from './axios'
import 'mint-ui/lib/style.css';
import {Toast} from 'mint-ui'
Vue.component(Toast)
export function post (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            Toast({
                message: err,
                duration: 500
            })
        })
    })
}
export function get (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            Toast({
                message: err,
                duration: 500
            })
        })
    })
}