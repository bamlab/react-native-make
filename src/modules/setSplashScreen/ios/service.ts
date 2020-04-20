import { addIosImageSetContents, EImageSetType } from '../../../services/ios/service';
import { generateResizedAssets } from '../../../services/image.processing';
import { config } from './config';
import { join } from 'path';
import { replaceInFile, copyFile } from '../../../services/file.processing';
import { EResizeMode } from '../../../services/type';
import { getIosPackageName } from '../../../utils';

export const addIosSplashScreen = async (
  imageSource: string,
  backgroundColor: string,
  resizeMode?: EResizeMode
) => {
  try {
    const iosSplashImageFolder = addIosImageSetContents('SplashImage', EImageSetType.IMAGE);
    await generateIosSplashImages(imageSource, iosSplashImageFolder);
    copyStoryBoardToProject();
    setNewSplashScreenFileRefInInfoPlist();
  } catch (err) {
    console.log(err);
  }
};

const copyStoryBoardToProject = () => {
  copyFile(
    join(__dirname, `../../../../templates/ios/SplashScreen.storyboard`),
    `./ios/${config.iosStoryboardName}.storyboard`
  );
};

const setNewSplashScreenFileRefInInfoPlist = () => {
  const infoPlistPath = `./ios/${getIosPackageName()}/Info.plist`;
  const UILaunchStoryboardNamePattern = /(<key>UILaunchStoryboardName<\/key>[ \t\n]*<string>)[a-zA-Z]+(<\/string>)/g;
  replaceInFile(infoPlistPath, infoPlistPath, [
    {
      oldContent: UILaunchStoryboardNamePattern,
      newContent: `$1${config.iosStoryboardName}$2`,
    },
  ]);
};

const generateIosSplashImages = (imageSource: string, iosSplashImageFolder: string) => {
  const { multipliers, size, backgroundColor } = config.iosSplashImage;
  return Promise.all(
    multipliers.map(multiplier =>
      generateResizedAssets(
        imageSource,
        `${iosSplashImageFolder}/splash@${multiplier}x.png`,
        size * multiplier,
        size * multiplier,
        {
          fit: 'inside',
        }
      )
    )
  );
};
