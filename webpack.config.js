const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'reveal-leap-motion': path.join(__dirname, 'src', 'reveal-leap-motion'),
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname),
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
};
