var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var commonLoaders = [
    { test: /\.js$/, loader: "jsx-loader" },
    { test: /\.png$/, loader: "url-loader" },
    { test: /\.jpg$/, loader: "file-loader" },
];
var assetsPath = path.join(__dirname, "assets");
var publicPath = "ppmobile/assets/";

var component = function(entry,isUseZepto){
    var _opt = {
        entry: {
            app: ['./ppmobile/app/'+entry]
        },
        output: {
            path: path.join(__dirname, 'ppmobile/assets'),
            filename: entry,
            publicPath: publicPath
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader!css-loader")},
                { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css!autoprefixer!sass")},
                { test: /\.js$/, loader: "jsx-loader" },
                { test: /\.html$/, loader: "handlebars-loader" }, //模板打包
            ]
        }
    }
    if(isUseZepto){
        _opt.plugins = [
            //new webpack.ProvidePlugin({
            //    $: "webpack-zepto"
            //}),
            new ExtractTextPlugin("pp-mobile.css")
        ]
    }
    return _opt;
};
module.exports = [
    component("pp-mobile.js",true)
];

