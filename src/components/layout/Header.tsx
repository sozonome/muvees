import { Flex, Heading, IconButton, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GoSearch } from "react-icons/go";

import AccessibleLink from "components/AccessibleLink";

import AppMenu from "./AppMenu";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();

  return (
    <Flex as="header" width="full" align="center" padding="8">
      <AccessibleLink href="/">
        <Heading as="h1" fontSize={["md", "xl"]}>
          muvees
        </Heading>
      </AccessibleLink>

      <Grid templateColumns="repeat(3, 1fr)" gap={1} marginLeft="auto">
        <IconButton
          aria-label="search"
          icon={<GoSearch />}
          background="none"
          onClick={() => router.push(`/movies/search`)}
        />
        <ThemeToggle />
        <AppMenu />
      </Grid>
    </Flex>
  );
};

export default Header;
