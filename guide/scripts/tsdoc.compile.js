const path = require("path");
const webpack = require("webpack");
const babelFixedPlugin = require("./babelFixedPlugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.t|jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve("./packages/hippy_ui_react/src"),
          path.resolve("./packages/hippy_ui_react_business/src"),
          path.resolve("./guide/styleguidist/Wrapper")
        ],
        options: {
          babelrc: false,
          presets: ["@babel/env", "@babel/react", "@babel/typescript"],
          plugins: ["@babel/plugin-proposal-class-properties", babelFixedPlugin],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        },
      }
    ]
  },
  resolve: {
    extensions: [".web.js", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@hippy/react": path.join(__dirname,"../../", "./library/hippy-react-web/index.js"),
      "hippy_ui_react": path.join(__dirname,"../../", "./packages/hippy_ui_react/src"),
      "hippy_ui_react_business": path.join(__dirname,"../../", "./packages/hippy_ui_react_business/src"),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // __SERVER__: false,
      // __RN__: false,
      // __TESTUI__: false,
      // __DEV__: true
      // __DOC__: true
    })
  ]
};
