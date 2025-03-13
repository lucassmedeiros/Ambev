import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    action: {
      hoverOpacity: 0.7,
    },
    divider: "#dedede",
    primary: {
      main: "#D33100",
      dark: "#A02500",
      light: "#FFC2AF",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    secondary: {
      main: "#315BF4",
      dark: "#102266",
      light: "#489AFF",
    },
    error: {
      main: "#D32F2F",
      dark: "#C62828",
      light: "#EF5350",
    },
    warning: {
      main: "#9847F5",
      dark: "#4E148F",
      light: "#D9BBFB",
    },
    info: {
      main: "#272E8B",
      dark: "#0B1164",
      light: "#C2C7FF",
    },
    success: {
      main: "#2E7D32",
      dark: "#1B5E20",
      light: "#4CAF50",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FAFAFA",
    },
  },
  typography: {
    fontSize: 14,
    subtitle1: {
      fontSize: "0.95rem",
    },
  },
});

const custom1 = createTheme({
  palette: {
    divider: "#dedede",
    primary: {
      main: "#D33100",
      dark: "#A02500",
      light: "#FFC2AF",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    secondary: {
      main: "#315BF4",
      dark: "#102266",
      light: "#489AFF",
    },
    error: {
      main: "#D32F2F",
      dark: "#C62828",
      light: "#EF5350",
    },
    warning: {
      main: "#9847F5",
      dark: "#4E148F",
      light: "#D9BBFB",
    },
    info: {
      main: "#272E8B",
      dark: "#0B1164",
      light: "#C2C7FF",
    },
    success: {
      main: "#2E7D32",
      dark: "#1B5E20",
      light: "#4CAF50",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FAFAFA",
    },
  },
});

export { defaultTheme, custom1 };
