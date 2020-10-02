import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
import { Toast } from 'vant'

// 创建请求
const service = axios.create({
  baseURL: '/study/data',
  timeout: 30000,
  responseType: 'json'
})

// 请求发送前的拦截器
service.interceptors.request.use(
  config => {
    // 请求之前显示加载
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true
    })
    return config
  },
  error => {
    Toast.clear()
    return Promise.reject(error)
  }
)

// 请求响应后的拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const { data } = response
    if (typeof data === 'object') {
        return data
    } else {
      // 服务异常出错
      Toast('服务异常')
      return Promise.reject(new Error('服务异常'))
    }
  },
  error => {
    Toast.clear()
    return Promise.reject(error)
  }
)

export default service