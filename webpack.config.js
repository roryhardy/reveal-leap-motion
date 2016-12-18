const path = require('path');
const version = JSON.stringify(require('./package.json').version);

// Don't require webpack to be a dependency
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const header = `
  reveal-leap-motion v${version}
  https://github.com/gneatgeek/reveal-leap-motion

  Copyright 2016 Rory Hardy, James Sun, and other contributors
  Released under the Apache-2.0 license
  https://github.com/gneatgeek/reveal-leap-motion/blob/master/LICENSE
`.trim().replace(/^ +|"/gm, '');

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
  plugins: [
    new webpack.BannerPlugin(header),
  ],
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname),
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
