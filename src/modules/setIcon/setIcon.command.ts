import { Command } from '@react-native-community/cli';
import { logo } from '../../logo';
import { EPlatform } from '../../services/type';
import { setIconTask } from './setIcon.task';

const iconDesc =
  'Requirements : \n - image has to be square \n - formats accepted : png and jpeg \n - min size 1024x1024 \n - no transparent image for ios  \n - for android use adaptive icons guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783';

export const setIconCommand: Command = {
  name: 'set-icon',
  func: setIconTask,
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
