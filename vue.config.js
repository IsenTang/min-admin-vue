const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // * 以/api开头的请求
      '/api': {
        // * 目标地址
        target: 'http://localhost:3001',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
});
