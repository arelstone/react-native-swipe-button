import React, { useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import SwipeButtonCircle, { SwipeButtonCircleProps } from "./SwipeButtonCircle";
import SwipeButtonText, { SwipeButtonTextProps } from "./SwipeButtonText";

export type SwipeButtonPropsExtends = SwipeButtonCommonProps &
  Omit<SwipeButtonCircleProps, "opacity" | "panHandlers" | "translateX"> &
  SwipeButtonTextProps;

interface SwipeButtonProps extends SwipeButtonPropsExtends {
  /**
   * Callback that will be invoked when complete threshold has been reached
   */
  onComplete: () => void;

  /**
   * The width of the button
   *
   * @default 100% of the screen width
   */
  width?: string;

  /**
   * If disabled is set to true it will not be possible to interace with the button
   */
  disabled?: boolean;

  /**
   * Indicates when `onComplete` should be invoked.
   *
   * @default 100
   */
  completeThresholdPercentage?: number;

  /**
   * Callback that will be invoked when the suer starts swiping
   */
  onSwipeStart?: () => void;

  /**
   * Callback that will be invoked when the suer ends swiping
   */
  onSwipeEnd?: () => void;

  /**
   * The styling of the underlay container
   */
  underlayStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for the outer container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for the icon container
   */
  iconContainerStyle?: StyleProp<ViewStyle>;
}

export type SwipeButtonCommonProps = {
  /**
   * The height of the button
   * @default 70
   */
  height?: number;

  /**
   * The border radius of the container and the Icon
   *
   * @default 100
   */
  borderRadius?: number;
};

const DEFAULT_HEIGHT = 70;
const DEFAULT_BORDER_RADIUS = 100;
const DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE = 100;

const SwipeButton = ({
  height = DEFAULT_HEIGHT,
  borderRadius = DEFAULT_BORDER_RADIUS,
  title,
  titleContainerProps,
  titleProps,
  titleContainerStyle,
  titleStyle,
  completeThresholdPercentage = DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE,
  underlayStyle,
  disabled,
  Icon,
  iconContainerStyle,
  containerStyle,
  onComplete,
  onSwipeEnd = () => {},
  onSwipeStart = () => {},
}: SwipeButtonProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [endReached, setEndReached] = useState<boolean>(false);
  const opacity = disabled ? 0.5 : 1;
  const [translateX] = useState<Animated.Value>(new Animated.Value(0));
  const scrollDistance =
    dimensions.width - completeThresholdPercentage / 100 - dimensions.height;
  const completeThreshold =
    scrollDistance * (completeThresholdPercentage / 100);

  const onLayoutContainer = async (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const animateToStart = () => {
    Animated.spring(translateX, {
      toValue: 0,
      tension: 10,
      friction: 5,
      useNativeDriver: false,
    }).start();

    return setEndReached(false);
  };

  const animateToEnd = () => {
    onComplete();
    Animated.spring(translateX, {
      toValue: scrollDistance,
      tension: 10,
      friction: 5,
      useNativeDriver: false,
    }).start();

    return setEndReached(true);
  };

  const onMove = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return false;
    }

    if (gestureState.dx < 0 || gestureState.dx > scrollDistance) {
      return Animated.event([{ dx: translateX }], { useNativeDriver: false })({
        ...gestureState,
        dx: gestureState.dx < 0 ? 0 : scrollDistance,
      });
    }

    return Animated.event([{ dx: translateX }], { useNativeDriver: false })(
      gestureState
    );
  };

  const onRelease = () => {
    if (disabled) {
      return;
    }

    if (endReached) {
      return animateToStart();
    }

    const isCompleted = translateX._value! >= completeThreshold;

    return isCompleted ? animateToEnd() : animateToStart();
  };

  const panResponser = () =>
    PanResponder.create({
      onPanResponderGrant: onSwipeStart,
      onPanResponderEnd: onSwipeEnd,
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderMove: onMove,
      onPanResponderRelease: onRelease,
    });

  return (
    <View
      style={[
        styles.container,
        { opacity },
        containerStyle,
        { height, borderRadius },
      ]}
      onLayout={onLayoutContainer}
    >
      <SwipeButtonText
        title={title}
        titleStyle={titleStyle}
        titleProps={titleProps}
        height={height}
        titleContainerProps={titleContainerProps}
        titleContainerStyle={titleContainerStyle}
      />

      <Animated.View
        testID="Underlay"
        style={[
          styles.underlayContainer,
          underlayStyle,
          {
            width: translateX.interpolate({
              inputRange: [0 - height / 2, dimensions.width],
              outputRange: [height / 2, dimensions.width + height],
            }),
            height,
            borderRadius,
          },
        ]}
      />

      <SwipeButtonCircle
        Icon={Icon}
        panHandlers={panResponser().panHandlers}
        translateX={translateX}
        borderRadius={borderRadius}
        height={height}
        iconContainerStyle={iconContainerStyle}
      />
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: DEFAULT_HEIGHT,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: "hidden",
  },
  underlayContainer: {
    position: "absolute",
    backgroundColor: "#152228",
  },
});
