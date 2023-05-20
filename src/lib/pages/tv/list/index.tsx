import { Grid, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import type { PageNavButtonProps } from 'lib/components/shared/list/PageNavButtons';
import PageNavButtons from 'lib/components/shared/list/PageNavButtons';
import TvShowListContainer from 'lib/components/tv/TvShowListContainer';
import { useTVShowByList } from 'lib/services/tmdb/tv/list';

import type { TVShowListPageProps } from './types';

const TVShowList = ({ data: fallbackData, listType }: TVShowListPageProps) => {
  const {
    asPath,
    push,
    query: { page: qPage },
  } = useRouter();
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;
  const { data, isLoading } = useTVShowByList({
    listType,
    params: { page },
    fallbackData,
  });

  const handleChangePage = (updatedPage: number) => {
    push(`${asPath.split('?')[0]}?page=${updatedPage}`);
  };

  const handleClickNext = () => {
    const updatedPage = page === data?.total_pages ? page : page + 1;
    handleChangePage(updatedPage);
  };
  const handleClickPrev = () => {
    const updatedPage = page === 0 ? page : page - 1;
    handleChangePage(updatedPage);
  };

  const pageNavButtonProps: PageNavButtonProps = {
    isLoading,
    page,
    totalPages: data?.total_pages ?? 0,
    onClickNext: handleClickNext,
    onClickPrev: handleClickPrev,
  };

  return (
    <Grid gap={4} paddingX={8}>
      <Grid gap={2}>
        <Heading>TV Shows</Heading>
        <Text textTransform="capitalize">{listType.replaceAll('_', ' ')}</Text>
      </Grid>
      <PageNavButtons {...pageNavButtonProps} />
      <TvShowListContainer shows={data?.results} isLoading={isLoading} />
      <PageNavButtons {...pageNavButtonProps} />
    </Grid>
  );
};

export default TVShowList;
