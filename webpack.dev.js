/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/src/index.html.html' }],
    },
    // open: false,
    open: {
      app: {
        name: 'google-chrome',
      },
    },
  },
});
