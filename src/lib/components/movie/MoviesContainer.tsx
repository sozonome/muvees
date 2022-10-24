import { Grid, Skeleton } from "@chakra-ui/react";

import PosterCard from "lib/components/shared/PosterCard";
import type { MovieListItemType } from "lib/services/tmdb/movie/list/types";
import { MediaType } from "lib/services/tmdb/search/multi/types";

type MoviesContainerProps = {
  isLoading: boolean;
  movies?: Array<MovieListItemType>;
};

const MoviesContainer = ({ movies, isLoading }: MoviesContainerProps) => {
  return (
    <Skeleton minHeight="100vh" marginY={8} isLoaded={!isLoading}>
      {movies?.length ? (
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          columnGap={8}
          rowGap={12}
        >
          {movies.map((movie) => (
            <PosterCard
              name={movie.title}
              id={movie.id}
              mediaType={MediaType.Movie}
              imageUrl={movie.poster_path}
              key={`${movie.title}-${movie.id}`}
              layout="grid"
            />
          ))}
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default MoviesContainer;
