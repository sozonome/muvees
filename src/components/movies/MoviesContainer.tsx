import { Grid, Skeleton } from "@chakra-ui/react";

import MovieItem from "./MovieItem";

import { MovieListItemType } from "../../models/movies";

type MoviesContainerProps = {
  isLoading: boolean;
  movies?: Array<MovieListItemType>;
};

const MoviesContainer = ({ movies, isLoading }: MoviesContainerProps) => {
  return (
    <Skeleton minHeight={"100vh"} marginY={8} isLoaded={!isLoading}>
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
          {movies &&
            movies.map((movie, index) => (
              <MovieItem movie={movie} key={index} layout="grid" />
            ))}
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default MoviesContainer;
