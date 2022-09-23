import { Grid, Heading, Text } from "@chakra-ui/react";

import TvShowListContainer from "lib/components/tv/TvShowListContainer";
import { useTVShowByList } from "lib/services/tmdb/tv/list";

import type { TVShowListPageProps } from "./types";

const TVShowList = ({ listType, data: fallbackData }: TVShowListPageProps) => {
  const { data, isLoading } = useTVShowByList({ listType, fallbackData });

  if (!data) {
    return null;
  }

  return (
    <Grid gap={4} paddingX={8}>
      <Grid gap={2}>
        <Heading>TV Shows</Heading>
        <Text textTransform="capitalize">{listType.replaceAll("_", " ")}</Text>
      </Grid>
      <TvShowListContainer shows={data.results} isLoading={isLoading} />
    </Grid>
  );
};

export default TVShowList;
