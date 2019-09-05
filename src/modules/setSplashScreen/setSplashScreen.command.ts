import { Command } from '@react-native-community/cli';
import { logo } from '../../logo';
import { trackTask } from '../../services/analytics';
import { EPlatform, EResizeMode } from '../../services/type';
import { setSplashScreenTask } from './setSplashScreen.task';

export const setSplashScreenCommand: Command = {
  name: 'set-splash',
  func: trackTask('/set-splash', setSplashScreenTask),
  description: logo + ' generate app splash screen',
  options: [
    {
      name: '--path <string>',
      description: 'path to your image file (mandatory)',
    },
    {
      name: '--platform [type]',
      description: 'all, ios, android',
      default: EPlatform.ALL,
    },
    {
      name: '--resize [string]',
      description: 'contain, cover, center',
      default: EResizeMode.CONTAIN,
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
      cmd:
        'react-native set-splash --path <path-to-image>  --resize <cover|contain|center> --background "<background-color>"',
    },
    {
      desc: 'set the splash screen for iOS',
      cmd:
        'react-native set-splash --platform ios --path <path-to-image> --resize <cover|contain|center> --background "<background-color>"',
    },
    {
      desc: 'set the splash screen for Android',
      cmd:
        'react-native set-splash --platform android --path <path-to-image> --resize <cover|contain|center> --background "<background-color>"',
    },
  ],
};
