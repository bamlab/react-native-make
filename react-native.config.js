#!/usr/bin/env node
const { resolve } = require('path');
const { lstatSync } = require('fs');

/**
 * For faster development workflow, when npm linked
 * we want this library to be transpiled at runtime using the ts-node resolver
 */
const res = lstatSync(resolve('.', 'node_modules', '@bam.tech', 'react-native-make'));
if (res.isSymbolicLink()) {
  console.warn('Detected linked install of react-native-make, compiling at runtime...');
  require('ts-node').register({ project: resolve(__dirname, `tsconfig.json`) });
  module.exports = require('./src/rn-plugin.config').rnPluginConfig;
} else {
  module.exports = require('./dist/rn-plugin.config.js').rnPluginConfig;
}
