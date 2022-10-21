import { Grid, Heading, Text } from "@chakra-ui/react";
import * as React from "react";

import type { PageNavButtonProps } from "lib/components/shared/list/PageNavButtons";
import PageNavButtons from "lib/components/shared/list/PageNavButtons";
import TvShowListContainer from "lib/components/tv/TvShowListContainer";
import { useTVShowByList } from "lib/services/tmdb/tv/list";

import type { TVShowListPageProps } from "./types";

const TVShowList = ({ data: fallbackData, listType }: TVShowListPageProps) => {
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useTVShowByList({
    listType,
    params: { page },
    fallbackData,
  });

  const handleClickNext = () =>
    setPage((prevPage) =>
      prevPage === data?.total_pages ? prevPage : prevPage + 1
    );
  const handleClickPrev = () =>
    setPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));

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
        <Text textTransform="capitalize">{listType.replaceAll("_", " ")}</Text>
      </Grid>
      <PageNavButtons {...pageNavButtonProps} />
      <TvShowListContainer shows={data?.results} isLoading={isLoading} />
      <PageNavButtons {...pageNavButtonProps} />
    </Grid>
  );
};

export default TVShowList;
