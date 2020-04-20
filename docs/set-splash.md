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
- **3000px** as min height and/or width
- For **cover** splashscreens, preserve a 1/3 padding for important content to avoid clipping a Logo or Text

## Resize modes

We offer 3 types of Splashcreen image resize modes:

|         Resize Mode | Rules                                                             | Example                                         |
| ------------------: | ----------------------------------------------------------------- | ----------------------------------------------- |
| (default) `contain` | Use max width / height without cropping,<br>The image is centered | <img src="./assets/splash-example.contain.png"> |
|             `cover` | Use max width / height with cropping,<br>The image is centered    | <img src="./assets/splash-example.cover.png">   |
|            `center` | Use image width / height,<br>The image is centered                | <img src="./assets/splash-example.center.png">  |

## Generate both splash screen

- open your file `myProject.xcworkspace` in XCode
- right-click on your project folder > "New file..." > "Launch Screen" > "Save as: SplashScreen"
- `react-native set-splash --path <path-to-image> --resize <[contain]|cover|center> --background "<background-color>"`  
  ⚠️ The path option is mandatory.  
  The background color defaults to white

## Generate iOS splashscreen

- open your file `myProject.xcworkspace` in XCode
- right-click on your project folder > "New file..." > "Launch Screen" > "Save as: SplashScreen"
- `react-native set-splash --platform ios --path <path-to-image>`

## Generate Android splashscreen

- `react-native set-splash --platform android --path <path-to-image> --resize <[contain]|cover|center> --background ">background-color>"`  
  ⚠️ The path option is mandatory.
