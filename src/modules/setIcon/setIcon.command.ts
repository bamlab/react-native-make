import { Command } from '@react-native-community/cli';
import { logo } from '../../logo';
import { trackTask } from '../../services/analytics';
import { EPlatform } from '../../services/type';
import { setIconTask } from './setIcon.task';

export const setIconCommand: Command = {
  name: 'set-icon',
  func: trackTask('/set-icon', setIconTask),
  description: logo + ' generate app icons',
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
      desc: 'set the app icon for both devices',
      cmd:
        'react-native set-icon --path <path-to-image> --background <background-color-for-android>',
    },
    {
      desc: 'set the app icon for iOS',
      cmd: 'react-native set-icon --platform ios --path <path-to-image>',
    },
    {
      desc: 'set the app icon for both devices',
      cmd:
        'react-native set-icon --platform android --path <path-to-image> --background <background-color>',
    },
  ],
};
