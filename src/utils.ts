import { join } from 'path';

import { ANDROID_MAIN_PATH } from './modules/config';
import { readFile } from './services/file.processing';

const ANDROID_MAIN_MANIFEST_PATH = `${ANDROID_MAIN_PATH}/AndroidManifest.xml`;
const IOS_PODFILE_PATH = `./ios/Podfile`;

//Resort to read file content to fetch package value rather than adding package to parse xml/podfile
const ANDROID_PACKAGE_EXP = new RegExp(/package=\"(.+)\"/);
const IOS_PACKAGE_EXP = new RegExp(/target\s*["'](.+)['"]\s*do/);

function fetchFileLocation(filePath: string): string {
  return join(process.cwd(), filePath);
}

function getPackageFileName(platform: string): string {
  let packageName;
  switch (platform) {
    case 'android':
      const appBuildFile = readFile(fetchFileLocation(ANDROID_MAIN_MANIFEST_PATH)).toString();
      packageName = appBuildFile.match(ANDROID_PACKAGE_EXP)[1];
      packageName && packageName.toString();
      break;
    case 'ios':
      const podfile = readFile(fetchFileLocation(IOS_PODFILE_PATH)).toString();
      packageName = podfile.match(IOS_PACKAGE_EXP)[1];
      packageName && packageName.toString();
      break;
  }
  return packageName;
}

/**
 * Fetch Android package name by reading string content of main AndroidManifest.xml
 */
export function getAndroidPackageName(): string {
  return getPackageFileName('android');
}

/**
 * Convert extracted package name to uri by replacing
 * @param packageName Android module package name
 */
export function convertAndroidPackageNameToUri(packageName: string): string {
  return packageName.replace(new RegExp(/\./, 'g'), '/');
}

/**
 * Fetch Ios package name by reading string content of Podfile
 */
export function getIosPackageName(): string {
  return getPackageFileName('ios');
}
