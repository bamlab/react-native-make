import { UserDependencyConfig } from '@react-native-community/cli';
import 'colors';
import { setIconCommand, setSplashScreenCommand } from './modules';
import { resolve } from 'path';
import { createBackwardCompatibleConfig } from './rn-compatibility-layer';

function getRNCliPackageFile() {
  try {
    // Yarn module resolution
    return require(resolve('.', 'node_modules/@react-native-community/cli/package.json'));
  } catch {
    // NPM module resolution
    return require(resolve(
      '.',
      'node_modules/react-native/node_modules/@react-native-community/cli/package.json'
    ));
  }
}

const v2Config: UserDependencyConfig = {
  commands: [setIconCommand, setSplashScreenCommand],
};

const rnCliVersion = getRNCliPackageFile();

const isUsingV1 = !!rnCliVersion.version.match(/^[0-1]\./);

export const rnPluginConfig: any = isUsingV1 ? createBackwardCompatibleConfig(v2Config) : v2Config;
