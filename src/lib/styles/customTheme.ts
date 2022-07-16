import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Outfit, sans-serif",
    heading: "Outfit, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 24,
      },
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
