const path = require('path');
const { createConfig } = require('@edx/frontend-build');
const config = createConfig('webpack-prod');

config.cache = { type: 'filesystem' }; // This isn't needed but really speeds up rebuilds!

config.experiments = {
  topLevelAwait: true
}

config.module.rules[0].exclude = /node_modules\/(?!(fastest-levenshtein|@edx))/;

config.resolve = {
  alias: {},
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.config'],
  preferRelative: true,
  symlinks: true,
};

module.exports = config;
