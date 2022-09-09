import axios from 'axios'

/* 封装axios请求 */

// 创建实例
const service = axios.create({
  baseUrl: '/api/',
  timeout: 3000,
  withCredentials: false // 表示跨域请求时是否需要使用凭证
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use((config) =>{
  return config;
}, error => {
  console.log(error,'err')
  return Promise.reject(error)
})

export default service
