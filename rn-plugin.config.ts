import { setIconCommand, setSplashScreenCommand } from './modules';
import { UserDependencyConfigT } from './rn-plugin.types';
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

export const rnPluginConfig: UserDependencyConfigT = {
  commands: [
    {
      name: 'set-icon',
      func: setIconCommand,
      description:
        'Requirements : \n - image has to be square \n - formats accepted : png and jpeg \n - min size 1024x1024 \n - no transparent image for ios  \n - for android use adaptive icons guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783',
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
