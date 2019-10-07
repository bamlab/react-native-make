import { addIosImageSetContents, EImageSetType } from '../../../services/ios/service';
import { generateResizedAssets } from '../../../services/image.processing';
import { generatorConfig } from './config';
import { join } from 'path';
import {
  applyPatch,
  applyPatchByMatchedGroups,
  readFile,
  replaceInFile,
} from '../../../services/file.processing';
import { getNormalizedRGBAColors } from '../../../services/color.processing';
import { EResizeMode } from '../../../services/type';
import { Config } from '@react-native-community/cli';
import { OutputInfo } from 'sharp';

export class IosSplashScreenService {
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  public async addIosSplashScreen(
    imageSource: string,
    backgroundColor: string,
    resizeMode?: EResizeMode
  ): Promise<void> {
    try {
      this.addSplashScreenXib(backgroundColor, resizeMode);
      this.configureSplashScreen();
      const iosSplashImageFolder = addIosImageSetContents('SplashImage', EImageSetType.IMAGE);
      await this.generateIosSplashImages(imageSource, iosSplashImageFolder);
    } catch (err) {
      console.log(err);
    }
  }

  private configureSplashScreen(): void {
    const packageJson = require(join(process.cwd(), './package'));
    const appDelegatePath = `./ios/${packageJson.name}/AppDelegate.m`;
    applyPatch(appDelegatePath, {
      pattern: /^(.+?)(?=\#import)/gs,
      patch: '#import "RNSplashScreen.h"\n',
    });
    const showRNSplashScreen = '[RNSplashScreen show];';
    if (!readFile(appDelegatePath).includes(showRNSplashScreen)) {
      applyPatchByMatchedGroups(appDelegatePath, {
        pattern: /(didFinishLaunchingWithOptions.*)(\n *return YES)/gs,
        patch: `$1\n  ${showRNSplashScreen}$2`,
      });
    }
  }

  private addSplashScreenXib(
    backgroundColor: string,
    resizeMode: EResizeMode = EResizeMode.CONTAIN
  ): void {
    const { red, green, blue, alpha } = getNormalizedRGBAColors(backgroundColor);
    const packageJson = require(join(process.cwd(), './package'));

    replaceInFile(
      join(__dirname, `../../../../templates/ios/LaunchScreen.${resizeMode}.xib`),
      `./ios/${packageJson.name}/Base.lproj/LaunchScreen.xib`,
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
  }

  private generateIosSplashImages(
    imageSource: string,
    iosSplashImageFolder: string
  ): Promise<OutputInfo[]> {
    const { multipliers, size, backgroundColor } = generatorConfig.iosSplashImage;
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
  }
}
