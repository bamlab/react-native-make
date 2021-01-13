import { getHexColor } from '../../../services/color.processing';
import { replaceInFile } from '../../../services/file.processing';
import { join } from 'path';
import { ANDROID_MAIN_RES_PATH } from '../../config';
import { generateResizedAssets } from '../../../services/image.processing';
import { config } from './config';

export const addAndroidSplashScreen = async (
  imageSource: string,
  backgroundColor: string,
) => {
  try {
    addLaunchScreenBackgroundColor(backgroundColor);
    await generateAndroidSplashImages(imageSource);
  } catch (err) {
    console.log(err);
  }
};

const addLaunchScreenBackgroundColor = (backgroundColor: string) => {
  replaceInFile(
    join(__dirname, '../../../../templates/android/values/colors-splash.xml'),
    `${ANDROID_MAIN_RES_PATH}/values/colors-splash.xml`,
    [
      {
        oldContent: /{{splashprimary}}/g,
        newContent: `${getHexColor(backgroundColor)}`,
      },
    ]
  );
};

const generateAndroidSplashImages = (imageSource: string) =>
  Promise.all(
    config.androidSplashImages.map(({ size, density }) =>
      generateResizedAssets(
        imageSource,
        `${ANDROID_MAIN_RES_PATH}/drawable-${density}/splash_image.png`,
        size,
        size,
        {
          fit: 'inside',
        }
      )
    )
  );
