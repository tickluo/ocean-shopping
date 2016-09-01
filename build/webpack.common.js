const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'title',
  baseUrl: '/'
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /**
   * Static metadata for index.html
   */
  metadata: METADATA,

  entry: {
    'polyfills': 'babel-polyfill',
    'main': './src/main.js'
  },

  resolve: {

    extensions: ['', '.js', '.css', '.vue', '.json'],

    // Make sure root is src
    root: helpers.root('src'),
    alias: {
      'components': 'src'
      /*'styles': paths.client('themes/default')*/
    },
    // remove other default values
    modulesDirectories: ['node_modules'],

  },

  module: {

    preLoaders: [

      {
        test: /\.js$/,
        loader: 'source-map-loader!eslint-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules'),
        ]
      }

    ],

    loaders: [

      {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.vue$/,
        loader: 'vue'
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.styl$/,
        loader: 'style!css!stylus'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!less")
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!less")
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|otf|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'images/[hash:16].[ext]?[name]'
        }
      }
    ]

  },

  plugins: [
    new ExtractTextPlugin("index.css"),

    new webpack.optimize.OccurenceOrderPlugin(true),

    //new webpack.optimize.CommonsChunkPlugin({
    //  name: helpers.reverse(['polyfills', 'vendor'])
    //}),

    new CopyWebpackPlugin([{
      from: 'src/asset',
      to: 'asset'
    }]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      //chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'main']),
      chunksSortMode: 'dependency'
    })

    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    // })
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
