/* eslint-disable @typescript-eslint/no-var-requires */
// import webpack from 'webpack'
// import * as path from 'path'
const webpack = require('webpack')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config = {
  entry: './index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // library: {
    //   type: 'module',
    // },
  },
  // experiments: {
  //   outputModule: true,
  // },
  // mode: 'development',
}

// export default config
module.exports = config
