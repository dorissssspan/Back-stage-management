import Mock from 'mockjs'
import homeApi from '../util/mockServeData/line'
import userApi from '../util/mockServeData/user'
import permission from "../util/mockServeData/permission";
import mallApi from '../util/mockServeData/mall'

/* 二次封装接口模块聚合 */
// 没请求类型默认get （接口正则表达式 ，请求类型，回调函数）

// echarts
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/home/getTableData',homeApi.getTableData)

// 登录权限
Mock.mock(/permission\/getLogin/,'post',permission.getMenu)

/* 用户管理模块 */
Mock.mock(/user\/getUser/,userApi.getUserList)
Mock.mock(/user\/del/,userApi.deleteUser)
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)

/* 商品管理 */
Mock.mock(/mall\/getGood/,mallApi.getGoodsList)
Mock.mock(/mall\/delGood/,mallApi.delGoods)
Mock.mock(/mall\/updateMall/,'post',mallApi.updateMall)




