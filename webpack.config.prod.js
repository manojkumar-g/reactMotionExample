const webpack = require('webpack');
const path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry : {
    main:APP_DIR+"/index.js",
    vendor:['react']
  },
  output : {
    path: BUILD_DIR,
    filename:'main.[hash].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test : /\.styl$/,
        include : APP_DIR,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }

    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks: Infinity
        }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: 'meta.[hash].js' }),
    new ManifestPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'React',
      template:'my-index.ejs'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
