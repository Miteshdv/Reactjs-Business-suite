var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
      'webpack-hot-middleware/client',
    './index'
  ],
  resolve:{
      extensions:['','.js','.json']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()     
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/       
      },
      {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel',

         query: {
            presets: ['es2015', 'react']
         }
      },
      { 
         
         test: /\.css$/, loader: "style-loader!css-loader" 
      }, 
      { 
         
         test: /\.less$/, loader: "style-loader!css-loader!less-loader" 
      },   
      { 
         
         test: /\.gif$/, loader: "url-loader?mimetype=image/png" 

      },  
     { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      
   
    ]
  }
}
