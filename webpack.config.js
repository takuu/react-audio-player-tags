var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: [
      "babel-polyfill",
      // "react-hot-loader",
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server"
    ]
  },
  output: {
    filename: 'bundle-[hash].js',
    publicPath: '/',
    path: '/build',
  },
  performance: {hints: false},
  module: {
    loaders: [
      {
        test: /.js?$/,
        loaders: "babel-loader",
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
        }),
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    alias: {
      reducers: 'src/reducers',
      components: 'src/components',
      // config: "src/config",
      helpers: 'src/lib',
    },
    extensions: [".js"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '.build/vendor.bundle-[hash].js' }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.tpl.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
