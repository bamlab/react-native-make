import { getHexColor } from '../../../services/color.processing';
import { applyPatch, copyFile, readFile, replaceInFile } from '../../../services/file.processing';
import { join } from 'path';
import { ANDROID_MAIN_PATH, ANDROID_MAIN_RES_PATH } from '../../config';
import { generateResizedAssets } from '../../../services/image.processing';
import { generatorConfig } from './config';
import { EResizeMode } from '../../../services/type';
import { Config } from '@react-native-community/cli';
import { OutputInfo } from 'sharp';

export class AndroidSplashScreenService {
  private _config: Config;

  public constructor(config: Config) {
    this._config = config;
  }

  public async addAndroidSplashScreen(
    imageSource: string,
    backgroundColor: string,
    resizeMode?: EResizeMode
  ): Promise<void> {
    try {
      this.addReactNativeSplashScreen(backgroundColor, resizeMode);
      await this.generateAndroidSplashImages(imageSource);
    } catch (err) {
      console.log(err);
    }
  }

  private async addLaunchScreenBackgroundColor(backgroundColor: string): Promise<void> {
    replaceInFile(
      join(__dirname, '../../../../templates/android/values/colors-splash.xml'),
      join(this._config.project.android.stringsPath, '../colors-splash.xml'),
      [
        {
          oldContent: /{{splashprimary}}/g,
          newContent: `${getHexColor(backgroundColor)}`,
        },
      ]
    );
  }

  private addReactNativeSplashScreen(
    backgroundColor: string,
    resizeMode: EResizeMode = EResizeMode.CONTAIN
  ): void {
    this.addLaunchScreenBackgroundColor(backgroundColor);

    copyFile(
      join(__dirname, '../../../../templates/android/drawable/splashscreen.xml'),
      join(this._config.project.android.assetsPath, '../res/drawable/splashscreen.xm')
    );
    copyFile(
      join(__dirname, `../../../../templates/android/layout/launch_screen.${resizeMode}.xml`),
      join(this._config.project.android.assetsPath, '../res/layout/launch_screen.xml')
    );
    applyPatch(join(this._config.project.android.stringsPath, '../styles.xml'), {
      pattern: /^.*<resources>.*[\r\n]/g,
      patch: readFile(join(__dirname, '../../../../templates/android/values/styles-splash.xml')),
    });

    const mainActivityPath = join(
      this._config.project.android.mainFilePath,
      '../MainActivity.java'
    );

    applyPatch(mainActivityPath, {
      pattern: /^(.+?)(?=import)/gs,
      patch: 'import android.os.Bundle;\n' + 'import org.devio.rn.splashscreen.SplashScreen;\n',
    });

    const onCreateRegExp = /^.*onCreate.*[\r\n]/gm;

    if (readFile(mainActivityPath).match(onCreateRegExp)) {
      applyPatch(mainActivityPath, {
        pattern: onCreateRegExp,
        patch: 'SplashScreen.show(this, R.style.SplashScreenTheme);',
      });
    } else {
      applyPatch(mainActivityPath, {
        pattern: /^.*MainActivity.*[\r\n]/gm,
        patch:
          '    @Override\n' +
          '    protected void onCreate(Bundle savedInstanceState) {\n' +
          '        SplashScreen.show(this, R.style.SplashScreenTheme);\n' +
          '        super.onCreate(savedInstanceState);\n' +
          '    }',
      });
    }
  }

  private generateAndroidSplashImages(imageSource: string): Promise<OutputInfo[]> {
    return Promise.all(
      generatorConfig.androidSplashImages.map(({ size, density }) =>
        generateResizedAssets(
          imageSource,
          join(
            this._config.project.android.assetsPath,
            `../res/drawable-${density}/splash_image.png`
          ),
          size,
          size,
          {
            fit: 'inside',
          }
        )
      )
    );
  }
}
