import { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { PulseConfig } from '../splash-consts';

interface PulseCircleProps {
  item: PulseConfig;
  color: string;
}

export const SplashPulseCircle: FC<PulseCircleProps> = function (props) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      props.item.delay,
      withRepeat(
        withSequence(
          withTiming(0.4, { duration: props.item.fadeIn, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: props.item.fadeOut, easing: Easing.in(Easing.ease) })
        ),
        -1
      )
    );

    scale.value = withDelay(
      props.item.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: props.item.fadeIn, easing: Easing.out(Easing.ease) }),
          withTiming(0.3, { duration: props.item.fadeOut, easing: Easing.in(Easing.ease) })
        ),
        -1
      )
    );
  }, [props.item, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const gradientId = `pulse-gradient-${props.item.delay}`;
  const radius = props.item.size / 2;

  return (
    <Animated.View
      style={[
        styles.pulse,
        animatedStyle,
        {
          top: props.item.top,
          left: props.item.left,
          width: props.item.size,
          height: props.item.size,
        },
      ]}
    >
      <Svg width={props.item.size} height={props.item.size}>
        <Defs>
          <RadialGradient id={gradientId} cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'}>
            <Stop offset={'0%'} stopColor={props.color} stopOpacity={0.8} />
            <Stop offset={'40%'} stopColor={props.color} stopOpacity={0.4} />
            <Stop offset={'100%'} stopColor={props.color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={radius} cy={radius} r={radius} fill={`url(#${gradientId})`} />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pulse: {
    position: 'absolute',
  },
});