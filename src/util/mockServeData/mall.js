import Mock from 'mockjs'


/* 商品管理模块 */
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

// 模拟列表数据
let MallList = []
const count = 200
for (let i = 0; i < count; i++) {
    MallList.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.name() + '牌手机',
            price:Mock.Random.float(1999,8999).toFixed(2),
            count:Mock.Random.integer(120,1800),
            total:0
        })
    )
}

export default {
    // 获取商品列表
    getGoodsList: config =>{
        console.log(config)
        const { page = 1, limit = 20 } = param2Obj(config.url)
        const goods = MallList.map(item => {
            item.total = parseInt(item.price * item.count)
            return item
        })
        const goodList = goods.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: MallList.length,
            list: goodList
        }
    },
    // 修改商品
    updateMall: config => {
        const { id, name, price } = JSON.parse(config.body)
        MallList.some(u => {
            if (u.id === id) {
                u.name = name
                u.price = price
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    },
    // 删除商品
    delGoods: config =>{
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: -999,
                message: '删除失败'
            }
        } else {
            MallList = MallList.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    }
}
