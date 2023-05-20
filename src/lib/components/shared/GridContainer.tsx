import { Grid, Skeleton } from '@chakra-ui/react';

type GridContainerProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

const GridContainer = ({ isLoading, children }: GridContainerProps) => {
  return (
    <Skeleton minHeight="60vh" marginY={8} isLoaded={!isLoading}>
      <Grid
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
        columnGap={8}
        rowGap={12}
      >
        {children}
      </Grid>
    </Skeleton>
  );
};

export default GridContainer;
