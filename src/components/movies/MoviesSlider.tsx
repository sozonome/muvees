import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";

import MovieItem from "./MovieItem";

import { MovieType } from "../../models/movies";

type MoviesSliderProps = {
  movies?: Array<MovieType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  return (
    <Box marginY={4}>
      {sectionTitle && (
        <Heading
          paddingX={8}
          textTransform="uppercase"
          letterSpacing={2}
          fontSize="lg"
          fontWeight="semibold"
        >
          {sectionTitle}
        </Heading>
      )}
      <Skeleton isLoaded={movies && movies.length > 0}>
        <Flex
          flexWrap="nowrap"
          alignItems="center"
          minHeight="240px"
          overflowX="scroll"
          gridColumnGap={6}
        >
          {movies &&
            movies
              .slice(0, 10)
              .map((movie, index) => (
                <MovieItem movie={movie} key={index} layout="flex" />
              ))}
        </Flex>
      </Skeleton>
    </Box>
  );
};

export default MoviesSlider;
