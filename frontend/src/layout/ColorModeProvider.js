import React from "react";
import { ThemeProvider } from "styled-components";
import { useTheme } from "../styles/theme";

const ColorModeProvider = ({ children }) => {
  const theme = useTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ColorModeProvider;
