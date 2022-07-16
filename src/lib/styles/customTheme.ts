import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
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
