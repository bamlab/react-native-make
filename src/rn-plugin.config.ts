import { UserDependencyConfig } from '@react-native-community/cli';
import 'colors';
import { setIconCommand, setSplashScreenCommand } from './modules';

export const rnPluginConfig: UserDependencyConfig = {
  commands: [setIconCommand, setSplashScreenCommand],
};
