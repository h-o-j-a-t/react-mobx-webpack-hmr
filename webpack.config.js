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
    //   new HtmlWebpackExternalsPlugin({
    //     externals: [
    //       {
    //         module: 'jquery',
    //         entry: 'dist/jquery.min.js',
    //         global: 'jQuery'
    //       }
        //   ,
        //   {
        //     module: 'x2js',
        //     entry: 'x2js.js',
        //     global: 'X2JS'
        //   },
        //   {
        //     module: 'popper.js',
        //     entry: 'dist/umd/popper.min.js'
        //   },
        //   {
        //     module: 'bootstrap-rtl',
        //     entry: 'dist/js/bootstrap.min.js'
        //   },
        //   {
        //     module: 'bootstrap-rtl',
        //     entry: 'dist/css/bootstrap-rtl.min.css'
        //   },
        //   {
        //     module: 'font-awesome',
        //     entry: 'css/font-awesome.min.css',
        //     supplements: ['fonts/']
        //   },
        //   {
        //     module: 'material-design-icons',
        //     entry: 'iconfont/material-icons.css',
        //     supplements: ['iconfont/']
        //   }
    //     ],
    //     outputPath: 'vendors',
    //     hash: true
    // }),
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              collapseWhitespace: false
          },
          hash: false
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()//,
    //   new CopyWebpackPlugin([
    //     {from: __dirname + '/bootstrap-rtl', to: __dirname + '/node_modules/bootstrap-rtl'},
    //     {from: __dirname + '/Scripts', to: __dirname + '/dist/web/Scripts'},
    //     {from: __dirname + '/jQuery', to: __dirname + '/dist/web/jQuery'},
    //     {from: __dirname + '/fav-icon', to: __dirname + '/dist/fav-icon'},
    //     {from: __dirname + '/node_modules/material-design-icons/iconfont', to: __dirname + '/dist/fonts'}
    //   ])
    ]
  }
}
