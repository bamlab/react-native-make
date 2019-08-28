import { config } from './config';
import { addIosImageSetContents } from '../../../services/ios/service';
import { checkImageIsSquare, generateResizedAssets } from '../../../services/image.processing';

export const addIosIcon = async (iconSource: string) => {
  try {
    await checkImageIsSquare(iconSource);
    const iosIconFolder = addIosImageSetContents('AppIcon');
    await generateIosIcons(iconSource, iosIconFolder);
  } catch (err) {
    console.log(err);
  }
};

const generateIosIcons = (iconSource: string, iosIconFolder: string) =>
  Promise.all(
    config.iosIconSizes.map(size =>
      Promise.all(
        size.multipliers.map(multiplier =>
          generateResizedAssets(
            iconSource,
            `${iosIconFolder}/icon-${size.size}@${multiplier}x.png`,
            size.size * multiplier
          )
        )
      )
    )
  );
