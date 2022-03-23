const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/uploadAvatar': {  // 为带有atguigu前缀的请求配置代理
        target: 'http://121.4.32.3',  // 实际服务器地址
      },
    },
  },
})
