var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
 
  const VENDOR_LIBS = [
    "react",
    "react-dom",
    "mobx",
    "mobx-react",
    "mobx-react-devtools"
  ];

  const exclude_from_webpack = [
    /node_modules/
  ];

  return {
    entry: {
      bundle: ['react-hot-loader/patch', 'babel-polyfill', './src/index.js'],
      vendor: VENDOR_LIBS
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    stats: 'errors-only',
    devtool: 'source-map',
    devServer: {
      port: 8000,
      inline: true,
      hot: true,
      open: true,
      overlay: false,
      stats: 'errors-only'
    },
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
            "presets": [ "env", "react"],
            "plugins": ["react-hot-loader/babel"]
          }
        },
        {
          test: /\.(ts|tsx)?$/,
          use: ['react-hot-loader/webpack', 'ts-loader'],
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
            use: ["style-loader",'css-loader', 'sass-loader'],
            test: /\.(css|scss)$/,
            exclude: exclude_from_webpack
        },
        {
          use: 'file-loader?name=fonts/[name].[ext]',
          test: /\.(eot|ttf|woff|woff2|otf)$/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              collapseWhitespace: false
          },
          hash: false
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
