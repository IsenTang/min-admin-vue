const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api2': {
        // * 目标地址
        // target: 'http://localhost:3000',
        target: 'http://49.235.98.65:8889/',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        pathRewrite: {
          '^/api2': '/',
        },
      },
      // * 以/api开头的请求
      '/api': {
        // * 目标地址
        // target: 'http://localhost:3000',
        target: 'http://49.235.98.65:3000',
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
