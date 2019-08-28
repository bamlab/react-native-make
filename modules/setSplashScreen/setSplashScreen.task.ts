import { Config } from '@react-native-community/cli';
import { addIosSplashScreen } from './ios/service';
import { EPlatform } from '../../services/type';
import { addAndroidSplashScreen } from './android/service';

export const setSplashScreenTask = async (
  argv: string[],
  config: Config,
  args: Record<string, any>
) => {
  const { path: imagePath, platform, background: backgroundColor } = args;

  switch (platform) {
    case EPlatform.IOS:
      await addIosSplashScreen(imagePath, backgroundColor);
      break;
    case EPlatform.ANDROID:
      await addAndroidSplashScreen(imagePath, backgroundColor);
      break;
    case EPlatform.ALL:
      await addIosSplashScreen(imagePath, backgroundColor);
      await addAndroidSplashScreen(imagePath, backgroundColor);
      break;
    default:
      console.log("We don't support this platform yet");
      break;
  }
};
