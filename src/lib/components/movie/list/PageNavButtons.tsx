import { Skeleton, Grid, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import type { MovieListResponse } from 'lib/services/tmdb/movie/list/types';

import type { MovieListModeKey } from './types';

export type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  results?: MovieListResponse['results'];
  listMode: MovieListModeKey;
};

const PageNavButtons = ({
  isLoading,
  results,
  page = 0,
  totalPages,
  listMode,
}: PageNavButtonProps) => {
  const router = useRouter();
  const {
    query: { section, genre, query },
  } = router;

  const handleChangePage = (type: 'next' | 'prev') => () => {
    const changePageNum = type === 'next' ? page + 1 : page - 1;

    const nextRoute = () => {
      switch (listMode) {
        case 'section':
          return `/movies/${section}?page=${changePageNum}`;
        case 'search':
          return `/movies/search?query=${query}&page=${changePageNum}`;
        case 'discover':
          return `/movies/genre/${genre}?page=${changePageNum}`;
        default:
          return `/movies/${section}?page=${changePageNum}`;
      }
    };

    router.push(nextRoute());
  };

  return (
    <Skeleton marginY={4} isLoaded={!isLoading}>
      {results?.length ? (
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
            <Button isDisabled={page === 1} onClick={handleChangePage('prev')}>
              prev
            </Button>
            <Button
              isDisabled={page === totalPages}
              onClick={handleChangePage('next')}
            >
              next
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default PageNavButtons;
