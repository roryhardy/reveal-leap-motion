const path = require('path');

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
    filename: '[name].js',
    path: path.join(__dirname),
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
