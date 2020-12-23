module.exports = {
  // 基本路径
  publicPath: "./", // 构建时的输出目录
  outputDir: "dist", // 放置静态资源的目录
  assetsDir: "static", // html 的输出路径
  indexPath: "index.html", //文件名哈希
  filenameHashing: true,
  // 页面title
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "I TAP";
      return args;
    });
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
};
