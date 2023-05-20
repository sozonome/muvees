import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
      background="none"
    />
  );
};

export default ThemeToggle;
