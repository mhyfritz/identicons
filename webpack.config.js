var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js/,
        loaders: ['babel-loader'],
        include: __dirname + '/index.js'
      }
    ]        
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
};
