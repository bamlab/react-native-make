import { join } from 'path';
import { copyFile } from '../file.processing';

export enum EImageSetType {
  IMAGE = 'imageset',
  ICON = 'appiconset',
}

export const addIosImageSetContents = (
  imageSetName: string,
  setType: EImageSetType = EImageSetType.ICON
) => {
  const packageJson = require(join(process.cwd(), './package'));
  const iosImageFolder = `./ios/${packageJson.name}/Images.xcassets/${imageSetName}.${setType}`;
  copyFile(
    join(__dirname, `../../../templates/ios/${imageSetName}SetContents.json`),
    `${iosImageFolder}/Contents.json`
  );
  return iosImageFolder;
};
