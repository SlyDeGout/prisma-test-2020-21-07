const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/register");

module.exports = (env) => {
  return {
    entry: ["./src/index.js", "./src/style.css"],
    output: {
      path: path.resolve(__dirname, "dist/"),
      filename: "bundle.js",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html",
        hash: true,
      }),
    ],
  };
};
