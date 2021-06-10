import React, { ReactNode } from "react";
import {
  Animated,
  GestureResponderHandlers,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SwipeButtonCommonProps } from "./SwipeButton";

export interface SwipeButtonCircleProps extends SwipeButtonCommonProps {
  /**
   * GestureHandlers for when swiping the button
   */
  panHandlers: GestureResponderHandlers;

  /**
   * Opacity of the element
   */
  opacity?: number;

  /**
   * Element that should be displaied inside the button
   */
  Icon: ReactNode;

  /**
   * Determinates the value of the button
   */
  translateX: Animated.Value;

  /**
   * Styling for the outer container
   */
  iconContainerStyle?: StyleProp<ViewStyle>;
}

const SwipeButtonCircle = ({
  Icon,
  panHandlers,
  translateX,
  height,
  borderRadius,
  iconContainerStyle,
}: SwipeButtonCircleProps) => (
  <Animated.View
    testID="Button"
    {...panHandlers}
    style={[
      styles.iconContainer,
      {
        height,
        borderRadius,
        transform: [{ translateX }],
      },
      iconContainerStyle,
    ]}
  >
    <Animated.View
      testID="IconContainer"
      style={[
        styles.innerIconContainer,
        {
          width: height,
          height,
          borderRadius,
        },
      ]}
    >
      {Icon}
    </Animated.View>
  </Animated.View>
);

export default SwipeButtonCircle;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    backgroundColor: "#e9ff6b",
    alignItems: "center",
    justifyContent: "center",
  },
  innerIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
