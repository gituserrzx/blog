import Axios from 'axios'
import apiUrl from './apiUrl'
import {message} from 'antd'

const http = Axios.create({
    baseURL: apiUrl.baseUrl,
    timeout: 5000,// request timeout  设置请求超时时间
    responseType: 'json',
    withCredentials: true,// 是否允许带cookie这些
    headers:{
        "Content-Type": "application/json;charset=utf-8"
    }
})
http.interceptors.request.use(
    config => config,
    config => {
        message.error('warning')
        return config
    }
)
http.interceptors.response.use (
    response => {
        if(response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    err => {
        if(err.status == 500) {
            message.error('请求错误')
        }
    }
)
export default http