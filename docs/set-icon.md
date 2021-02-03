# Set the app icon

`react-native set-icon --path path-to-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not allowed on both plarforms.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

For android, this command will generate the images in main directory : `android/app/src/main/res`.

## Generate iOS icons

- `react-native set-icon --platform ios --path path-to-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not allowed on ios.
- Minimum size of the image is 1024x1024.
- Format accepted : png and jpeg.

## Generate Android icons

- `react-native set-icon --platform android --path path-to-image`

⚠️ Requirements :

- The path option is mandatory.
- The image has to be square.
- Don't use a transparent image. Not allowed on android.
- Minimum size of the image is 1024x1024.
- It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
- Format accepted : png and jpeg.

This command will generate the images in main directory : `android/app/src/main/res`.

From Android 8.0, we use android's adaptive icons. With a transparent picture, you can chose the color of the background with :

- `react-native set-icon --platform android --path path-to-image --background color`  
  ⚠️ by default, on android, the background of a transparent image is white
