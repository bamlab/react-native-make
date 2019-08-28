import 'colors';
import { setSplashScreenTask, setIconCommand } from './modules';
import { UserDependencyConfig } from '@react-native-community/cli';
import { EPlatform } from './services/type';
import { logo } from './logo';

const options = [
  {
    name: '--path <string>',
    description: 'path to your image file (mandatory)',
  },
  {
    name: '--platform [type]',
    description: 'ios or android',
    default: EPlatform.ALL,
  },
  {
    name: '--background [string]',
    description: 'background color',
    default: '#ffffff',
  },
];

const splashDesc =
  'Requirements : \n - react-native-splash-screen is a prerequisite to use this plugin';

export const rnPluginConfig: UserDependencyConfig = {
  commands: [
    setIconCommand,
    {
      name: 'set-splash',
      func: setSplashScreenTask,
      description: logo + ' generate app splash screen',
      options,
      examples: [
        {
          desc: 'set the splash screen for both devices',
          cmd: 'react-native set-splash --path <path-to-image> --background <background-color>',
        },
        {
          desc: 'set the splash screen for iOS',
          cmd:
            'react-native set-splash --platform ios --path <path-to-image> --background <background-color>',
        },
        {
          desc: 'set the splash screen for Android',
          cmd:
            'react-native set-splash --platform android --path <path-to-image> --background <background-color>',
        },
      ],
    },
  ],
};
