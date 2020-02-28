import { UserDependencyConfig } from '@react-native-community/cli';
import 'colors';
import { setIconCommand, setSplashScreenCommand } from './modules';

const v2Config: UserDependencyConfig = {
  commands: [setIconCommand, setSplashScreenCommand],
};

export const rnPluginConfig: any = v2Config;
