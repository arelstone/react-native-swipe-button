# @arelstone/react-native-swipe-button

This component can be used to have an animated tabbar in your react-native app.
 
A lot of app use the swipe to complete. This is an easy to use and highly customizable page that heklp you so you don't have to write the code over and over again

![npm](https://shields.cdn.bka.li/npm/dt/@arelstone/react-native-swipe-button?style=for-the-badge)
![npm (scoped)](https://shields.cdn.bka.li/npm/v/@arelstone/react-native-swipe-button?label=version&style=for-the-badge)
![GitHub issues](https://shields.cdn.bka.li/github/issues/arelstone/react-native-swipe-button?style=for-the-badge)
![GitHub pull requests](https://shields.cdn.bka.li/github/issues-pr/arelstone/react-native-swipe-button?style=for-the-badge)

![@arelstone/react-native-swipe-button](https://raw.githubusercontent.com/arelstone/react-native-swipe-button/master/docs/example.gif)

## Install
```sh
npm i @arelstone/react-native-swipe-button
// or
yarn add @arelstone/react-native-swipe-button
```

## Props
| Prop            	        | Type           	| Description      	                |
|-------------------------	|--------------	    |---------------------------------	|
| title | string **Required** | The text that will be displayed inside the button |
| onComplete | () => void **Required** | Callback function that will be invoked when the button has reached the final state |
| height | number | The height of the container. Default 70 |
| width | number | The width of the container. Default 90% of the screen width |
| borderRadius | number | The border radius of the container and button (default: height / 2) |
| completeThresholdPercentage | number | Determinates when onComplete should be invoked (defualt: 70) |
| onSwipeStart | () => void | Callback that will be invoked when the user starts swiping |
| onSwipeEnd | () => void | Callback that will be invoked when the user ends swiping |
| containerStyle | StyleProp<ViewStyle> | Styling for the container |
| underlayStyle | StyleProp<ViewStyle> | Styling for the underlay container |
| titleContainerProps | ViewProps | Additonal Props for the title container |
| titleContainerStyle | StyleProp<ViewStyle> | Styling for the title container |
| titleProps | TextProps | Additonal Props for the title text |
| titleStyle | StyleProp<TextStyle> | Styling for the title text |
