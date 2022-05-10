import { Flex, Heading, IconButton, Grid } from "@chakra-ui/react";
import Link from "next/link";
import { GoSearch } from "react-icons/go";

import AccessibleLink from "lib/components/AccessibleLink";
import { trackEvent } from "lib/utils/trackEvent";

import AppMenu from "./AppMenu";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const handleClickSearch = () => {
    trackEvent(`Nav Link: Search`, "navigate");
  };

  return (
    <Flex as="header" width="full" align="center" padding="8">
      <AccessibleLink href="/">
        <Heading as="h1" fontSize={["md", "xl"]}>
          muvees
        </Heading>
      </AccessibleLink>

      <Grid templateColumns="repeat(3, 1fr)" gap={1} marginLeft="auto">
        <Link href="/movies/search" passHref>
          <IconButton
            as="a"
            aria-label="search"
            icon={<GoSearch />}
            background="none"
            onClick={handleClickSearch}
          />
        </Link>
        <ThemeToggle />
        <AppMenu />
      </Grid>
    </Flex>
  );
};

export default Header;
