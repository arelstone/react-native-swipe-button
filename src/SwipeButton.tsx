import React, { useState } from 'react';
import { View, Dimensions, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import SwipeButtonCircle, { SwipeButtonCircleProps } from './SwipeButtonCircle';
import SwipeButtonText, { SwipeButtonTextProps } from './SwipeButtonText';

type SwipeButtonPropsExtends = SwipeButtonCommonProps
  & Omit<SwipeButtonCircleProps, 'opacity' | 'panHandlers' | 'translateX'>
  & SwipeButtonTextProps

interface SwipeButtonProps extends SwipeButtonPropsExtends {
  /**
   * Callback that will be invoked when complete threshold has been reached
   */
  onComplete: () => void;

  /**
   * The with of the button
   * 
   * @default 90% of the screen width
   */
  width?: number;

  /**
   * If disabled is set to true it will not be possible to interace with the button
   */
  disabled?: boolean;

  /**
   * Indicates when `onComplete` should be invoked.
   * 
   * @default 70
   */
  completeThresholdPercentage?: number;

  /**
   * Callback that will be invoked when the suer starts swiping
   */
  onSwipeStart?: () => void;

  /**
   * Callback that will be invoked when the suer ends swiping
   */
  onSwipeEnd? : () => void;

  /**
   * The styling of the underlay container
   */
  underlayStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for the outer container
  */
  containerStyle?: StyleProp<ViewStyle>;
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
   * @default (height / 2)
   */
  borderRadius?: number;
}

export const DEFAULT_HEIGHT = 70;
const DEFAULT_WIDTH = Dimensions.get('window').width * 0.9;
const DEFAULT_BORDER_RRADIUS = DEFAULT_HEIGHT / 2;
const DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE = 70;

const SwipeButton = ({
    height = DEFAULT_HEIGHT, width = DEFAULT_WIDTH, borderRadius = DEFAULT_BORDER_RRADIUS,
    title, titleContainerProps, titleProps, titleContainerStyle, titleStyle,
    completeThresholdPercentage = DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE,
    underlayStyle, disabled, Icon, containerStyle,
    onComplete, onSwipeEnd = () => {}, onSwipeStart = () => {},
}: SwipeButtonProps) => {

    const [endReached, setEndReached] = useState<boolean>(false);
    const opacity = disabled ? 0.5 : 1;
    const opacityStyle = { opacity };
    const [translateX] = useState<Animated.Value>(new Animated.Value(0));
    const scrollDistance = width - (completeThresholdPercentage / 100) - height;
    const completeThreshold = scrollDistance * (completeThresholdPercentage / 100);

    const animateToStart = () => {
        Animated.spring(translateX, { toValue: 0, tension: 10, friction: 5, useNativeDriver: false }).start();

        return setEndReached(false);
    };

    const animateToEnd = () => {
        onComplete();
        Animated.spring(translateX, { toValue: scrollDistance, tension: 10, friction: 5, useNativeDriver: false }).start();

        return setEndReached(true);
    };

    const onMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (disabled) {
            return false;
        }

        if (gestureState.dx < 0 || gestureState.dx > scrollDistance) {
            return Animated.event([{ dx: translateX }], { useNativeDriver: false })({
                ...gestureState,
                dx: gestureState.dx < 0 ? 0 : scrollDistance,
            });
        }
        
        return Animated.event([{ dx: translateX }], { useNativeDriver: false })(gestureState);
    };

    const onRelease = () => {
        if (disabled) {
            return;
        }

        if (endReached) {
            return animateToStart();
        }

        const isCompleted = translateX._value! >= completeThreshold;
        
        return isCompleted
            ? animateToEnd()
            : animateToStart();
    };

    const panResponser = () => PanResponder.create({
        onPanResponderGrant: onSwipeStart,
        onPanResponderEnd: onSwipeEnd,
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease,
    });

    return (
        <View style={[
            styles.container,
            opacityStyle,
            containerStyle,
            { height, width, borderRadius },
        ]}
        >

            <SwipeButtonText
                title={title}
                titleStyle={titleStyle}
                titleProps={titleProps}
                height={height}
                titleContainerProps={titleContainerProps}
                titleContainerStyle={titleContainerStyle}
            />

            {!disabled && <Animated.View
                testID="Underlay"
                style={[
                    styles.underlayContainer,
                    underlayStyle,
                    {
                        width: translateX.interpolate({ inputRange: [0, 100], outputRange: [31, 131] }),
                        height,
                    },
                ]}
            />}

            <SwipeButtonCircle
                Icon={Icon}
                opacity={opacity}
                panHandlers={panResponser().panHandlers}
                translateX={translateX}
                borderRadius={borderRadius}
                height={height}
            />

        </View>
    );
};

export default SwipeButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    underlayContainer: {
        position: 'absolute',
        backgroundColor: '#152228',
    },
});
