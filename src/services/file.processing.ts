import { writeFileSync, readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname } from 'path';

export const readFile = (sourcePath: string) => readFileSync(sourcePath, 'utf8');

export const createDirectoryIfNotExists = (path: string) => {
  const directory = dirname(path);
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
};

export const copyFile = (sourcePath: string, destinationPath: string) => {
  createDirectoryIfNotExists(destinationPath);
  copyFileSync(sourcePath, destinationPath);
};

export const applyPatch = (
  path: string,
  { patch, pattern }: { patch: string; pattern: string | RegExp }
) => {
  if (!readFile(path).includes(patch)) {
    writeFileSync(path, readFileSync(path, 'utf8').replace(pattern, match => `${match}${patch}`));
  }
};

export const applyPatchByMatchedGroups = (
  path: string,
  patch: { patch: string; pattern: string | RegExp }
) => {
  writeFileSync(path, readFileSync(path, 'utf8').replace(patch.pattern, patch.patch));
};

export const replaceInFile = (
  sourcePath: string,
  destinationPath: string,
  replacements: { newContent: string; oldContent: string | RegExp }[]
) => {
  createDirectoryIfNotExists(destinationPath);
  let fileContent = readFileSync(sourcePath, 'utf8');
  replacements.forEach(({ oldContent, newContent }) => {
    fileContent = fileContent.replace(oldContent, newContent);
  });
  writeFileSync(destinationPath, fileContent);
};
