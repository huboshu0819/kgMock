
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, 'app.js');
var BUILD_PATH = path.resolve(__dirname, './build');


module.exports = {
   entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/dev-server',
    APP_PATH
  ],
  resolve: {
     extensions: [' ', '.js', '.json', '.scss'],
        alias: {
            'react': path.join(__dirname + "/node_modules", "/react/dist/react.min.js"),
            'react-dom': path.join(__dirname + "/node_modules", "/react-dom/dist/react-dom.min.js"),
        }
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot-loader', 'babel-loader', 'jsx-loader?harmony'],
      exclude: /node_modules/
    }]
  },
  plugins: [
        // 提取公共部分
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: "common.js"  //入口common生成的文件名称，如果不设置，默认为入口名称          
        // }),

    //     new HtmlwebpackPlugin({
    //         filename: 'index.html',
    //         hash: false,
    //         inject: "body",
    //         template: __dirname + '/template/index.tpl'
    //     }),

    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     }),

    //     new CopyWebpackPlugin([
    //         {from: path.join(__dirname, "/data.js"), to: path.join(__dirname, "../../build/newshare/data.js") }
    //     ]),

    //     new ExtractTextPlugin("[name]-[contenthash:6].css"),   //contenthash解决与js文件hash一致问题
    //     new WebpackMd5Hash(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
