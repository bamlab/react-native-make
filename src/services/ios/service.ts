import { join } from 'path';
import { copyFile } from '../file.processing';
import { getIosPackageName } from '../../utils';

export enum EImageSetType {
  IMAGE = 'imageset',
  ICON = 'appiconset',
}

export const addIosImageSetContents = (
  imageSetName: string,
  setType: EImageSetType = EImageSetType.ICON
) => {
  const iosImageFolder = `./ios/${getIosPackageName()}/Images.xcassets/${imageSetName}.${setType}`;
  copyFile(
    join(__dirname, `../../../templates/ios/${imageSetName}SetContents.json`),
    `${iosImageFolder}/Contents.json`
  );
  return iosImageFolder;
};
