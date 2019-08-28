import { Command } from '@react-native-community/cli';
import { logo } from '../../logo';
import { EPlatform } from '../../services/type';
import { setSplashScreenTask } from './setSplashScreen.task';

const splashDesc =
  'Requirements : \n - react-native-splash-screen is a prerequisite to use this plugin';

export const setSplashScreenCommand: Command = {
  name: 'set-splash',
  func: setSplashScreenTask,
  description: logo + ' generate app splash screen',
  options: [
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
  ],
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
};
