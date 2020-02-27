import { join } from 'path';

import { ANDROID_MAIN_PATH } from '../config';
import { readFile } from '../../services/file.processing';

// const ANDROID_APP_PATH = './android/app';
// const ANDROID_APP_BUILD_PATH = `${ANDROID_APP_PATH}/build.gradle`; //considered feteching package naem fron module build.gradle

const ANDROID_MAIN_MANIFEST_PATH = `${ANDROID_MAIN_PATH}/AndroidManifest.xml`;

//Choosing to read file content to fetch package value rather than adding package to parse xml
const ANDROID_PACKAGE_EXP = new RegExp(/package\s*=\s*\"(.+)\"/);

function fetchFileLocation(file: string): string {
  let filePath;
  switch (file) {
    case 'ANDROID_MANIFEST_PATH':
      filePath = ANDROID_MAIN_MANIFEST_PATH;
      break;
  }
  return join(process.cwd(), filePath);
}

/**
 * Fetch Android package name by reading string content of main AndroidManifest.xml
 */
export function getAndroidPackageName(): string {
  const appBuildFile = readFile(fetchFileLocation('ANDROID_MANIFEST_PATH')).toString();
  return appBuildFile.match(ANDROID_PACKAGE_EXP)[1].toString();
}

/**
 * Convert extracted package name to uri by replacing
 * @param packageName Android module package name
 */
export function convertAndroidPackageNameToUri(packageName: string): string {
  return packageName.replace(new RegExp(/./, 'g'), '/');
}
