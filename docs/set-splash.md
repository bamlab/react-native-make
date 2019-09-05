# Set the app splash screen

## Prerequisites

Install [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen)

In your JS application you need to hide the splashscreen like so :

```js
import SplashScreen from 'react-native-splash-screen';

// Do stuff and hide the splash when you want

SplashScreen.hide();
```

## Image requirements

- Use a `.png` to preserve background transparency
- Use a 3000px as min height and/or width
- Output will be
  - Rendered in "contain" mode which means it will fit both height and width while maintaining the 1:1 aspect ratio
  - Rendered with a 10dpi margin

## Generate both splash screen

- `react-native set-splash --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.  
  The background color defaults to white

## Generate iOS splashscreen

- `react-native set-splash --platform ios --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

## Generate Android splashscreen

- `react-native set-splash --platform android --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.
