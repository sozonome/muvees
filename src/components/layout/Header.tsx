import { Flex, Heading, Box, IconButton, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GoSearch } from "react-icons/go";

import AccessibleLink from "../AccessibleLink";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();

  return (
    <Flex as="header" width="full" align="center" padding="8">
      <AccessibleLink href="/">
        <Heading as="h1">muvees</Heading>
      </AccessibleLink>

      <Grid templateColumns="repeat(2, 1fr)" gap={2} marginLeft="auto">
        <IconButton
          aria-label="search"
          icon={<GoSearch />}
          onClick={() => router.push(`/movies/search`)}
        />
        <ThemeToggle />
      </Grid>
    </Flex>
  );
};

export default Header;
