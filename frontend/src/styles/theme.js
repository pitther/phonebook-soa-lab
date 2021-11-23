import { useColorMode } from "@chakra-ui/react";

export const useTheme = () => {
  return {
    boxAccentLight: "#F7FAFC",
    boxAccentDark: "#2D3748",
    headerDark: "#ff6347",
    headerLight: "#FC8181",
    colorMode: useColorMode().colorMode,
    phoneDark: "#68d391",
    phoneLight: "#25855A",
    breakpoints: {
      xs: 0,
      sm: 380,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  };
};
