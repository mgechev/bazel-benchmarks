'use strict';

var path = require('path');
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function root(sub) {
  return path.join(path.resolve(), sub);
}

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  target: 'web',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: { path: root('dist'), pathinfo: true, filename: 'index.js' },
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
      threads: 1,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),
    new CopyWebpackPlugin(
      [
        { from: 'index.html', to: root('dist') },
      ]),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
  ]
};
