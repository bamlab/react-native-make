#!/usr/bin/env node
const { resolve } = require('path');
require('ts-node').register({ project: resolve(__dirname, `tsconfig.json`) });
const { rnPluginConfig } = require('./rn-plugin.config');

module.exports = rnPluginConfig;
