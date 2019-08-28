# React Native Make

## Description

react-native-make is a plugin of react-native offers access to a set on everyday tools to facilitate React Native development

## Setup

```
yarn add -D @bam.tech/react-native-make
npm i -D @bam.tech/react-native-make
```

## To generate icons

- `react-native make set-icon --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

For android, this command will generate the images in main directory : android/app/src/main/res.

## To generate icons on ios

- `react-native make set-icon --platform ios --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- Format accepted : png and jpeg.

## To generate icons on android

- `react-native make set-icon --platform android --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

This command will generate the images in main directory : android/app/src/main/res.

From Android 8.0, we use android's adaptive icons. With a transparent picture, you can chose the color of the background with :

- `react-native make set-icon --platform android --path path-to-folder-with-image --background color`  
  ⚠️ by default, on android, the background of a transparent image is white

## To generate your splash screen

⚠️ [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen) is a prerequisite to use this cli plugin.  
Install it before carrying on

- `react-native make set-splash --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.  
  The background color defaults to white

## To generate your splash screen on ios

- `react-native make set-splash --platform ios --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

## To generate your splash screen on android

- `react-native make set-splash --platform android --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

### Additional mandatory steps

In your JS application you need to hide the splashscreen like so :

```js
import SplashScreen from 'react-native-splash-screen';

// Do stuff and hide the splash when you want

SplashScreen.hide();
```

## Local development

- Pull latest version
- `cd react-native-make`
- `yarn link`
- Launch a new project with `react-native init`
- Install [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen)
- In your React Native project, `yarn link @bam.tech/react-native-make`
- In the package.json of your React Native project, in dependencies add "@bam.tech/react-native-make" : "0.0.0"

## Disclaimer

_To better understand your usage of this tool, basic analytics have been enabled. It only records commands usage as anonymous page views and does not identify users in any way_
