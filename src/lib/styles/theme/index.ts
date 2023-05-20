import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { config } from './config';

const customTheme = extendTheme({
  fonts: {
    body: 'Outfit, sans-serif',
    heading: 'Outfit, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 24,
      },
    },
  },
  colors,
  config,
});

export default customTheme;
