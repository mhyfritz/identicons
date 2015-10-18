var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: __dirname + '/src/index.js',
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
        ],
        include: __dirname + '/src/'
      },
      {
        test: /\.js/,
        loaders: ['babel-loader'],
        include: __dirname + '/src/'
      }
    ]        
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
};
