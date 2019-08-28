#!/usr/bin/env node
const { resolve } = require('path');
const { lstatSync } = require('fs');

const res = lstatSync(resolve('.', 'node_modules', 'react-native-make'));

if (res.isSymbolicLink()) {
  console.warn('Detected linked install of react-native-make, compiling at runtime...');
  require('ts-node').register({ project: resolve(__dirname, `tsconfig.json`) });
  const { rnPluginConfig } = require('./rn-plugin.config');

  module.exports = rnPluginConfig;
} else {
  require('ts-node').register({ project: resolve(__dirname, `tsconfig.json`) });
  const { rnPluginConfig } = require('./rn-plugin.config');

  module.exports = rnPluginConfig;
}
