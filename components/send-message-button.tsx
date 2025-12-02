import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { memo, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colorKit } from "reanimated-color-picker";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { easeGradient } from "../lib/ease-gradient";
import { SendHorizontal } from "lucide-react-native";
import { COLORS } from "../constants";

// opal-start-timer-button-animation 🔽

// Animated.createAnimatedComponent wraps native Pressable so Reanimated can drive
// entering transitions and animated styles on this host view.
// Ref: https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Button geometry
// - BUTTON_WIDTH: full-width minus horizontal margins
// - BUTTON_HEIGHT: fixed height used as base unit for all internal shape math
const BUTTON_WIDTH = 110;
const BUTTON_HEIGHT = 40;

// Shimmer constants
// - SHIMMER_DELAY: initial pause so shimmer doesn't compete with first CTA impression
// - SHIMMER_BASE_DURATION: base sweep speed; scaled by width for consistent perceived velocity
// - SHIMMER_REFERENCE_WIDTH: width used to compute responsive duration multiplier
// - SHIMMER_OVERSHOOT: 1.2 makes the sweep start/end offscreen to avoid visible pop-in/out
const SHIMMER_DELAY = 2000;
const SHIMMER_BASE_DURATION = 3000;
const SHIMMER_REFERENCE_WIDTH = 100;
const SHIMMER_OVERSHOOT = 1.2;

const GRADIENT_COLOR = COLORS.black;

const SendMessageButton = () => {
  // Measured width of shimmer sub-tree, used to compute offscreen start position
  const shimmerComponentWidth = useSharedValue(0);

  // 0→1 loop for shimmer sweep
  const shimmerProgress = useSharedValue(0);

  // Press feedback: animate scale directly (1 → 0.96 on press-in, back to 1 on release)
  const pressScale = useSharedValue(1);
  const rPressStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: pressScale.get() }] };
  });

  // Shimmer style: translate across button, fade towards edges
  // - opacity: [0, 0.2, 1] → [0.1, 0.05, 0.025] creates bright center and softer tails
  // - translateX: overshoots both sides to hide spawn/despawn
  const rShimmerStyle = useAnimatedStyle(() => {
    if (shimmerComponentWidth.get() === 0) {
      // Hide until layout measured to prevent FOUC of shimmer
      return {
        opacity: 0,
      };
    }

    const translateX = interpolate(
      shimmerProgress.get(),
      [0, 1],
      [
        -shimmerComponentWidth.get() * SHIMMER_OVERSHOOT,
        BUTTON_WIDTH * SHIMMER_OVERSHOOT,
      ]
    );
    const opacity = interpolate(
      shimmerProgress.get(),
      [0, 0.2, 0.7, 1],
      [0, 0.15, 0.1, 0]
    );

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  // Start shimmer loop with initial delay; duration scales with button width for consistent feel
  useEffect(() => {
    const duration = Math.max(
      SHIMMER_BASE_DURATION * (BUTTON_WIDTH / SHIMMER_REFERENCE_WIDTH),
      SHIMMER_BASE_DURATION
    );
    shimmerProgress.set(
      withRepeat(
        withSequence(
          // Delay the first pass to let breathing settle
          withDelay(SHIMMER_DELAY, withTiming(0, { duration: 0 })),
          // Ease-in: starts slow and accelerates to the end (no deceleration tail)
          withTiming(1, {
            duration: duration,
            easing: Easing.bezier(0.9, 0, 0.5, 0.3),
          })
        ),
        -1,
        false
      )
    );
  }, [shimmerProgress]);

  const { colors: leftColors, locations: leftLocations } = easeGradient({
    colorStops: {
      0: {
        color: colorKit.setAlpha(GRADIENT_COLOR, 0).hex(),
      },
      1: {
        color: GRADIENT_COLOR,
      },
    },
  });

  const { colors: rightColors, locations: rightLocations } = easeGradient({
    colorStops: {
      0: {
        color: GRADIENT_COLOR,
      },
      1: {
        color: colorKit.setAlpha(GRADIENT_COLOR, 0).hex(),
      },
    },
  });

  return (
    <Animated.View>
      <AnimatedPressable
        onPressIn={() => {
          impactAsync(ImpactFeedbackStyle.Light).catch(() => {});
          pressScale.set(
            withTiming(0.96, { duration: 150, easing: Easing.out(Easing.quad) })
          );
        }}
        onPressOut={() => {
          pressScale.set(
            withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) })
          );
        }}
        style={[
          styles.container,
          rPressStyle,
          {
            alignSelf: "center",
            borderRadius: 999,
            overflow: "hidden",
            borderColor: "transparent",
            backgroundColor: COLORS.white,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            gap: 6, // Adjust gap as needed
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -6,
          }}
        >
          <SendHorizontal size={16} color={COLORS.black} />
          <Text
            style={{ color: COLORS.black, fontSize: 14, fontWeight: "medium" }}
          >
            Send
          </Text>
        </View>
        {/* Shimmer */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              flexDirection: "row",
            },
            rShimmerStyle,
          ]}
          // Capture measured width to compute initial offscreen start
          onLayout={(e) =>
            shimmerComponentWidth.set(e.nativeEvent.layout.width)
          }
        >
          <LinearGradient
            colors={leftColors}
            locations={leftLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
            }}
          />
          <LinearGradient
            colors={rightColors}
            locations={rightLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
            }}
          />
        </Animated.View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderCurve: "continuous",
  },
  canvas: {
    flex: 1,
    borderRadius: 999,
  },
  gradient: {
    flex: 1,
  },
});

export default memo(SendMessageButton);

// opal-start-timer-button-animation 🔼
