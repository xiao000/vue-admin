import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '../store/index'
import { getToken } from '@/utils/auth'
import router from '../router/index'
// 创建axios实例
let service = axios.create({
  // baseURL: 'https://ysadmin.hashsl.com',// api的base_url
  // timeout: 5000000000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  
  return config;
}, error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log(response);

    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
