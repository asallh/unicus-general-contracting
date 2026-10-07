import { Platform } from "react-native";

/**
 * Unicus brand tokens — aligned with client-web.
 * Yellow is an accent, not chrome. Blue drives primary actions.
 */
export const Colors = {
  light: {
    text: "#111111",
    textMuted: "#6B7280",
    background: "#F7F7F5",
    surface: "#FFFFFF",
    border: "rgba(0,0,0,0.08)",
    tint: "#1277BD",
    icon: "#6B7280",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: "#1277BD",
    primary: "#1277BD",
    primaryMuted: "rgba(18,119,189,0.12)",
    secondary: "#FED411",
    tertiary: "#222222",
    accent: "#F0F0EE",
    textColorMain: "#111111",
    danger: "#DC2626",
    dangerMuted: "rgba(220,38,38,0.10)",
    success: "#15803D",
  },
  dark: {
    text: "#F4F4F5",
    textMuted: "#A1A1AA",
    background: "#0F0F10",
    surface: "#1A1A1C",
    border: "rgba(255,255,255,0.10)",
    tint: "#4A9FE7",
    icon: "#A1A1AA",
    tabIconDefault: "#71717A",
    tabIconSelected: "#4A9FE7",
    primary: "#4A9FE7",
    primaryMuted: "rgba(74,159,231,0.18)",
    secondary: "#E6C200",
    tertiary: "#FFFFFF",
    accent: "#242426",
    textColorMain: "#F4F4F5",
    danger: "#F87171",
    dangerMuted: "rgba(248,113,113,0.14)",
    success: "#4ADE80",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
