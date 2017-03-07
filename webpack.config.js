  const webpack = require('webpack');
  const path = require('path');
  var BUILD_DIR = path.resolve(__dirname, 'dist');
  var APP_DIR = path.resolve(__dirname, 'src');
  var nib = require('nib');

  var config = {
  devtool: 'cheap-module-eval-source-map',
  entry : {
    main:['webpack-hot-middleware/client',APP_DIR+"/index.js"],
    vendor:['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/static/'
  },
    module : {
      loaders : [
        {
          test : /\.js$/,
          include : APP_DIR,
          loaders: ['react-hot', 'babel']
        },
        {
          test : /\.styl$/,
          include : APP_DIR,
          loader: 'style!css!stylus'
        }

      ]
    },
    stylus: {
		use: [nib()]
	 },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor',
              filename: 'vendor.js',
              minChunks: Infinity
          }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: 'meta.js' }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };

  module.exports = config;
