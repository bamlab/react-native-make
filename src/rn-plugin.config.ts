import { UserDependencyConfig } from '@react-native-community/cli';
import 'colors';
import { setIconCommand, setSplashScreenCommand } from './modules';
import { resolve } from 'path';
import { createBackwardCompatibleConfig } from './rn-compatibility-layer';

const v2Config: UserDependencyConfig = {
  commands: [setIconCommand, setSplashScreenCommand],
};

const rnCliVersion = require(resolve('.', 'node_modules/@react-native-community/cli/package.json'));
const isUsingV1 = !!rnCliVersion.version.match(/^[0-1]\./);

export const rnPluginConfig: any = isUsingV1 ? createBackwardCompatibleConfig(v2Config) : v2Config;
