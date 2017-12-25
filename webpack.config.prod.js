var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
 
  const VENDOR_LIBS = [
    "react",
    "react-dom",
    "mobx",
    "mobx-react"
  ];

  const exclude_from_webpack = [
    /node_modules/
  ];

  return {
    entry: {
      bundle: ['babel-polyfill', './src/index.js'],
      vendor: VENDOR_LIBS
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    stats: 'errors-only',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module:{
      rules:[
        {
          test: /\.exec\.js$/,
          use: [ 'script-loader' ]
        },
        {
          loader: 'babel-loader',
          test: /\.(js|jsx!\.exec\.js)$/,
          exclude: exclude_from_webpack,
          options: {
            "presets": [ "env", "react"]
          }
        },
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: exclude_from_webpack,
        },
        {
            test: /\.json$/,
            exclude: exclude_from_webpack,
            use: 'json-loader'

        },
        {
          test: /\.(jpe?g|png|gifs|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 40000}
                },
                'image-webpack-loader'
            ]
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader', 'sass-loader']
          }),
          exclude: exclude_from_webpack
        },
        {
          use: 'file-loader?name=fonts/[name].[ext]',
          test: /\.(eot|ttf|woff|woff2|otf)$/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*']),
      new UglifyJsPlugin({
        sourceMap: true,
        test: /\.(js|jsx)$/
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              collapseWhitespace: true
          },
          hash: true
      }),
      new ExtractTextPlugin({
          filename: "styles.[contenthash].css",
          allChunks: false
      })
    ]
  }
}
