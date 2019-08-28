#!/usr/bin/env node
const { resolve } = require('path');
const { lstatSync } = require('fs');

const res = lstatSync(resolve('.', 'node_modules', 'react-native-make'));

/**
 * For faster development workflow, when npm linked
 * we want this library to be transpiled at runtime using the ts-node resolver
 */
if (res.isSymbolicLink()) {
  console.warn('Detected linked install of react-native-make, compiling at runtime...');
  require('ts-node').register({ project: resolve(__dirname, `tsconfig.json`) });
  const { rnPluginConfig } = require('./src/rn-plugin.config');

  module.exports = rnPluginConfig;
} else {
  module.exports = require('./dist/rn-plugin.config');
}
