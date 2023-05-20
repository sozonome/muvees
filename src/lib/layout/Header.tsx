import { Flex, Heading, IconButton, Grid } from '@chakra-ui/react';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';

import { trackEvent } from 'lib/utils/trackEvent';

import AppMenu from './AppMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const handleClickSearch = () => {
    trackEvent({
      eventName: `Nav Link: Search`,
      eventData: { type: 'navigate' },
    });
  };

  return (
    <Flex as="header" width="full" align="center" padding="8">
      <Link href="/">
        <Heading as="h1" fontSize={['md', 'xl']}>
          muvees
        </Heading>
      </Link>

      <Grid templateColumns="repeat(3, 1fr)" gap={1} marginLeft="auto">
        <Link href="/search" passHref legacyBehavior>
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
