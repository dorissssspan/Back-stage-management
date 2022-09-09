import axios from 'axios'

// 判断环境变量
// import config from './config'
// const baseUrl = process.env.MODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// class httpRequest {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl
//   }
//   // 获取实例配置
//   getInsideConfig() {
//     const config = {
//       baseUrl: this.baseUrl,
//       header: {},
//       timeout: 10000,
//       withCredentials: false // 表示跨域请求时是否需要使用凭证
//     }
//     return config
//   }
//   // 设置拦截器
//   interceptor(instance) {
//     // 添加请求拦截器
//     instance.interceptors.request.use((config) => {
//       return config;
//     }, (err) => {
//       return Promise.reject(err);
//     });
//
//     // 添加响应拦截器
//     instance.interceptors.response.use((response) => {
//       return response;
//     }, (err) => {
//       console.log(err, 'err')
//       return Promise.reject(err);
//     });
//   }
//   // 创建实例
//   request(options) {
//     const instance = axios.create()
//     options = {
//       ...this.getInsideConfig(),
//       ...options
//     }
//     this.interceptor(instance)
//     return instance(options)
//   }
// }

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
// export default new httpRequest(baseUrl)
