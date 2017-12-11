'use strict';

var path = require('path');
var HappyPack = require('happypack');
var webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function root(sub) {
  return path.join(path.resolve(), sub);
}

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  target: 'web',
  // For useful debugging, make sure source maps point to original TS content
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.ts',
  output: { path: root('dist'), pathinfo: true, filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(
      [
        { from: 'index.html', to: root('dist') },
      ]),
    new ForkTsCheckerWebpackPlugin({
      // Wait for type-check results before serving
      // so that typescript errors appear in the app
      async: false,
      checkSyntacticErrors: true,
      workers: 2,
      memoryLimit: 4096,
    }),
  ]
};
