import { Grid, Skeleton } from "@chakra-ui/react";

import type { TVShowItem } from "lib/services/tmdb/tv/list/types";

import TvShowItem from "./TvShowItem";

type MoviesContainerProps = {
  isLoading: boolean;
  shows?: Array<TVShowItem>;
};

const TvShowListContainer = ({ shows, isLoading }: MoviesContainerProps) => {
  return (
    <Skeleton minHeight="100vh" marginY={8} isLoaded={!isLoading}>
      {shows?.length ? (
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          columnGap={8}
          rowGap={12}
        >
          {shows.map((show) => (
            <TvShowItem
              show={show}
              key={`${show.name}-${show.id}`}
              layout="grid"
            />
          ))}
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default TvShowListContainer;
