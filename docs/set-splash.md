# Set the app splash screen

⚠️ [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen) is a prerequisite to use this cli plugin.  
Install it before carrying on

- `react-native set-splash --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.  
  The background color defaults to white

## Additional mandatory steps

In your JS application you need to hide the splashscreen like so :

```js
import SplashScreen from 'react-native-splash-screen';

// Do stuff and hide the splash when you want

SplashScreen.hide();
```

## Generate iOS splashscreen

- `react-native set-splash --platform ios --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.

## Generate Android splashscreen

- `react-native set-splash --platform android --path path-to-folder-with-image --background background-color`  
  ⚠️ The path option is mandatory.
