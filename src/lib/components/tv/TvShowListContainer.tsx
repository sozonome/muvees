import { Grid, Skeleton } from "@chakra-ui/react";

import PosterCard from "lib/components/shared/PosterCard";
import { MediaType } from "lib/services/tmdb/search/multi/types";
import type { TVShowItem } from "lib/services/tmdb/tv/list/types";

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
            <PosterCard
              name={show.name}
              id={show.id ?? 0}
              imageUrl={show.poster_path}
              mediaType={MediaType.Tv}
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
