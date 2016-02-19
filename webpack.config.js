var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, '/build/custom/phaser-split.js');
var pixi = path.join(phaserModule, '/build/custom/pixi.js');

module.exports = {
  entry: './js/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file'
      },
      {
        test: /pixi.js/,
        loader: 'script'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'assets': path.join(__dirname, '/assets/')
    }
  },
  sassLoader: {
    includePaths: [__dirname + '/scss']
  },
  plugins: [new HtmlWebpackPlugin()]
};
