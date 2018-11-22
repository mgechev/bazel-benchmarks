'use strict';

var path = require('path');
var webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function root(sub) {
  return path.join(path.resolve(), sub);
}

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  target: 'web',
  mode: 'production',
  // For useful debugging, make sure source maps point to original TS content
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.ts',
  output: { path: root('dist'), pathinfo: true, filename: 'bundle.js' },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
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
