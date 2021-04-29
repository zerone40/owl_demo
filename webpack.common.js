const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    mode: "development",
    entry: {
      index: './src/index.js'
    },
    output: {
      // 打包文件根目录
      filename: 'main.js',
      path: path.resolve(__dirname, "dist/"),
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          include: path.resolve(__dirname, 'src'),
        },
        //处理样式
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
          sideEffects: true,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          sideEffects: true,
        },
        // 图片地址解析
        {
          test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      port: 8080,
      host: '127.0.0.1',
      open: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
      }),
    ],
    cache: {
      type: 'filesystem',
      // 可选配置
      buildDependencies: {
        config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
      },
      name: 'development-cache',
    },
  }
}