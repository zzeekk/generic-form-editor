
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.json');

module.exports = {
  mode: 'development',
  devServer: {
    port: config.port,
	proxy: {
	  '/bitbucketServerProxy': {
		target: config.bitbucketServerUrl,
		pathRewrite: {'^/bitbucketServerProxy' : ''},
		changeOrigin: true
	  }
	}	
  },  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'refedit.bundle.js'
  },
	entry: ["babel-polyfill", "./src/index.js"], // needed for IE11 compatibility
  module: {
    rules: [
      { test: /\.js$/, exclude: /babel-polyfill/, loader: 'imports-loader?define=>false'}, // disable AMD loader because of problems with datatables
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader'},
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader'},
			{ test: /\.js$/, loader: 'babel-loader', query: { presets: ['env'] }} // transcode ES6 to ES5 for IE11
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      tv4: 'tv4'
    }),
  ]
};
