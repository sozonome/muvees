import { Box, useColorMode } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      backgroundColor={colorMode === "light" ? "white" : "gray.900"}
      transition="0.5s ease-out"
      minHeight="100vh"
    >
      <Meta />
      <Box margin="0 auto" maxWidth={800}>
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
