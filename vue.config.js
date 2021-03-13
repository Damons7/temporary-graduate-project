module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost:6008/', // 本地后端地址
        //   target: 'http://47.115.85.237:3000/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}