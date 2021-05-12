const webpack = require("webpack");
// console.log("webpack", webpack);
const path = require("path");

module.exports = {
  // 选项...
  publicPath: "/lb_lite_emr/",
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        globalVars: require("./src/configs/less/globalVars"),
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(
          __dirname,
          "./src/configs/icons.js"
        ),
      },
      mainFiles: ["index"],
    },
    devtool: "source-map",
  },
  devServer: {
    port: 8001,
    disableHostCheck: true,
  },
};
