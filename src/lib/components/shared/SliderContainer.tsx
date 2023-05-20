import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';

type SliderContainerProps = {
  sectionTitle?: string;
  onClickSeeMore?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const SliderContainer = ({
  sectionTitle,
  onClickSeeMore,
  children,
  footer,
}: SliderContainerProps) => {
  return (
    <Box>
      {sectionTitle && (
        <Flex marginX={{ base: 8, sm: 0 }} alignItems="center">
          <Heading
            textTransform="uppercase"
            letterSpacing={2}
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight="400"
          >
            {sectionTitle}
          </Heading>

          <Button
            marginLeft="auto"
            size={{ base: 'xs', sm: 'sm' }}
            onClick={onClickSeeMore}
          >
            see more
          </Button>
        </Flex>
      )}

      <Flex paddingX={[8, 6]} overflowX="scroll">
        <Flex
          flexWrap="nowrap"
          alignItems="center"
          minHeight="250px"
          overflowX="scroll"
          overflow="visible"
          gridColumnGap={6}
        >
          {children}
        </Flex>
      </Flex>

      <Spacer height={4} />

      {footer ? (
        <HStack paddingX={{ base: 8, sm: 0 }} spacing={4}>
          {footer}
        </HStack>
      ) : null}
    </Box>
  );
};

export default SliderContainer;
