const path = require("path");
// module.exprts = {
//   mode: "development",
//   entry: "./src/index.js",
//   output: {
//     publicPath: "/",
//     filename: "bundle.js"
//   },
//   devServer: {
//     port: 8080
//   }
// };

module.exports = {
  mode: "development", //打包模式，默认production

  //打包入口配置,相对路径是相对于启动命名npx webpack时所在的目录
  // entry: "./src/js/index1.js", //单一入口
  entry: "./src/index.js", //多入口，值为数组

  //打包出口配置
  output: {
    filename: "bundle.js", //输出文件，默认main.js，
    //输出路径，必须绝对路径,否则报错
    // path: __dirname + "/dist",
    publicPath: "/" //使用path模块，实现路径拼接
  },
  devServer: {
    port: 8080
    // contentBase: "/"
  }
};
