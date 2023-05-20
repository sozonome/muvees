import { Skeleton, Grid, Button, Text } from '@chakra-ui/react';

export type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  onClickNext: () => void;
  onClickPrev: () => void;
};

const PageNavButtons = ({
  isLoading,
  page,
  totalPages,
  onClickNext,
  onClickPrev,
}: PageNavButtonProps) => {
  return (
    <Skeleton marginY={4} isLoaded={!isLoading}>
      {totalPages > 1 ? (
        <Grid rowGap={4}>
          <Text
            letterSpacing={2}
            textTransform="uppercase"
            textAlign="center"
            marginY={2}
            fontSize="sm"
          >
            Page: <b>{page ?? 0}</b> / {totalPages}
          </Text>

          <Grid templateColumns={['repeat(2, 1fr)']} gap={4}>
            <Button disabled={page === 1} onClick={onClickPrev}>
              prev
            </Button>
            <Button disabled={page === totalPages} onClick={onClickNext}>
              next
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default PageNavButtons;
