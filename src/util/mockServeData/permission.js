import Mock from 'mockjs'

let root = {
  username: 'admin',
  password: 'admin'
}

let user = {
  username: 'xixi',
  password: 'xixi'
}

/* 后台权限登录 */
export default {
  getMenu: config => {
    // 接收username、password参数
    const {username, password} = JSON.parse(config.body)
      if (username === root.username && password === root.password) {
        return {
          meta: {
            msg: 'success',
            status: 200
          },
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home'
              },
              {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'mall'
              },
              {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'User'
              },
              {
                label: '其他',
                icon: 'location',
                children: [
                  {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'other/PageOne'
                  },
                  {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'other/PageTwo'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            username: '潘叁岁',
            authority: '超级管理员',
            message: '获取成功'
          }
        }
      } else if (username === user.username && password === user.password) {
        return {
          meta: {
            msg: 'success',
            status: 200
          },
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home'
              },
              {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'mall'
              }
            ],
            token: Mock.Random.guid(),
            username: "林希",
            authority: '管理员',
            message: '获取成功'
          }
        }
      } else {
        return {
          meta: {
            msg: 'error',
            status: 201
          }
        }
      }
    }
}
