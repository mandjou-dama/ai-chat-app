import { Dimensions } from "react-native";

// Get the screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const COLORS = {
  white: "#F5F5F7",
  black: "#121212",
  //   black: "#22223b",
  primary: "#1E90FF",
  secondary: "#FF69B4",

  blue: "#0e75fcff",
  purple: "#970ceeff",
  green: "#00a700ff",
  orange: "#ff8c00",
  yellow: "#ffff00",
  pink: "#ff1493",
};

export const SPACES = {
  sm: SCREEN_WIDTH * 0.02,
  md: SCREEN_WIDTH * 0.03,
  lg: SCREEN_WIDTH * 0.04,
  x: SCREEN_WIDTH * 0.05,
  xl: SCREEN_WIDTH * 0.06,
  xxl: SCREEN_WIDTH * 0.07,
  xxxl: SCREEN_WIDTH * 0.08,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};

// export const FONTS = {
//   Satoshi: {
//     Light: "Satoshi-Light",
//     Regular: "Satoshi-Regular",
//     Medium: "Satoshi-Medium",
//     Bold: "Satoshi-Bold",
//     Black: "Satoshi-Black",
//   },
// };

export const SIZES = {
  CHAT_BOX_HEIGHT: 100,
  CHAT_BOX_MARGIN_V: 6,
  RADIUS: 28,
  BLUR_INTENSITY: 80,
};
