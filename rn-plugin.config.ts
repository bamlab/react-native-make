import { setIconTask, setSplashScreenCommand } from './modules';
import { UserDependencyConfig } from '@react-native-community/cli';
import { EPlatform } from './services/type';

const options = [
  {
    name: '--path <string>',
    description: 'path to your image file (mandatory)',
  },
  {
    name: '--platform [type]',
    description: 'ios or android (optional)',
    default: EPlatform.ALL,
  },
  {
    name: '--background [string]',
    description: 'background color (optional)',
    default: '#ffffff',
  },
];

export const rnPluginConfig: UserDependencyConfig = {
  commands: [
    {
      name: 'set-icon',
      func: setIconTask,
      options,
    },
    {
      name: 'set-splash',
      func: setSplashScreenCommand,
      description:
        'Requirements : \n - react-native-splash-screen is a prerequisite to use this plugin',
      options,
    },
  ],
};
