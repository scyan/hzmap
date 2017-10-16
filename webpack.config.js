var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var glob = require('glob'),
 srcPath = path.resolve(__dirname, './src');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');
function getDevEntry(cwd) {

    var entry = {};
    glob.sync('**/*.js', {cwd: cwd}).forEach(function (item, i) {
        var file = item.replace('.js', '');
        entry[file] = [
            cwd+'/'+item
        ];
    });
    return entry;
}

module.exports = {
  entry: getDevEntry(srcPath),
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "[name].js"
  },
  resolve: {
    extensions: [ '.js'],
    alias: {
      // lib: path.join(__dirname, 'src/lib'),
      // util: path.join(__dirname, 'src/util')
    }
  },
  module: {
    rules:  [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',

          query: {
            presets: ['es2015']
          }
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['raw-loader','postcss-loader','sass-loader']})
        }
    ]
  },
   plugins: [
     new ExtractTextPlugin({filename:'[name].css',allChunks:true}),
     new webpack.LoaderOptionsPlugin({
	    options: {
	      postcss: [
	        autoprefixer(),
	      ]
	     }
	  })
  ]
};