const version = JSON.stringify(require('./package.json').version);
const webpack = require('webpack');

const banner = `
  reveal-leap-motion v${version}
  https://github.com/gneatgeek/reveal-leap-motion

  Copyright 2016 Rory Hardy, James Sun, and other contributors
  Released under the Apache-2.0 license
  https://github.com/gneatgeek/reveal-leap-motion/blob/master/LICENSE

  ===================================================================

  LeapJS v0.6.4
  http://github.com/leapmotion/leapjs/

  Copyright 2013 LeapMotion, Inc. and other contributors
  Released under the Apache-2.0 license
  http://github.com/leapmotion/leapjs/blob/master/LICENSE.txt  
`.trim().replace(/^ +|"/gm, '');

module.exports = {
  entry: {
    'reveal-leap-motion': './src',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  output: {
    filename: '[name].min.js',
    path: __dirname,
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
};
