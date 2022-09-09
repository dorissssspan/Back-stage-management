const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置使用CDN
  configureWebpack: {
    externals: {
      nprogress: "NProgress"
    }
  },
})
