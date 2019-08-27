# React-native-extra

# Description

react-native-extra is a plugin of react-native which generates icons and splashscreen.

# Setup

- install [react-native-make](../README.md) or pull latest version
- `cd react-native-make/packages/react-native-extra`
- `yarn link`
- launch a new project with `react-native init`
- Install [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen)
- in the package.json of your new project, in dependencies add "react-native-extra" : "0.0.1"
- in your project, `yarn link react-native-extra`

## To generate icons

- `react-native set-icon --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

For android, this command will generate the images in main directory : android/app/src/main/res.

## To generate icons on ios

- `react-native set-icon --platform ios --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- Format accepted : png and jpeg.

## To generate icons on android

- `react-native set-icon --platform android --path path-to-folder-with-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not recommended on ios.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

This command will generate the images in main directory : android/app/src/main/res.

From Android 8.0, we use android's adaptive icons. With a transparent picture, you can chose the color of the background with :

- `react-native set-icon --platform android --path path-to-folder-with-image --background color`  
  ⚠️ by default, on android, the background of a transparent image is white

## To generate your splash screen

⚠️ [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen) is a prerequisite to use this cli plugin.  
Install it before carrying on

- `react-native set-splash --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.  
  The background color defaults to white

## To generate your splash screen on ios

- `react-native set-splash --platform ios --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

## To generate your splash screen on android

- `react-native set-splash --platform android --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

### Additional mandatory steps

In your JS application you need to hide the splashscreen like so :

```js
import SplashScreen from 'react-native-splash-screen';

// Do stuff and hide the splash when you want

SplashScreen.hide();
```

## TODO :

- Write tests in Jest

- Centralize error codes. Improve the feedback given to the cli users.

- Force icon size to be at least 1024x1024 --> for the moment, it is written in readme and description

- Check if the image is transparent with sharp when using an icon on ios. To bloc users from using a transparent image on ios icon --> for the moment, it is written in readme and description

- Automatically install `react-native-splash-screen`

- Publish :)
