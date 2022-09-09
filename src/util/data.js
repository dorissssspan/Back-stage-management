import axios from './axios'

/* 二次封装axios */

// 登录
export const getLogin = (params) => {
  return axios.request({
    url: '/permission/getLogin',
    method: 'post',
    data: params
  })
}

// 可视化
export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

// 图表
export const getTableData = () =>{
  return axios.request({
    url: '/home/getTableData',
    method: 'get'
  })
}

// 用户列表
export const getUserList = (params) =>{
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
export const createUser = (data) =>{
  return axios.request({
    url: '/user/add',
    method: 'post',
    data
  })
}
export const delUser = (params) =>{
  return axios.request({
    url: '/user/del',
    method: 'get',
    params
  })
}
export const updateUser = (data)  =>{
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

// 商品列表
export const getMallList = (params) =>{
  return axios.request({
    url: '/mall/getGood',
    method: 'get',
    params
  })
}
// 添加
export const editMall = (data) =>{
  return axios.request({
    url: '/mall/updateMall',
    method: 'post',
    data
  })
}
// 删除
export const delMall = (params) => {
  return axios.request({
    url: '/mall/delGood',
    method: 'get',
    params
  })
}
