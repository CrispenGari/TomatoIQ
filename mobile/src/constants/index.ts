export const SERVER_BASE_URL = "https://tomatoiq.onrender.com";

export const COLORS = {
  main: "#DBFFCB",
  primary: "#BEE4D0",
  secondary: "#FF6363",
  tertiary: "#FF8282",
  black: "#000000",
  white: "#ffffff",
  red: "#FB2576",
  gray: "#758694",
  transparent: "transparent",
  gray100: "#DDDDDD",
  gray200: "#7F8CAA",
};

export const PLOT_COLORS = ["#78C841", "#FB4141"];

export const AUDIOS = {
  predicting: require("@/assets/sounds/rain.mp3"),
  results: require("@/assets/sounds/response.wav"),
};

export const Fonts = {
  "JosefinSans-Bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
  "JosefinSans-Regular": require("@/assets/fonts/JosefinSans-Regular.ttf"),
};
export const FONTS = {
  regular: "JosefinSans-Regular",
  bold: "JosefinSans-Bold",
};

export const STORAGE_NAME = {
  DAILY_TIP: "tomatoiq:tip",
  SETTINGS: "tomatoiq:settings",
  HISTORY: "tomatoiq:history",
  TIP_NOTIFICATION_FLAG_KEY: "tomatoiq:notification",
};

export const APP_NAME = "Tomato IQ";

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};

export const LANDING_MESSAGES = [
  {
    id: 1,
    image: require("@/assets/images/0.png"),
    title: "Welcome to TomatoIQ!",
    message:
      "Your pocket assistant for tomato farming — TomatoIQ uses AI to detect quality and ripeness directly from images. Let's bring precision to your harvest.",
  },
  {
    id: 2,
    image: require("@/assets/images/1.png"),
    title: "Know When to Pick",
    message:
      "TomatoIQ helps you identify the perfect harvest time by analyzing color and maturity levels. Reduce waste and boost market value with smart insights.",
  },
  {
    id: 3,
    image: require("@/assets/images/2.png"),
    title: "Sort and Grade with Confidence",
    message:
      "Classify tomatoes based on quality — from ripe and ready to underripe or damaged. Make better post-harvest decisions right from your phone.",
  },
  {
    id: 4,
    image: require("@/assets/images/3.png"),
    title: "AI for Every Farmer",
    message:
      "Whether you're in the field or at the market, TomatoIQ puts powerful tomato analysis tools in your hand — no lab needed.",
  },
];
