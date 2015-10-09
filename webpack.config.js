module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.js/,
        loaders: ['babel-loader'],
        include: __dirname + '/index.js'
      }
    ]        
  }
};
