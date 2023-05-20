import { Text } from '@chakra-ui/react';

type PosterLabelProps = {
  label: string;
};

const PosterLabel = ({ label }: PosterLabelProps) => {
  return (
    <Text
      textTransform="uppercase"
      fontSize="xs"
      letterSpacing={2}
      textAlign="center"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      visibility="hidden"
      color="white"
      _groupHover={{ visibility: 'visible' }}
    >
      {label}
    </Text>
  );
};

export default PosterLabel;
