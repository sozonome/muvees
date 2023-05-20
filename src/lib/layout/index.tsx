import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box transition="0.5s ease-out" minHeight="100vh">
      <Meta />
      <Box margin="0 auto" maxWidth={1000}>
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
