import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  components: {
    Heading: {
      sizes: {
        "h1": {
          fontSize: {base: "2.441rem", lg: "3.052rem", xl: "3.815rem"}
        },
        "h2": {
          fontSize: {base: "1.953rem", lg: "2.441rem", xl: "3.052rem"}
        },
        "h3": {
          fontSize: {base: "1rem", lg: "1.3rem"}
        }
      }
    }
  }
});

export default theme;