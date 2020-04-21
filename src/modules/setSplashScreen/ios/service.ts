import { addIosImageSetContents, EImageSetType } from '../../../services/ios/service';
import { generateResizedAssets } from '../../../services/image.processing';
import { config } from './config';
import { join } from 'path';
import { replaceInFile } from '../../../services/file.processing';
import { getNormalizedRGBAColors } from '../../../services/color.processing';
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
    setBackgroundColorToStoryBoard(backgroundColor);
    setNewSplashScreenFileRefInInfoPlist();
  } catch (err) {
    console.log(err);
  }
};

const setBackgroundColorToStoryBoard = (backgroundColor: string) => {
  const { red, green, blue, alpha } = getNormalizedRGBAColors(backgroundColor);
  replaceInFile(
    join(__dirname, `../../../../templates/ios/SplashScreen.storyboard`),
    `./ios/${config.iosStoryboardName}.storyboard`,
    [
      {
        oldContent: /<color.*key="backgroundColor".*\/>/g,
        newContent: `<color key="backgroundColor" red="${red}" green="${green}" blue="${blue}" alpha="${alpha}" colorSpace="custom" customColorSpace="sRGB"/>`,
      },
    ]
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
  const { multipliers, size } = config.iosSplashImage;
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
