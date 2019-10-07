import { Config } from '@react-native-community/cli';
import { IosSplashScreenService } from './ios/service';
import { EPlatform } from '../../services/type';
import { AndroidSplashScreenService } from './android/service';

export const setSplashScreenTask = async (
  argv: string[],
  config: Config,
  args: Record<string, any>
) => {
  const { path: imagePath, platform, background: backgroundColor, resize: resizeMode } = args;

  if (platform === EPlatform.IOS || platform === EPlatform.ALL) {
    const iosService = new IosSplashScreenService(config);
    await iosService.addIosSplashScreen(imagePath, backgroundColor, resizeMode);
  }

  if (platform === EPlatform.ANDROID || platform === EPlatform.ALL) {
    const androidService = new AndroidSplashScreenService(config);
    await androidService.addAndroidSplashScreen(imagePath, backgroundColor, resizeMode);
  }
};
