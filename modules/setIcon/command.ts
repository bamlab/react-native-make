import { addIosIcon } from './ios/service';
import { addAndroidIcon } from './android/service';
import { ConfigT } from '../../rn-plugin.types';
import { EPlatform } from '../../services/type';

export const setIconCommand = async (
  argv: string[],
  config: ConfigT,
  args: Record<string, any>
) => {
  const { path, platform, background } = args;
  switch (platform) {
    case EPlatform.IOS:
      await addIosIcon(path);
      break;
    case EPlatform.ANDROID:
      await addAndroidIcon(path, background);
      break;
    case EPlatform.ALL:
      await addIosIcon(path);
      await addAndroidIcon(path, background);
      break;
    default:
      console.log("We don't support this platform yet");
      break;
  }
};
