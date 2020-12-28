import { Grid, Skeleton } from "@chakra-ui/react";

import MovieItem from "./MovieItem";

import { MovieType } from "../../models/movies";

type MoviesContainerProps = {
  movies?: Array<MovieType>;
};

const MoviesContainer = ({ movies }: MoviesContainerProps) => {
  return (
    <Skeleton isLoaded={movies && movies.length > 0}>
      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        columnGap={8}
        rowGap={12}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem movie={movie} key={index} layout="grid" />
          ))}
      </Grid>
    </Skeleton>
  );
};

export default MoviesContainer;
