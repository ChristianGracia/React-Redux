const path = require("path");
const rules = [
  {
    test: /\.tsx?/,
    excludes: /node_modules/,
    loader: "babel-loader"
  }
];

module.exports = {
  targets: "web",
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(_dirname, "build"),
    filename: "bundle.js"
  },
  module: { rules },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  devServer: {
    contentBase: "./",
    port: 5000
  }
};
