import Cookie from "js-cookie";

export default {
    state:{
        // 标签
        tabsList: [{
            path: '/',
            name: 'home',
            icon: 'home',
            label: '首页'
        }],
        currentMenu: null,   // 当前在哪个页面下
        menu: [],   // 动态菜单
    },
    mutations:{
        // 改变标签数据 val是一个tab
        selectMenu(state, val) {
            if (val.name !== 'home') {
                // 切换页面
                state.currentMenu = val
                // 判断选中路由存不存在
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        // 关闭标签
        closeTag(state,val){
            const resp = state.tabsList.findIndex(item=> item.name === val.name)
            state.tabsList.splice(resp,1)
        },
        clearTag(state,val){

        },
        // 菜单
        setMenu(state,menu){
            state.menu = menu
            Cookie.set('menu',JSON.stringify(menu))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            // 如果cookie没有数据
            if(!Cookie.get('menu')){
                return;
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 设置动态路由  menuArray存入相关路由
            const menuArray = []
            menu.forEach(item => {
                // 如果是二级菜单
                if(item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    // 解构children
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        }
    }
}
