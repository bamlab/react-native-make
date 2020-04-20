import { addIosImageSetContents, EImageSetType } from '../../../services/ios/service';
import { generateResizedAssets } from '../../../services/image.processing';
import { config } from './config';
import { join } from 'path';
import {
  applyPatch,
  applyPatchByMatchedGroups,
  readFile,
  replaceInFile,
} from '../../../services/file.processing';
import { getNormalizedRGBAColors } from '../../../services/color.processing';
import { EResizeMode } from '../../../services/type';
import { getIosPackageName } from '../../../utils';

export const addIosSplashScreen = async (
  imageSource: string,
  backgroundColor: string,
  resizeMode?: EResizeMode
) => {
  try {
    // addSplashScreenXib(backgroundColor, resizeMode);
    // configureSplashScreen();
    const iosSplashImageFolder = addIosImageSetContents('SplashImage', EImageSetType.IMAGE);
    await generateIosSplashImages(imageSource, iosSplashImageFolder);
  } catch (err) {
    console.log(err);
  }
};

// const configureSplashScreen = () => {
//   const appDelegatePath = `./ios/${getIosPackageName()}/AppDelegate.m`;
//   applyPatch(appDelegatePath, {
//     pattern: /^(.+?)(?=\#import)/gs,
//     patch: '#import "RNSplashScreen.h"\n',
//   });
//   const showRNSplashScreen = '[RNSplashScreen show];';
//   if (!readFile(appDelegatePath).includes(showRNSplashScreen)) {
//     applyPatchByMatchedGroups(appDelegatePath, {
//       pattern: /(didFinishLaunchingWithOptions.*)(\n *return YES)/gs,
//       patch: `$1\n  ${showRNSplashScreen}$2`,
//     });
//   }
// };

};

const addSplashScreenXib = (
  backgroundColor: string,
  resizeMode: EResizeMode = EResizeMode.CONTAIN
) => {
  const { red, green, blue, alpha } = getNormalizedRGBAColors(backgroundColor);

  replaceInFile(
    join(__dirname, `../../../../templates/ios/LaunchScreen.${resizeMode}.xib`),
    `./ios/${getIosPackageName()}/Base.lproj/LaunchScreen.xib`,
    [
      {
        oldContent: /{{background-rgba-red}}/g,
        newContent: `${red}`,
      },
      {
        oldContent: /{{background-rgba-green}}/g,
        newContent: `${green}`,
      },
      {
        oldContent: /{{background-rgba-blue}}/g,
        newContent: `${blue}`,
      },
      {
        oldContent: /{{background-rgba-alpha}}/g,
        newContent: `${alpha}`,
      },
    ]
  );
};

// const addSplashScreenXib = (
//   backgroundColor: string,
//   resizeMode: EResizeMode = EResizeMode.CONTAIN
// ) => {
//   const { red, green, blue, alpha } = getNormalizedRGBAColors(backgroundColor);

//   replaceInFile(
//     join(__dirname, `../../../../templates/ios/LaunchScreen.${resizeMode}.xib`),
//     `./ios/${getIosPackageName()}/Base.lproj/LaunchScreen.xib`,
//     [
//       {
//         oldContent: /{{background-rgba-red}}/g,
//         newContent: `${red}`,
//       },
//       {
//         oldContent: /{{background-rgba-green}}/g,
//         newContent: `${green}`,
//       },
//       {
//         oldContent: /{{background-rgba-blue}}/g,
//         newContent: `${blue}`,
//       },
//       {
//         oldContent: /{{background-rgba-alpha}}/g,
//         newContent: `${alpha}`,
//       },
//     ]
//   );
// };

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
