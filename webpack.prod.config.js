const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-prod');

config.entry = {
  app: path.resolve(process.cwd(), './src/index'),
};

config.module.rules[0].exclude = /node_modules\/(?!(fastest-levenshtein|@edx))/;

config.output = {
  path: path.resolve(process.cwd(), './dist'),
  publicPath: '/',
};

config.resolve = {
  alias: {
    '@edx/frontend-component-footer': path.resolve(__dirname, '../frontend-component-footer/src'),
    '@edx/frontend-component-header': path.resolve(__dirname, '../frontend-component-header/src'),
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
};

module.exports = config;
