import { Grid, Skeleton } from "@chakra-ui/react";

import type { MovieListItemType } from "lib/services/tmdb/movie/list/types";

import MovieItem from "./MovieItem";

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
            <MovieItem
              movie={movie}
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
