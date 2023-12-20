const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   publicPath: "./",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.94.4.201",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
})
