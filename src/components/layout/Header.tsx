import { Flex, Heading, Box } from "@chakra-ui/react";

import AccessibleLink from "../AccessibleLink";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" padding="8">
      <AccessibleLink href="/">
        <Heading as="h1">muvees</Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
