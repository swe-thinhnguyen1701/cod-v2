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
          fontSize: {base: "2.341rem", lg: "2.852rem", xl: "3.415rem"}
        },
        "h2": {
          fontSize: {base: "1.653rem", lg: "2.041rem", xl: "2.152rem"}
        },
        "h3": {
          fontSize: {base: "1.4em", lg: "1.76rem"}
        }
      }
    }
  }
});

export default theme;