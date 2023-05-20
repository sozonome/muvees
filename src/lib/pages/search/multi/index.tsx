import { Grid, Input, Skeleton, Text } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import * as React from 'react';

import type { PageNavButtonProps } from 'lib/components/shared/list/PageNavButtons';
import PageNavButtons from 'lib/components/shared/list/PageNavButtons';
import PosterCard from 'lib/components/shared/PosterCard';
import { BASE_URL } from 'lib/constants/baseUrl';
import { useMultiSearchResult } from 'lib/services/tmdb/search/multi';

const MultiSearchPage = () => {
  const router = useRouter();
  const {
    asPath,
    query: { page: qPage, query: qQuery },
  } = router;
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;
  const query = qQuery as string;

  const { data, isLoading } = useMultiSearchResult(
    {
      page,
      query,
    },
    query?.length > 0
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeQuery = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const queryParam = e.target.value
        ? `?query=${e.target.value}&page=1`
        : '';

      router.push(`/search${queryParam}`);
    }, 500),
    []
  );

  const handleChangePage = React.useCallback(
    (updatedPage: number) => {
      const queryParams = new URL(BASE_URL + asPath).searchParams;
      queryParams.set('page', updatedPage.toString());
      router.push(`${asPath.split('?')[0]}?${queryParams.toString()}`);
    },
    [asPath, router]
  );

  const handleClickNext = React.useCallback(() => {
    const updatedPage = page === data?.total_pages ? page : page + 1;
    handleChangePage(updatedPage);
  }, [data?.total_pages, handleChangePage, page]);
  const handleClickPrev = React.useCallback(() => {
    const updatedPage = page === 0 ? page : page - 1;
    handleChangePage(updatedPage);
  }, [handleChangePage, page]);

  const pageNavButtonProps: PageNavButtonProps = React.useMemo(
    () => ({
      isLoading,
      page,
      totalPages: data?.total_pages ?? 0,
      onClickNext: handleClickNext,
      onClickPrev: handleClickPrev,
    }),
    [data?.total_pages, handleClickNext, handleClickPrev, isLoading, page]
  );

  const resultWrapper = React.useMemo(() => {
    if (!query || query.length === 0) {
      return <Text textAlign="center">Type something...</Text>;
    }

    if (data?.total_results === 0) {
      return <Text textAlign="center">No Result</Text>;
    }

    return (
      <>
        <PageNavButtons {...pageNavButtonProps} />
        <Skeleton marginY={8} isLoaded={!isLoading}>
          <Grid
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            columnGap={8}
            rowGap={12}
          >
            {data?.results.map((item) => (
              <PosterCard
                mediaType={item.media_type}
                id={item.id}
                name={item.title ?? item.name}
                imageUrl={item.poster_path ?? item.profile_path ?? ''}
                key={`${item.media_type}-${item.id}`}
                layout="grid"
              />
            ))}
          </Grid>
        </Skeleton>
        <PageNavButtons {...pageNavButtonProps} />
      </>
    );
  }, [
    data?.results,
    data?.total_results,
    isLoading,
    pageNavButtonProps,
    query,
  ]);

  return (
    <Grid paddingX={8} gap={4}>
      <Input
        type="text"
        onChange={handleChangeQuery}
        defaultValue={query}
        placeholder="Movie / TV Show / Person"
        borderRadius={24}
        fontSize="sm"
      />
      {resultWrapper}
    </Grid>
  );
};

export default MultiSearchPage;
